# 🚀 CareerCraft Deployment & DevOps Architecture

## 1. Deployment Architecture Overview

CareerCraft is packaged as a multi-container microservice application designed for rapid local containerized development (`docker-compose`) and automated continuous integration (`GitHub Actions`).

```text
                               CAREERCRAFT CONTAINER TOPOLOGY
                                              │
    ┌─────────────────────────────────────────┼─────────────────────────────────────────┐
    ▼                                         ▼                                         ▼
Container: `frontend`              Container: `backend`                 Container: `ai-service`
(Port 5173 : 80)                   (Port 4000 : 4000)                  (Port 8000 : 8000)
 ├── Nginx Static Web Server       ├── Node 24 LTS / Fastify 5 BFF     ├── Python 3.11 / FastAPI
 └── Compiled React 19 SPA Asset    └── Native AI Gateway Service       └── LangGraph Workflow Engine
                                              │
                                              ▼
                                 Container: `litellm-gateway`
                                 (Port 4001 : 4001 - Optional Proxy)
```

---

## 2. Container Architecture & Dockerfiles

The platform contains three multi-stage Docker build files:

### 1. Frontend Dockerfile (`Dockerfile`)
* **Location**: [`Dockerfile`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/Dockerfile)
* **Stage 1 (Build)**: `node:20-alpine` runs `npm ci` and `npm run build` to compile Vite static assets into `dist/`.
* **Stage 2 (Serving)**: `nginx:alpine` copies `dist/` into `/usr/share/nginx/html` and serves web requests on port `80`.

### 2. Backend Dockerfile (`backend/Dockerfile`)
* **Location**: `backend/Dockerfile`
* **Base Image**: `node:24-alpine`
* **Build**: Runs TypeScript compilation (`npm run build` $\rightarrow$ `tsc`).
* **Runtime**: Launches the compiled Fastify BFF server (`node dist/server.js`) exposing port `4000`.

### 3. AI Microservice Dockerfile (`ai-service/Dockerfile`)
* **Location**: `ai-service/Dockerfile`
* **Base Image**: `python:3.11-slim`
* **Dependencies**: Installs `requirements.txt` (`fastapi`, `uvicorn`, `langgraph`, `pydantic-settings`, `httpx`).
* **Runtime**: Launches Uvicorn server (`uvicorn app.main:app --host 0.0.0.0 --port 8000`).

---

## 3. Docker Compose Orchestration

Local development and containerized multi-service deployment are orchestrated via Docker Compose.

* **Source File**: [`docker-compose.yml`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/docker-compose.yml)

### Services & Port Mappings

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "5173:80"
    environment:
      - VITE_API_URL=http://localhost:4000
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - PORT=4000
      - HOST=0.0.0.0
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - AI_SERVICE_URL=http://ai-service:8000
    depends_on:
      - ai-service

  ai-service:
    build: ./ai-service
    ports:
      - "8000:8000"
    environment:
      - PORT=8000
      - HOST=0.0.0.0

  litellm-gateway:
    image: ghcr.io/berriai/litellm:main-v1.45.0
    ports:
      - "4001:4001"
    volumes:
      - ./litellm-config.yaml:/app/config.yaml
    command: ["--config", "/app/config.yaml", "--port", "4001"]
```

---

## 4. GitHub Actions CI/CD Pipeline

Continuous Integration is automated using GitHub Actions to enforce quality gates on every push and pull request to `main`.

* **Workflow File**: [`.github/workflows/ci.yml`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/.github/workflows/ci.yml)

```text
GitHub Actions CI Pipeline Jobs (`ci.yml`)
 ├── 1. Checkout Repository (`actions/checkout@v4`)
 ├── 2. Setup Node.js 24 LTS (`actions/setup-node@v4`)
 ├── 3. Setup Python 3.11 (`actions/setup-python@v5`)
 ├── 4. Execute Python Pytest Suite (`pytest ai-service/`) -> 13 Tests PASS
 ├── 5. Execute Frontend/Backend Vitest Suite (`npm run test`) -> 79 Tests PASS
 ├── 6. Execute ESLint Static Analysis (`npm run lint`) -> 0 Errors
 ├── 7. Fastify TypeScript Compilation (`npm --prefix backend run build`)
 └── 8. Vite Production Bundle Build (`npm run build`)
```

---

## 5. Environment Variables & Secret Security

1. **Client SPA Isolation**: No API keys are embedded in frontend build environments.
2. **Server-Side Environment File**: `backend/.env` holds sensitive environment variables (`OPENROUTER_API_KEY`, `INTERNAL_SERVICE_TOKEN`, `PORT`, `HOST`).
3. **Git Exclusion**: `.env` and `.env.local` files are explicitly excluded in `.gitignore` to prevent secret commits.

---

## 6. Deployment Readiness Matrix

| Environment Domain | Category | Implementation Evidence | Status |
| :--- | :--- | :--- | :---: |
| **Docker Compose** | Local / Staging | `docker-compose.yml` | **IMPLEMENTED** |
| **Multi-Stage Docker** | Build System | `Dockerfile`, `backend/Dockerfile` | **IMPLEMENTED** |
| **CI Quality Gate** | Integration | `.github/workflows/ci.yml` | **IMPLEMENTED** |
| **BFF Microservice** | Runtime | `backend/src/server.ts` | **IMPLEMENTED** |
| **Cloud Domain / SSL**| Production | N/A | **NOT VERIFIED** |
| **Kubernetes Helm** | Infrastructure | N/A | **NOT PRESENT** |

---

## 7. Current Deployment Limitations

* **Cloud Infrastructure**: Staging and production cloud server deployment targets (e.g. AWS ECS, GCP Cloud Run, DigitalOcean App Platform) and HTTPS SSL certificate termination are **not currently verified** in the repository.
* **Database Migration**: Current relational schema operations run in-memory or via Supabase client library calls. Dedicated server-side SQL migration runners are managed via cloud connection strings.

---

## Related Documentation

- [AI Gateway](./AI-GATEWAY.md)
- [API Reference](./API.md)
- [Observability & Telemetry](./OBSERVABILITY.md)
- [Performance Engineering](./PERFORMANCE.md)
- [Internationalization](./INTERNATIONALIZATION.md)
