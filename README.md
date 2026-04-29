# Director by IAM-Studio
> *Investigación científica, orquestada.*

Director es una plataforma profesional para doctorandos e investigadores. Gestiona tu protocolo, genera prompts para modelos de IA, y controla PRISMA, bibliografía y síntesis estadística desde un solo lugar.

## 🚀 Despliegue (VPS Hostinger)

El proyecto está diseñado para ejecutarse mediante Docker Compose.

### 1. Requisitos
- Servidor VPS con Ubuntu 22.04+ (recomendado 8GB RAM para todos los servicios)
- Docker y Docker Compose instalados
- Un dominio apuntando a la IP del VPS (ej. `director.iamstudio.com`)

### 2. Configuración inicial

```bash
# Clona el repositorio en el servidor
git clone https://github.com/iamstudio2026/director.git /opt/director-iamstudio
cd /opt/director-iamstudio

# Crea y configura el archivo de entorno
cp .env.example .env
nano .env # Edita las variables de entorno, claves, base de datos y OAuth
```

### 3. Generar certificados SSL (Let's Encrypt)
Antes de levantar Nginx, necesitas generar certificados para tu dominio.

```bash
sudo apt install certbot
sudo certbot certonly --standalone -d director.tudominio.com

# Copia los certificados para Nginx
mkdir -p nginx/certs
cp /etc/letsencrypt/live/director.tudominio.com/fullchain.pem nginx/certs/
cp /etc/letsencrypt/live/director.tudominio.com/privkey.pem nginx/certs/
```

### 4. Despliegue con Docker Compose
```bash
docker compose up -d
```

---

## 🛠️ Desarrollo Local

```bash
# Levantar base de datos y caché en local
docker compose -f docker-compose.dev.yml up -d db cache

# Backend (FastAPI)
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload

# Frontend (Vue 3 + Vite)
cd frontend
npm install
npm run dev
```
