# Director

> *Scientific research, orchestrated.*

A platform for doctoral candidates and researchers. It holds your protocol,
generates the prompts that drive the AI models, and tracks PRISMA, references
and statistical synthesis in one place — so the methodology stays explicit and
the project stays reproducible.

*Versión en español: [README.es.md](README.es.md)*

## What it actually does

Director is a **methodology engine**, not a chat wrapper. Around 45 modules
walk a study from a vague idea to a defensible manuscript, each one producing a
strict, parameterized prompt from the fields you fill in — and each one named
after the instrument a methodologist would actually demand at that step.

**Question and protocol**
`DUM-0` question refiner (initial idea → methodological critique + three
refined PICO/PECO questions) · `DUM-1` objectives and study design ·
`DUM-2` strict PICO builder · `DUM-3` modality selection ·
`C1` theme, problem, question and hypothesis, objectives, justification ·
`C2` background, theoretical bases, operational definitions ·
`C3` design, setting and period, universe and sample size, inclusion/exclusion
criteria, variable operationalization table, instruments and validation,
analysis plan, ethics, Gantt schedule, budget

**Evidence retrieval and screening**
`M0` search strings per database · `AP-1/AP-2` corpus onboarding and
classification · `PRISMA` flow narrative with a Mermaid diagram

**Appraisal**
`M3-A` QUADAS-2 for diagnostic accuracy · `M3-B` JBI for prevalence ·
`M3-C` ROB-2 and ROBINS-I for trials and observational studies

**Synthesis**
`M4-A` bivariate / HSROC diagnostic meta-analysis · `M4-B` meta-proportion ·
`M4-C` meta-regression and subgroup analysis · `M5` qualitative synthesis
(SWiM) · `M6` methodological triangulation · `GRADE` certainty of evidence with
Summary of Findings table and explicit downgrades · `BIAS` publication bias
(Egger, Begg, Deeks)

**Write-up**
`C4` results and discussion · `C5` conclusions and recommendations ·
`P5` structured IMRaD abstract · `B1` Vancouver/APA bibliography · `B2` annexes

Each module ships two prompt templates — a minimal and a maximal version — so
the same step works with a small local model or a frontier one.

## Architecture

```
backend/     FastAPI · SQLAlchemy 2 (async, asyncpg) · JWT + OAuth · structlog
frontend/    Vue 3 · Vite · TypeScript · Pinia stores
nginx/       reverse proxy, TLS termination
docker-compose.yml   nginx · frontend · backend · Postgres 16 · Redis 7
.github/workflows/   CI and deploy
```

Data model: users, projects, study fields, prompt history, PRISMA records,
references, project snapshots, audit log. Study state is persisted per project,
so the protocol you built in module `C3-E` is still there when module `M2` asks
for the variables — that continuity is the whole point.

The repository also carries `frontend/public/iasig-citologia.html`, a
self-contained specialization of the module bank for a cervical cytology
research line.

## Status

| Area | State |
|---|---|
| Frontend, all research modules and prompt generation | working |
| Auth (JWT + OAuth) and project management endpoints | implemented |
| `prompts`, `refs`, `state`, `admin` routers | stubs — the frontend holds this state for now |
| Alembic migrations | dependency configured, migration files not yet committed |
| Test suite | scaffolded, not yet written |

## Local development

```bash
# database and cache
docker compose -f docker-compose.dev.yml up -d db cache

# backend
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# frontend
cd frontend
npm install
npm run dev
```

## Deployment (Docker Compose)

Ubuntu 22.04+, Docker and Docker Compose, a domain pointing at the host, 8 GB
RAM for the full stack.

```bash
git clone https://github.com/iamstudio2026/Director.git /opt/director
cd /opt/director
cp .env.example .env      # keys, database, OAuth
```

TLS certificates before bringing nginx up:

```bash
sudo apt install certbot
sudo certbot certonly --standalone -d director.yourdomain.com
mkdir -p nginx/certs
cp /etc/letsencrypt/live/director.yourdomain.com/fullchain.pem nginx/certs/
cp /etc/letsencrypt/live/director.yourdomain.com/privkey.pem  nginx/certs/
```

```bash
docker compose up -d
```

## Why this exists

Postgraduate researchers do not fail for lack of an AI model. They fail because
the design does not answer the question, the appraisal instrument does not match
the study type, or the synthesis pools things that should never have been
pooled. Director encodes those decisions as steps you cannot skip silently.

Built by [Vicente Ernesto González-Aramayo, PhD](https://github.com/vicenternesto86)
— epidemiologist (INSP Mexico), graduate faculty in research methodology — at
[IAM-Studio](https://iamstudio.cloud).

## License

MIT
