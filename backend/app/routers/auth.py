"""
Auth router — registro, login, refresh, OAuth2 (Google + GitHub)
"""
from datetime import datetime, timezone
import httpx
import structlog
from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token, decode_token
from app.core.config import settings
from app.models.models import User, UserRole, AuthProvider, AuditLog

router = APIRouter()
security = HTTPBearer()
logger = structlog.get_logger()


# ─── Schemas ──────────────────────────────────────────────────────────────────
class RegisterIn(BaseModel):
    name: str
    email: EmailStr
    password: str
    institution: str | None = None

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class TokenOut(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: dict

class RefreshIn(BaseModel):
    refresh_token: str


# ─── Helpers ──────────────────────────────────────────────────────────────────
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
) -> User:
    try:
        payload = decode_token(credentials.credentials)
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Token inválido")
        user_id = payload["sub"]
    except Exception:
        raise HTTPException(status_code=401, detail="No autenticado")
    
    result = await db.execute(select(User).where(User.id == user_id, User.is_active == True))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")
    return user


async def _log_action(db, user_id, action, request: Request, detail=None):
    log = AuditLog(user_id=user_id, action=action, ip_address=request.client.host if request.client else None, detail=detail)
    db.add(log)


def _user_dict(user: User) -> dict:
    return {"id": user.id, "name": user.name, "email": user.email, "role": user.role, "institution": user.institution, "avatar_url": user.avatar_url}


# ─── Endpoints ────────────────────────────────────────────────────────────────
@router.post("/register", response_model=TokenOut, status_code=201)
async def register(body: RegisterIn, request: Request, db: AsyncSession = Depends(get_db)):
    existing = await db.execute(select(User).where(User.email == body.email))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email ya registrado")
    
    user = User(
        name=body.name,
        email=body.email,
        password_hash=hash_password(body.password),
        institution=body.institution,
        auth_provider=AuthProvider.email,
    )
    db.add(user)
    await db.flush()
    await _log_action(db, user.id, "auth.register", request)
    logger.info("user_registered", user_id=user.id, email=user.email)
    
    return TokenOut(
        access_token=create_access_token(user.id),
        refresh_token=create_refresh_token(user.id),
        user=_user_dict(user),
    )


@router.post("/login", response_model=TokenOut)
async def login(body: LoginIn, request: Request, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == body.email, User.is_active == True))
    user = result.scalar_one_or_none()
    
    if not user or not user.password_hash or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    user.last_login = datetime.now(timezone.utc)
    await _log_action(db, user.id, "auth.login", request)
    
    return TokenOut(
        access_token=create_access_token(user.id),
        refresh_token=create_refresh_token(user.id),
        user=_user_dict(user),
    )


@router.post("/refresh", response_model=TokenOut)
async def refresh_token(body: RefreshIn, db: AsyncSession = Depends(get_db)):
    try:
        payload = decode_token(body.refresh_token)
        if payload.get("type") != "refresh":
            raise ValueError("Not a refresh token")
        user_id = payload["sub"]
    except Exception:
        raise HTTPException(status_code=401, detail="Refresh token inválido")
    
    result = await db.execute(select(User).where(User.id == user_id, User.is_active == True))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")
    
    return TokenOut(
        access_token=create_access_token(user.id),
        refresh_token=create_refresh_token(user.id),
        user=_user_dict(user),
    )


@router.get("/me")
async def me(current_user: User = Depends(get_current_user)):
    return _user_dict(current_user)


# ─── OAuth2 — Google ──────────────────────────────────────────────────────────
@router.get("/google/url")
async def google_auth_url():
    params = (
        f"client_id={settings.GOOGLE_CLIENT_ID}"
        f"&redirect_uri={settings.FRONTEND_URL}/auth/google/callback"
        f"&response_type=code&scope=openid email profile"
        f"&access_type=offline"
    )
    return {"url": f"https://accounts.google.com/o/oauth2/v2/auth?{params}"}


@router.post("/google/callback")
async def google_callback(code: str, request: Request, db: AsyncSession = Depends(get_db)):
    async with httpx.AsyncClient() as client:
        # Exchange code for tokens
        token_resp = await client.post("https://oauth2.googleapis.com/token", data={
            "code": code,
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
            "redirect_uri": f"{settings.FRONTEND_URL}/auth/google/callback",
            "grant_type": "authorization_code",
        })
        token_data = token_resp.json()
        
        # Get user info
        userinfo_resp = await client.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={"Authorization": f"Bearer {token_data['access_token']}"}
        )
        info = userinfo_resp.json()
    
    return await _oauth_upsert(db, request, info["sub"], info["email"], info.get("name", ""), info.get("picture"), AuthProvider.google)


@router.get("/github/url")
async def github_auth_url():
    params = f"client_id={settings.GITHUB_CLIENT_ID}&scope=user:email"
    return {"url": f"https://github.com/login/oauth/authorize?{params}"}


@router.post("/github/callback")
async def github_callback(code: str, request: Request, db: AsyncSession = Depends(get_db)):
    async with httpx.AsyncClient() as client:
        token_resp = await client.post(
            "https://github.com/login/oauth/access_token",
            data={"client_id": settings.GITHUB_CLIENT_ID, "client_secret": settings.GITHUB_CLIENT_SECRET, "code": code},
            headers={"Accept": "application/json"},
        )
        access_token = token_resp.json().get("access_token")
        
        user_resp = await client.get("https://api.github.com/user", headers={"Authorization": f"Bearer {access_token}"})
        emails_resp = await client.get("https://api.github.com/user/emails", headers={"Authorization": f"Bearer {access_token}"})
        info = user_resp.json()
        emails = emails_resp.json()
    
    primary_email = next((e["email"] for e in emails if e["primary"]), None)
    return await _oauth_upsert(db, request, str(info["id"]), primary_email, info.get("name") or info["login"], info.get("avatar_url"), AuthProvider.github)


async def _oauth_upsert(db, request, provider_id, email, name, avatar_url, provider: AuthProvider):
    """Find or create user from OAuth, return tokens"""
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    
    if not user:
        user = User(name=name, email=email, auth_provider=provider, provider_id=provider_id, avatar_url=avatar_url)
        db.add(user)
        await db.flush()
        await _log_action(db, user.id, f"auth.oauth_register.{provider.value}", request)
    else:
        user.avatar_url = avatar_url
        user.last_login = datetime.now(timezone.utc)
        await _log_action(db, user.id, f"auth.oauth_login.{provider.value}", request)
    
    return TokenOut(
        access_token=create_access_token(user.id),
        refresh_token=create_refresh_token(user.id),
        user=_user_dict(user),
    )
