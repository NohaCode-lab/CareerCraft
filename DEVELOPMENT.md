# 💻 CareerCraft Developer Experience & Development Guide

> **Authoritative Specification**: This document is the **Single Source of Truth for local development, environment setup, package management, service execution, debugging, and developer workflows** within CareerCraft.

---

## 1. Purpose

`DEVELOPMENT.md` provides an onboarding guide for human software engineers, DevOps specialists, QA engineers, and AI coding assistants setting up and running CareerCraft locally.

### Documentation Boundaries
- **`DEVELOPMENT.md`** owns local developer setup, `.env` file templates, package installation, service startup, hot-reloading, debugging, and developer troubleshooting.
- It does NOT replace system architecture ([`ARCHITECTURE.md`](ARCHITECTURE.md)), AI agent governance ([`AGENTS.md`](AGENTS.md)), API contracts ([`docs/API.md`](docs/API.md)), AI Gateway design ([`docs/AI-GATEWAY.md`](docs/AI-GATEWAY.md)), or deployment specs ([`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)). It follows a **Summarize $\rightarrow$ Link $\rightarrow$ Delegate** pattern.

---

## 2. Repository Architecture for Developers

CareerCraft is structured as a polyglot microservice monorepo:

```text
CareerCraft Root Directory
├── src/                  # React 19 + TypeScript 5.8 Frontend SPA
├── backend/              # Node.js 24 LTS + Fastify 5 Backend-for-Frontend (BFF)
├── ai-service/           # Python 3.11 + FastAPI 0.115 AI Microservice (LangGraph)
├── docs/                 # Authoritative Subsystem Specifications & ADRs
├── scripts/              # Automated Architecture, i18n & Theme Audit Scripts
├── Dockerfile            # Multi-stage Frontend Nginx Dockerfile
├── backend/Dockerfile    # Fastify BFF Production Dockerfile
├── ai-service/Dockerfile # Python FastAPI AI Service Dockerfile
├── docker-compose.yml    # Container Orchestration File
└── package.json          # Monorepo Quality Gate & Validation Scripts
```

For high-level system topology and data flow diagrams, see [`ARCHITECTURE.md`](ARCHITECTURE.md).

---

## 3. Prerequisites & Runtime Versions

Verify local environment compatibility against the following runtime standards:

| Tool / Runtime | Required Version | Usage / Layer | Verification Command |
| :--- | :---: | :--- | :--- |
| **Node.js** | `v24.x` LTS | Frontend Build / Fastify BFF | `node -v` |
| **npm** | `v10.x` or higher | Package Management | `npm -v` |
| **Python** | `3.11.x` | AI Microservice & LangGraph | `python --version` |
| **pip** | `v23.x` or higher | Python Dependencies | `pip --version` |
| **Docker Desktop** | `v24.x` or higher | Local Container Mesh (Optional) | `docker --version` |
| **Docker Compose** | `v2.20` or higher | Multi-Container Orchestration | `docker compose version` |
| **Git** | `v2.40` or higher | Source Control | `git --version` |

---

## 4. Package Management

### A. Node.js & TypeScript Dependencies (`npm`)
- **First-Time Install**: Run `npm install` in root and `backend/` directories.
- **CI / Clean Install**: Use `npm ci` in CI environments to install locked versions from `package-lock.json`.

```bash
# Install Root (Frontend) Dependencies
npm install

# Install Backend (Fastify BFF) Dependencies
cd backend && npm install && cd ..
```

### B. Python AI Microservice Dependencies (`pip`)
- **Virtual Environment**: Always use a dedicated Python virtual environment (`.venv`) inside `ai-service/`.

```bash
cd ai-service

# Create Virtual Environment
python -m venv .venv

# Activate Virtual Environment
# Windows PowerShell:
.\.venv\Scripts\Activate.ps1
# macOS / Linux:
source .venv/bin/activate

# Install Python Requirements
pip install -r requirements.txt
```

---

## 5. Environment Configuration & Variable Reference Table

Configuration parameters are loaded via `Zod` schema validation in Fastify BFF (`backend/src/app/config.ts`) and `pydantic-settings` in the Python AI Service.

> 🔒 **SECURITY MANDATE**: NEVER commit real secrets or API keys. `.env` and `.env.local` files are git-ignored.

### Master Environment Variable Reference

| Variable Name | Service | Required? | Secret? | Default Value | Purpose / Description |
| :--- | :---: | :---: | :---: | :--- | :--- |
| `NODE_ENV` | BFF | Yes | No | `development` | Environment mode (`development`, `test`, `production`) |
| `PORT` | BFF | Yes | No | `4000` | Fastify BFF HTTP listener port |
| `HOST` | BFF | Yes | No | `127.0.0.1` | Fastify BFF bind address |
| `LOG_LEVEL` | BFF | No | No | `info` | Pino logging level (`debug`, `info`, `warn`, `error`) |
| `CORS_ORIGIN` | BFF | Yes | No | `http://localhost:5173` | Allowed frontend origin for CORS policies |
| `RATE_LIMIT_MAX` | BFF | No | No | `100` | Sliding window rate limit per IP per minute |
| `OPENROUTER_API_KEY` | BFF | No* | **YES** | *Empty string* | Cloud API key for OpenRouter models. If omitted, falls back to `MockAIProvider`. |
| `OLLAMA_BASE_URL` | BFF | No | No | `http://127.0.0.1:11434` | Base URL for local Ollama LLM engine |
| `AI_SERVICE_URL` | BFF | Yes | No | `http://127.0.0.1:8000` | Destination URL for Python FastAPI AI Service |
| `INTERNAL_SERVICE_TOKEN` | Both | Yes | **YES** | `dev-secret-token` | Internal authorization token for BFF $\rightarrow$ FastAPI calls |
| `VITE_API_URL` | Frontend| Yes | No | `http://localhost:4000` | Backend API base URL for React SPA |

### Setup `.env` Files
Create `backend/.env` for local BFF execution:

```ini
# backend/.env Template
NODE_ENV=development
PORT=4000
HOST=127.0.0.1
LOG_LEVEL=info
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_MAX=100
OPENROUTER_API_KEY=sk-or-v1-your-key-here
OLLAMA_BASE_URL=http://127.0.0.1:11434
AI_SERVICE_URL=http://127.0.0.1:8000
INTERNAL_SERVICE_TOKEN=dev-secret-token-change-in-prod
```

---

## 6. Local Service Topology

Local execution maps across 3 primary microservices:

```text
[ React 19 Frontend ] ──► Port 5173 (Vite Dev Server)
[ Fastify 5 BFF ]     ──► Port 4000 (Node.js Process / tsx watch)
[ FastAPI AI Service ]──► Port 8000 (Python Process / uvicorn reload)
```

---

## 7. Starting the Frontend (React 19 SPA)

```bash
# Start Vite Development Server with Hot-Reload
npm run dev

# Server running at: http://localhost:5173
```

- **Build Check**: Test static bundle production output via `npm run build`.
- **Preview Output**: Preview compiled production build locally via `npm run preview`.

---

## 8. Starting the Fastify BFF

```bash
cd backend

# Start Fastify BFF Server with Hot-Reload (tsx watch)
npm run dev

# Server running at: http://localhost:4000
```

- **Health Check Verification**: Open `http://localhost:4000/api/v1/health` in your browser.
- Detailed API endpoint specifications reside in [`docs/API.md`](docs/API.md).

---

## 9. Starting the Python AI Microservice

```bash
cd ai-service
.\.venv\Scripts\activate  # Windows
# source .venv/bin/activate # macOS/Linux

# Start FastAPI Microservice with Auto-Reload
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload

# Service running at: http://localhost:8000
```

- **Documentation**: Swagger interactive docs available at `http://localhost:8000/docs`.

---

## 10. Running the Complete System (Local Native Workflow)

To launch all 3 services concurrently in native development mode:

1. **Terminal 1 (Python AI Service)**: Launch FastAPI on port `8000`.
2. **Terminal 2 (Fastify BFF)**: Launch Fastify on port `4000`.
3. **Terminal 3 (React SPA)**: Launch Vite dev server on port `5173`.
4. Open `http://localhost:5173` in your browser.

---

## 11. Docker Development Workflow

To build and run the entire multi-container topology using Docker:

```bash
# Build and start containers in foreground
docker compose up --build

# Run in background (detached mode)
docker compose up -d --build

# View container logs
docker compose logs -f

# Inspect container status
docker compose ps

# Stop containers
docker compose down
```

For container production configurations, see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

---

## 12. Step-by-Step Developer Workflow

Follow this standardized workflow when making code changes:

```text
1. Pull Latest Code  ──► 2. Create Feature Branch ──► 3. Edit Code
                                                            │
6. Git Commit        ◄── 5. Run npm run validate  ◄── 4. Local Test
```

1. **Pull Latest Main**: `git checkout main && git pull origin main`
2. **Create Branch**: `git checkout -b feature/your-feature-name`
3. **Implement Changes**: Edit source files cleanly.
4. **Local Verification**: Verify components locally at `http://localhost:5173`.
5. **Release Gate Run**: Execute `npm run validate` to pass all 7 gates.
6. **Commit Changes**: Commit with descriptive message and create Pull Request.

---

## 13. Debugging Procedures & Log Locations

### A. Frontend Debugging
- Open Chrome / Firefox Developer Tools (`F12`).
- Inspect Console logs and Network tab (`/api/v1/*` requests).

### B. Fastify BFF Debugging
- Fastify writes structured JSON Pino logs to `stdout`.
- Inspect correlation ID header (`x-request-id`) in API response headers to trace specific requests.
- See [`docs/OBSERVABILITY.md`](docs/OBSERVABILITY.md).

### C. Python AI Service Debugging
- Uvicorn outputs colored log lines to terminal `stdout`.
- Inspect tracebacks for LangGraph node failures.

---

## 14. Testing During Development

Execute targeted test commands during feature iteration:

```bash
# Run Vitest Suite Once
npm test

# Run Vitest Suite in Interactive Watch Mode
npx vitest

# Run Specific Test File
npx vitest src/services/__tests__/storageService.test.ts

# Execute Full 7-Step Quality Gate
npm run validate
```

---

## 15. Common Development Failures & Troubleshooting Matrix

| Symptom | Likely Cause | Diagnostic Step | Correct Fix |
| :--- | :--- | :--- | :--- |
| **`ECONNREFUSED 127.0.0.1:4000`** | Fastify BFF service not running | Check terminal output for backend process | Run `npm run dev` inside `backend/` directory. |
| **`ECONNREFUSED 127.0.0.1:8000`** | Python AI microservice not running | Check `http://localhost:8000/health` | Activate `.venv` and launch `uvicorn app.main:app --port 8000`. |
| **`401 Unauthorized` on AI Workflows** | Missing or mismatched `INTERNAL_SERVICE_TOKEN` | Check `backend/.env` vs `ai-service` environment | Ensure `INTERNAL_SERVICE_TOKEN` matches in both backend and Python services. |
| **`i18n:check` Gate Failure** | Missing translation key in `de` or `ar` dictionary | Run `npm run i18n:check` | Ensure key parity across `en`, `de`, and `ar` in `src/utils/i18n.ts`. |
| **`ui:audit` Gate Failure** | Raw un-prefixed dark class used (e.g. `text-slate-400`) | Run `npm run ui:audit` | Add light mode counterpart (e.g. `text-slate-500 dark:text-slate-400`). |
| **`arch:audit` Gate Failure** | Plain `.js` or `.jsx` file present in `src/` | Run `npm run arch:audit` | Convert `.js` file to strictly typed `.ts` or `.tsx`. |

---

## 16. AI-Assisted Development Workflow

When using AI coding assistants (Antigravity, Copilot, Claude):
1. Always refer to [`AGENTS.md`](AGENTS.md) as the authoritative AI operating manual.
2. Ensure AI assistants inspect existing types and components before writing code.
3. Require AI assistants to run `npm run validate` before claiming completion.

---

## 17. Release Version Governance

CareerCraft enforces a deterministic, automated versioning architecture to prevent release version drift:

```text
package.json (version) ──► Authoritative Platform Application SOT
       │
       ├── README.md (Release Badge) ──► Verified Equality
       ├── Git Tag (vX.Y.Z) ──────────► Verified when tagged
       └── CI Pipeline ────────────────► Automated Enforcement (`npm run version:check`)
```

### Versioning Principles & Boundaries
1. **Application Version Source of Truth**: The `version` field in root [`package.json`](package.json) is the single authoritative source of truth for the CareerCraft platform release version (e.g. `1.0.3-rc`).
2. **Backend Service Version Isolation**: [`backend/package.json`](backend/package.json) manages an independent microservice package version (`careercraft-backend`, e.g. `1.0.0`) and is intentionally decoupled from platform application releases.
3. **AI Service Version Isolation**: [`ai-service/app/main.py`](ai-service/app/main.py) manages an independent microservice version (`careercraft-ai-service`, e.g. `1.0.0`).
4. **Stable Release Naming**: Stable platform releases use Semantic Versioning (e.g. `1.0.2`), with Git tags prefixed by `v` (e.g. `v1.0.2`).
5. **Release Candidate Naming**: Pre-release builds use standard prerelease semver suffixes (e.g. `1.0.3-rc`). Normal development branches do not require an active Git tag.
6. **Automated CI Enforcement**: `npm run version:check` ([`scripts/check-version-governance.js`](scripts/check-version-governance.js)) validates version consistency on every CI run and inside `npm run validate`.

### Standard Release Procedure
To release a new version of CareerCraft:
1. Update `version` in root [`package.json`](package.json) (e.g. `1.0.3`).
2. Update the release badge in [`README.md`](README.md) to match (e.g. `Release-v1.0.3`).
3. Run `npm run version:check` and `npm run validate` to confirm zero drift.
4. Commit changes and create Git release tag `v1.0.3`.

---

## 18. Documentation Navigation Hub

Use this directory to locate authoritative subsystem specifications:

| Domain Need | Authoritative Document |
| :--- | :--- |
| **Master System Architecture & Service Maps** | [`ARCHITECTURE.md`](ARCHITECTURE.md) |
| **AI Coding Agent Rules & Governance** | [`AGENTS.md`](AGENTS.md) |
| **BFF REST API Endpoints & Zod Schemas** | [`docs/API.md`](docs/API.md) |
| **Native AI Gateway & Model Resilience** | [`docs/AI-GATEWAY.md`](docs/AI-GATEWAY.md) |
| **Docker Compose & Deployment Specs** | [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) |
| **UI Design System, Theme Tokens & Guidelines** | [`docs/UI-POLICY.md`](docs/UI-POLICY.md) |
| **Translation Governance & Key Parity Rules** | [`docs/LANGUAGE-POLICY.md`](docs/LANGUAGE-POLICY.md) |
| **Technical i18n & RTL Layout Engine** | [`docs/INTERNATIONALIZATION.md`](docs/INTERNATIONALIZATION.md) |
| **Pino Logging, Correlation IDs & Tracing** | [`docs/OBSERVABILITY.md`](docs/OBSERVABILITY.md) |
| **Vite Bundle Optimization & Performance** | [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md) |

---

## 18. Known Documentation Drift

1. **TypeScript Version**: `README.md` badge states TS `5.7`; `package.json` specifies TS `5.8.2`.
2. **React Version**: `README.md` badge states React `19.0`; `package.json` specifies React `19.2.4`.
3. **Docker Node Base Images**: Frontend `Dockerfile` uses `node:20-alpine`, while `backend/Dockerfile` uses `node:24-alpine`.
4. **LiteLLM vs Native AI Gateway**: `README.md` emphasizes LiteLLM proxy container on port 4001, whereas `docs/AI-GATEWAY.md` clarifies that the native Fastify `AIGatewayService` is the primary operational gateway.
5. **External OTEL Collectors**: `README.md` mentions external collector containers, whereas `docs/OBSERVABILITY.md` clarifies that OTEL Collectors are not currently deployed in `docker-compose.yml`.

---

## 19. Development Invariants

1. **Zero Secret Commits**: Never commit passwords, tokens, or API keys to git tracking.
2. **No Ad-Hoc Symptom Patching**: Fix root causes instead of applying `@ts-ignore` suppressions.
3. **Strict Validation Passing**: All code modifications MUST pass `npm run validate` prior to deployment.
