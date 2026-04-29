"""
Projects CRUD + State + Prompts + PRISMA routers
"""
from datetime import datetime, timezone
import structlog
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.core.database import get_db
from app.models.models import Project, StudyField, PromptHistory, PrismaRecord, AuditLog
from app.routers.auth import get_current_user
from app.models.models import User

router = APIRouter()
logger = structlog.get_logger()


# ─── Schemas ──────────────────────────────────────────────────────────────────
class ProjectIn(BaseModel):
    title: str
    description: str | None = None
    modality: str | None = None

class ProjectOut(BaseModel):
    id: str
    title: str
    description: str | None
    modality: str | None
    is_archived: bool
    created_at: datetime
    updated_at: datetime

class StateIn(BaseModel):
    fields: dict[str, str]  # key → value pairs

class PromptIn(BaseModel):
    module_key: str
    prompt_text: str
    compress_level: str = "standard"


# ─── PROJECTS ─────────────────────────────────────────────────────────────────
@router.get("", summary="Listar proyectos")
async def list_projects(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Project).where(Project.user_id == current_user.id, Project.is_archived == False)
        .order_by(Project.updated_at.desc())
    )
    projects = result.scalars().all()
    return [{"id": p.id, "title": p.title, "modality": p.modality, "updated_at": p.updated_at} for p in projects]


@router.post("", status_code=201, summary="Crear proyecto")
async def create_project(
    body: ProjectIn,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    project = Project(user_id=current_user.id, **body.model_dump())
    db.add(project)
    await db.flush()
    db.add(AuditLog(user_id=current_user.id, project_id=project.id, action="project.create",
                    ip_address=request.client.host if request.client else None))
    logger.info("project_created", user_id=current_user.id, project_id=project.id)
    return {"id": project.id, "title": project.title}


@router.get("/{project_id}", summary="Obtener proyecto")
async def get_project(
    project_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    project = await _get_owned_project(project_id, current_user.id, db)
    return {"id": project.id, "title": project.title, "description": project.description,
            "modality": project.modality, "updated_at": project.updated_at}


@router.put("/{project_id}", summary="Actualizar proyecto")
async def update_project(
    project_id: str,
    body: ProjectIn,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    project = await _get_owned_project(project_id, current_user.id, db)
    for k, v in body.model_dump(exclude_none=True).items():
        setattr(project, k, v)
    project.updated_at = datetime.now(timezone.utc)
    return {"ok": True}


@router.delete("/{project_id}", summary="Archivar proyecto")
async def archive_project(
    project_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    project = await _get_owned_project(project_id, current_user.id, db)
    project.is_archived = True
    return {"ok": True}


# ─── STATE ────────────────────────────────────────────────────────────────────
@router.get("/{project_id}/state", summary="Obtener estado del estudio")
async def get_state(
    project_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await _get_owned_project(project_id, current_user.id, db)
    result = await db.execute(select(StudyField).where(StudyField.project_id == project_id))
    fields = result.scalars().all()
    return {"fields": {f.field_key: f.field_value for f in fields}}


@router.put("/{project_id}/state", summary="Guardar estado del estudio")
async def save_state(
    project_id: str,
    body: StateIn,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    project = await _get_owned_project(project_id, current_user.id, db)
    
    # Upsert all fields
    existing = await db.execute(select(StudyField).where(StudyField.project_id == project_id))
    existing_map = {f.field_key: f for f in existing.scalars().all()}
    
    for key, value in body.fields.items():
        if key in existing_map:
            existing_map[key].field_value = value
        else:
            db.add(StudyField(project_id=project_id, field_key=key, field_value=value))
    
    project.updated_at = datetime.now(timezone.utc)
    db.add(AuditLog(user_id=current_user.id, project_id=project_id, action="state.save",
                    ip_address=request.client.host if request.client else None,
                    detail=f"{len(body.fields)} fields"))
    return {"ok": True, "fields_saved": len(body.fields)}


# ─── PROMPTS ──────────────────────────────────────────────────────────────────
@router.get("/{project_id}/history", summary="Historial de prompts")
async def get_history(
    project_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    limit: int = 50,
):
    await _get_owned_project(project_id, current_user.id, db)
    result = await db.execute(
        select(PromptHistory).where(PromptHistory.project_id == project_id)
        .order_by(PromptHistory.created_at.desc()).limit(limit)
    )
    items = result.scalars().all()
    return [{"id": h.id, "module_key": h.module_key, "compress_level": h.compress_level,
             "char_count": h.char_count, "created_at": h.created_at,
             "prompt_text": h.prompt_text} for h in items]


@router.post("/{project_id}/prompts", status_code=201, summary="Guardar prompt generado")
async def save_prompt(
    project_id: str,
    body: PromptIn,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await _get_owned_project(project_id, current_user.id, db)
    h = PromptHistory(
        project_id=project_id,
        module_key=body.module_key,
        prompt_text=body.prompt_text,
        compress_level=body.compress_level,
        char_count=len(body.prompt_text),
    )
    db.add(h)
    db.add(AuditLog(user_id=current_user.id, project_id=project_id, action="prompt.generate",
                    module_key=body.module_key, ip_address=request.client.host if request.client else None))
    return {"id": h.id}


# ─── EXPORT / IMPORT ──────────────────────────────────────────────────────────
@router.get("/{project_id}/export", summary="Exportar JSON completo")
async def export_project(
    project_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Compatible con el formato de exportación del HTML original"""
    await _get_owned_project(project_id, current_user.id, db)
    state_result = await db.execute(select(StudyField).where(StudyField.project_id == project_id))
    fields = {f.field_key: f.field_value for f in state_result.scalars().all()}
    return {"version": "1.0", "exported_at": datetime.now(timezone.utc).isoformat(), "fields": fields}


# ─── Helper ───────────────────────────────────────────────────────────────────
async def _get_owned_project(project_id: str, user_id: str, db: AsyncSession) -> Project:
    result = await db.execute(
        select(Project).where(Project.id == project_id, Project.user_id == user_id)
    )
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    return project
