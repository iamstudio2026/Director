"""
Director by IAM-Studio — Backend API
FastAPI application entry point
"""
from contextlib import asynccontextmanager
import structlog
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from app.core.config import settings
from app.core.logging import configure_logging
from app.core.database import engine, Base
from app.models import models  # Importar modelos para create_all
from app.routers import auth, projects, state, prompts, refs, admin

# Configure structured logging early
configure_logging()
logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    logger.info("director_startup", version="1.0.0", env=settings.ENVIRONMENT)
    # Crear tablas en la base de datos si no existen (reemplazo de alembic)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    logger.info("director_shutdown")


app = FastAPI(
    title="Director by IAM-Studio",
    description="API para la plataforma de investigación científica Director",
    version="1.0.0",
    docs_url="/api/docs" if settings.ENVIRONMENT != "production" else None,
    redoc_url="/api/redoc" if settings.ENVIRONMENT != "production" else None,
    lifespan=lifespan,
)

# ─── Middleware ────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if settings.ENVIRONMENT == "production":
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])

# ─── Routers ──────────────────────────────────────────────────────────────────
app.include_router(auth.router,     prefix="/api/auth",     tags=["Autenticación"])
app.include_router(projects.router, prefix="/api/projects", tags=["Proyectos"])
app.include_router(state.router,    prefix="/api/projects", tags=["Estado"])
app.include_router(prompts.router,  prefix="/api/projects", tags=["Prompts"])
app.include_router(refs.router,     prefix="/api/projects", tags=["Referencias"])
app.include_router(admin.router,    prefix="/api/admin",    tags=["Administración"])

# ─── Health check ─────────────────────────────────────────────────────────────
@app.get("/api/health", tags=["Sistema"])
async def health():
    return {"status": "ok", "app": "Director", "version": "1.0.0"}
