"""
SQLAlchemy models for Director by IAM-Studio
"""
import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Text, DateTime, Boolean, ForeignKey, JSON, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
import enum

from app.core.database import Base


def utcnow():
    return datetime.now(timezone.utc)


def new_uuid():
    return str(uuid.uuid4())


class UserRole(str, enum.Enum):
    admin = "admin"
    researcher = "researcher"
    viewer = "viewer"


class AuthProvider(str, enum.Enum):
    email = "email"
    google = "google"
    github = "github"


# ─── Users ────────────────────────────────────────────────────────────────────
class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    password_hash: Mapped[str | None] = mapped_column(String(255), nullable=True)
    role: Mapped[UserRole] = mapped_column(SAEnum(UserRole), default=UserRole.researcher)
    institution: Mapped[str | None] = mapped_column(String(200), nullable=True)
    avatar_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    auth_provider: Mapped[AuthProvider] = mapped_column(SAEnum(AuthProvider), default=AuthProvider.email)
    provider_id: Mapped[str | None] = mapped_column(String(200), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    last_login: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    projects: Mapped[list["Project"]] = relationship("Project", back_populates="owner", cascade="all, delete-orphan")
    audit_logs: Mapped[list["AuditLog"]] = relationship("AuditLog", back_populates="user")


# ─── Projects ─────────────────────────────────────────────────────────────────
class Project(Base):
    __tablename__ = "projects"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    modality: Mapped[str | None] = mapped_column(String(50), nullable=True)  # umbrella|systematic_review|primary|other
    is_archived: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    owner: Mapped[User] = relationship("User", back_populates="projects")
    study_fields: Mapped[list["StudyField"]] = relationship("StudyField", back_populates="project", cascade="all, delete-orphan")
    prompt_history: Mapped[list["PromptHistory"]] = relationship("PromptHistory", back_populates="project", cascade="all, delete-orphan")
    prisma: Mapped["PrismaRecord | None"] = relationship("PrismaRecord", back_populates="project", uselist=False, cascade="all, delete-orphan")
    references: Mapped[list["Reference"]] = relationship("Reference", back_populates="project", cascade="all, delete-orphan")
    snapshots: Mapped[list["ProjectSnapshot"]] = relationship("ProjectSnapshot", back_populates="project", cascade="all, delete-orphan")
    audit_logs: Mapped[list["AuditLog"]] = relationship("AuditLog", back_populates="project")


# ─── Study State (key-value store for studyContext + moduleFieldValues) ───────
class StudyField(Base):
    __tablename__ = "study_fields"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    project_id: Mapped[str] = mapped_column(String(36), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    field_key: Mapped[str] = mapped_column(String(200), nullable=False)     # e.g. "RESEARCH_QUESTION" or "C1-B|notes"
    field_value: Mapped[str | None] = mapped_column(Text, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    project: Mapped[Project] = relationship("Project", back_populates="study_fields")


# ─── Prompt History ───────────────────────────────────────────────────────────
class PromptHistory(Base):
    __tablename__ = "prompt_history"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    project_id: Mapped[str] = mapped_column(String(36), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    module_key: Mapped[str] = mapped_column(String(50), nullable=False)     # e.g. "C1-B", "M4-A"
    prompt_text: Mapped[str] = mapped_column(Text, nullable=False)
    compress_level: Mapped[str] = mapped_column(String(20), default="standard")  # minimal|standard|detailed
    char_count: Mapped[int] = mapped_column(default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    project: Mapped[Project] = relationship("Project", back_populates="prompt_history")


# ─── PRISMA Data ──────────────────────────────────────────────────────────────
class PrismaRecord(Base):
    __tablename__ = "prisma_records"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    project_id: Mapped[str] = mapped_column(String(36), ForeignKey("projects.id", ondelete="CASCADE"), unique=True)
    identified: Mapped[int] = mapped_column(default=0)
    duplicates: Mapped[int] = mapped_column(default=0)
    screened: Mapped[int] = mapped_column(default=0)
    excl_title: Mapped[int] = mapped_column(default=0)
    full_text: Mapped[int] = mapped_column(default=0)
    excl_fulltext: Mapped[int] = mapped_column(default=0)
    included: Mapped[int] = mapped_column(default=0)
    incl_qual: Mapped[int] = mapped_column(default=0)
    incl_quant: Mapped[int] = mapped_column(default=0)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    project: Mapped[Project] = relationship("Project", back_populates="prisma")


# ─── References / Bibliography ────────────────────────────────────────────────
class Reference(Base):
    __tablename__ = "references"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    project_id: Mapped[str] = mapped_column(String(36), ForeignKey("projects.id", ondelete="CASCADE"))
    ref_key: Mapped[str | None] = mapped_column(String(50), nullable=True)  # [1], [Smith2020]
    raw_text: Mapped[str] = mapped_column(Text, nullable=False)
    formatted_apa: Mapped[str | None] = mapped_column(Text, nullable=True)
    formatted_van: Mapped[str | None] = mapped_column(Text, nullable=True)
    formatted_ieee: Mapped[str | None] = mapped_column(Text, nullable=True)
    doi: Mapped[str | None] = mapped_column(String(200), nullable=True)
    pmid: Mapped[str | None] = mapped_column(String(50), nullable=True)
    is_cited: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    project: Mapped[Project] = relationship("Project", back_populates="references")


# ─── Project Snapshots (auto-backup) ─────────────────────────────────────────
class ProjectSnapshot(Base):
    __tablename__ = "project_snapshots"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    project_id: Mapped[str] = mapped_column(String(36), ForeignKey("projects.id", ondelete="CASCADE"))
    snapshot_json: Mapped[dict] = mapped_column(JSON, nullable=False)
    trigger: Mapped[str] = mapped_column(String(50), default="auto")  # auto|manual|import
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    project: Mapped[Project] = relationship("Project", back_populates="snapshots")


# ─── Audit Log ────────────────────────────────────────────────────────────────
class AuditLog(Base):
    __tablename__ = "audit_log"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    user_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    project_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("projects.id", ondelete="SET NULL"), nullable=True)
    action: Mapped[str] = mapped_column(String(100), nullable=False)    # e.g. "state.save", "prompt.generate"
    module_key: Mapped[str | None] = mapped_column(String(50), nullable=True)
    detail: Mapped[str | None] = mapped_column(Text, nullable=True)
    ip_address: Mapped[str | None] = mapped_column(String(45), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    user: Mapped[User | None] = relationship("User", back_populates="audit_logs")
    project: Mapped[Project | None] = relationship("Project", back_populates="audit_logs")
