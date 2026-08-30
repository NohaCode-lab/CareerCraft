# CareerCraft — AI Career & Interview Preparation Platform

> **AI-Powered Career Intelligence & Automated Interview Preparation Platform**

[![Enterprise CI](https://img.shields.io/badge/CI%2FCD-Passing-brightgreen.svg?logo=githubactions&logoColor=white)](https://github.com/NohaCode-lab/CareerCraft/actions)
[![React](https://img.shields.io/badge/React-19.2-20B2AA.svg?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-BFF%20Gateway-000000.svg?logo=fastify&logoColor=white)](https://fastify.dev)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB.svg?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-AI%20Microservice-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![LangGraph](https://img.shields.io/badge/LangGraph-Multi--Agent%20Workflows-FF6F00.svg)](https://langchain.com)
[![Vitest](https://img.shields.io/badge/Vitest-3.0-yellow.svg?logo=vitest&logoColor=white)](https://vitest.dev)
[![Pytest](https://img.shields.io/badge/Pytest-Evaluation%20Suite-0A9EDC.svg?logo=pytest&logoColor=white)](https://pytest.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg?logo=docker&logoColor=white)](https://www.docker.com/)
[![i18n](https://img.shields.io/badge/i18n-German%20%7C%20English-blueviolet.svg)](https://github.com/NohaCode-lab/CareerCraft)
[![License](https://img.shields.io/badge/License-MIT-007EC6.svg)](LICENSE)

CareerCraft is an enterprise-grade, production-ready **AI Career & Interview Preparation Platform** built with a modern multi-service topology: a **React 19 + TypeScript + Vite frontend**, a **Node.js Fastify BFF**, a stateful **Python FastAPI AI Microservice** powered by the **LangGraph workflow engine**, and a native **Fastify AI Gateway** with an optional **LiteLLM Proxy**.

---

## 🔗 Project Links

* **Live Demo (Frontend):** `https://careercraft-platform.vercel.app` *(Placeholder — to be set upon live Vercel deployment)*
* **API Gateway (Backend):** `https://careercraft-backend.onrender.com` *(Placeholder — to be set upon live Render deployment)*
* **GitHub Repository:** `https://github.com/NohaCode-lab/CareerCraft`
* **Deployment Architecture:** [Production Deployment Architecture](#-production-deployment)

---

## 🗺️ Master Documentation Navigation Map

### Root Governance Specifications
- 📋 [**AI Coding Agent Operating Manual (`AGENTS.md`)**](AGENTS.md) — Authoritative AI coding-agent governance, release gates, and boundaries.
- 🏛️ [**Master System Architecture (`ARCHITECTURE.md`)**](ARCHITECTURE.md) — High-level multi-service topology, data flows, and subsystem maps.
- 🚀 [**Developer Quickstart & Onboarding (`DEVELOPMENT.md`)**](DEVELOPMENT.md) — Local setup, environment variables, and Docker workflows.
- 🧪 [**Testing Strategy & Quality Governance (`TESTING.md`)**](TESTING.md) — Vitest/Pytest test inventory, 7-check release gate, and quality policy.
- 🛡️ [**Security Architecture & Threat Model (`SECURITY.md`)**](SECURITY.md) — Secret isolation, Zod/Pydantic validation, and threat mitigations.

### Subsystem Deep-Dive Specifications
- 🤖 [**Native AI Gateway Architecture**](docs/AI-GATEWAY.md) — Model aliasing, OpenRouter/Ollama adapters, circuit breaker, & fallbacks.
- 📡 [**BFF REST API Reference**](docs/API.md) — Fastify routes, Zod payload schemas, FastAPI proxies, & standard envelopes.
- 📦 [**Deployment & Containerization**](docs/DEPLOYMENT.md) — Multi-stage Dockerfiles, Docker Compose mesh, & GitHub Actions CI pipeline.
- 🌐 [**Internationalization (i18n) Engine**](docs/INTERNATIONALIZATION.md) — Multilingual dictionaries (`en`, `de`, `ar`), `dir="rtl"` control, & layout.
- 📜 [**Language Governance Policy**](docs/LANGUAGE-POLICY.md) — Translation key parity invariants (`keys(en) == keys(de) == keys(ar)`).
- 📊 [**Observability & Telemetry**](docs/OBSERVABILITY.md) — Pino JSON logging, correlation IDs (`x-request-id`), & OpenTelemetry trace spans.
- ⚡ [**Performance Engineering**](docs/PERFORMANCE.md) — Route code-splitting (`React.lazy`), Vite bundle chunks, & minification.
- 🎨 [**UI Design System & Theme Policy**](docs/UI-POLICY.md) — Color palette tokens, dark mode parity, Tailwind logical properties, & 20 AI rules.

### Architectural Decision Records (ADRs)
- [`ADR-002: Native Fastify AI Gateway Architecture`](docs/ADR-002_AI_GATEWAY_ARCHITECTURE.md)
- [`ADR-003: OmniRoute vs LiteLLM Responsibility Matrix`](docs/ADR-003_OMNIROUTE_VS_LITELLM_RESPONSIBILITY.md)
- [`ADR-004: Provider Routing Strategy & Fallback Order`](docs/ADR-004_PROVIDER_ROUTING_STRATEGY.md)
- [`ADR-005: LangGraph Usage Boundaries & Workflow Graphs`](docs/ADR-005_LANGGRAPH_USAGE_BOUNDARIES.md)
- [`ADR-006: Python AI Microservice Architecture`](docs/ADR-006_PYTHON_AI_SERVICE_ARCHITECTURE.md)
- [`ADR-007: Workflow State Management & Checkpointing`](docs/ADR-007_WORKFLOW_STATE_AND_CHECKPOINTING.md)

---

## 🏛️ Architectural Overview

CareerCraft provides an end-to-end career workflow including ATS resume optimization, skill gap analysis, personalized STAR answer coaching, mock interview practice, and quantitative AI benchmark evaluation.

```text
                                CAREERCRAFT ARCHITECTURE TOPOLOGY
                                                │
    ┌───────────────────────────────────────────┼───────────────────────────────────────────┐
    ▼                                           ▼                                           ▼
React 19 + TypeScript + Vite frontend     Node.js Fastify BFF                    Python FastAPI AI Microservice
(Port 5173 / 80)                          (Port 4000)                             (Port 8000)
 ├── Multilingual i18n (en, ar RTL, de)    ├── Backend-for-Frontend (BFF)          ├── LangGraph workflow engine
 ├── STAR Answer Coach & Mock Sessions     ├── Native Fastify AI Gateway           ├── Factuality Anti-Hallucination
 ├── Interview Readiness Score             ├── Zod Payload Validation              ├── LLM-as-a-Judge Evaluation Engine
 └── OpenTelemetry Distributed Tracing     └── Pino Structured JSON Logging        └── OpenTelemetry Span Generation
                                                │
                                                ▼
                                      LiteLLM AI Gateway Proxy (Optional)
                                      (Port 4001)
                                       ├── Model Aliasing (career-fast, career-reasoning, career-private)
                                       ├── Local-first privacy routing (qwen2.5:7b-instruct)
                                       └── Provider Routing (OpenRouter Cloud & Ollama Local)
```

---

## ⚙️ Technology Stack & Microservice Roles

### 1. React 19 + TypeScript + Vite Frontend (`src/`)
- **Role**: Modern, responsive presentation layer with full internationalization (English `en`, Arabic `ar` with `dir="rtl"`, and German `de` with `dir="ltr"`).
- **Features**: Interactive CV Builder, Job Application Pipeline, AI Assistant, and **AI Interview Preparation Module**.

### 2. Node.js Fastify BFF (`backend/`)
- **Role**: Secure API gateway facade for client requests housing the native `AIGatewayService`.
- **Security & Reliability**: Zod schema validation, Pino structured logging, Helmet security headers, CORS origin enforcement, sliding-window rate limiting, and request correlation IDs (`x-request-id`).

### 3. Python FastAPI AI Microservice (`ai-service/`)
- **Role**: Stateful multi-agent AI execution engine built with the **LangGraph workflow engine**.
- **Workflows**:
  - `resume_workflow_graph`: ATS scoring and bullet optimization.
  - `job_workflow_graph`: Role requirement extraction and skill gap analysis.
  - `career_workflow_graph`: Career path milestone generation.
  - `interview_workflow_graph`: Contextual question generation, STAR answer coaching, answer evaluation, and factuality validation.

### 4. Native AI Gateway & LiteLLM Integration
- **Role**: Native Fastify service (`backend/src/services/ai-gateway.service.ts`) managing model aliases, provider fallbacks, and circuit breakers.
- **Model Aliases**:
  - `career-fast`: Fast response tasks (OpenRouter cloud provider / `openai/gpt-4o-mini`).
  - `career-reasoning`: Complex analysis tasks (OpenRouter cloud provider / `anthropic/claude-3.5-sonnet`).
  - `career-private`: Local-first privacy routing for PII candidate data (Ollama local runtime / `qwen2.5:7b-instruct`).
- **Resilience**: Timeout boundary (30s), bounded retries (Max 1), and automated circuit breaker (`CLOSED` → `OPEN` → `HALF_OPEN`).

---

## 🛡️ Security Architecture Summary

CareerCraft enforces defense-in-depth across API boundaries:
- **Server-Side Secret Isolation**: Cloud provider API keys reside strictly in `backend/.env`. Zero client-side API key exposure.
- **Perimeter Defense**: `@fastify/helmet` security headers, `@fastify/cors` restricted origins (`http://localhost:5173`), and `@fastify/rate-limit` (100 req/min/IP).
- **Input Validation**: All BFF endpoints validate payloads against Zod schemas (`backend/src/schemas/`). FastAPI routes validate against Pydantic DTOs.
- **Service Authentication**: Internal requests between BFF and Python service are protected via `x-internal-service-token`.
- **Telemetry Sanitization**: PII, credentials, and raw prompt bodies are stripped from Pino logs and OpenTelemetry spans.

---

## 📊 Observability & Distributed Tracing

- **Pino Structured JSON Logging**: Logs `reqId`, `method`, `url`, `statusCode`, `responseTime`, and `providerUsed`.
- **Request Correlation ID**: `x-request-id` header injected by Fastify BFF and forwarded across internal services.
- **OpenTelemetry Trace Spans**: In-memory OpenTelemetry tracer (`backend/src/telemetry/tracer.ts`) recording performance attributes.

---

## 🧪 Quality Gate & Test Verification Results

CareerCraft is backed by **95 automated tests** across 25 test files passing 100%, with verified post-remediation i18n parity and zero language leakage:

| Test Suite / Quality Gate | Target Layer / Scope | Test Count / Metric | Status |
| :--- | :--- | :--- | :--- |
| **Frontend Component & Store Tests** | React 19 UI, Zustand stores, helpers | 45 Vitest specs | ✅ Passing (100%) |
| **Backend Integration Tests** | Fastify BFF, Zod validation, Gateway | 28 Vitest specs | ✅ Passing (100%) |
| **AI Microservice Workflow Tests** | LangGraph state graphs, evaluation | 22 Pytest specs | ✅ Passing (100%) |
| **i18n Dictionary Parity Check** | Translation key parity (`en`, `de`, `ar`) | 258 Keys | ✅ Strict Parity |
| **Theme & UI Compliance Audit** | Dark/Light mode color token parity | Automated Scan | ✅ 100% Compliant |
| **Architecture Boundary Check** | BFF boundary & secret leak protection | Static Analysis | ✅ Clean Gate |

---

## 🚀 Quickstart & Local Development

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/NohaCode-lab/CareerCraft.git
cd CareerCraft
npm install
cd backend && npm install && cd ..
```

### 2. Environment Configuration
```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp ai-service/.env.example ai-service/.env
```

### 3. Run Full-Stack Development Mesh
```bash
# Run Frontend + Fastify BFF + Python AI Service via Docker Compose
docker compose up --build
```

---

# 🚀 Production Deployment

## Architecture Overview

```text
                               CAREERCRAFT PRODUCTION TOPOLOGY
                                                │
    ┌───────────────────────────────────────────┼───────────────────────────────────────────┐
    ▼                                           ▼                                           ▼
[ Vercel Edge Global CDN ]              [ Render / Railway Web Service ]           [ Supabase / Managed Cloud ]
React 19 + Vite 6 Frontend              Node.js Fastify BFF (Port 4000)            PostgreSQL & Auth Storage
(https://careercraft-platform.vercel.app) (https://careercraft-backend.onrender.com) (https://supabase.com)
 ├── Vite SPA Bundle (dist/)             ├── Fastify API Gateway Facade             ├── Candidate Profiles & Auth
 ├── vercel.json SPA Rewrites            ├── Input Validation (Zod)                 ├── Resumes & ATS Scoring Logs
 ├── Multilingual i18n (en, de, ar)      ├── Server-Side Secret Protection          └── Saved Jobs & Sessions
 └── Deterministic Client Fallback       └── Python AI Service / Gateway
```

## Live Application

* **Frontend:** `https://careercraft-platform.vercel.app` *(Placeholder — to be updated upon live Vercel deploy)*
* **Backend API:** `https://careercraft-backend.onrender.com` *(Placeholder — to be updated upon live Render deploy)*
* **Database / BaaS:** [Supabase Managed PostgreSQL](https://supabase.com) *(Cloud-managed, credentials isolated)*

---

## 🛠️ Step-by-Step Deployment Instructions

### 1. Database & Cloud Storage — Supabase
1. Create a free project on [Supabase](https://supabase.com).
2. Copy the **Project URL** (`VITE_SUPABASE_URL`) and **anon public key** (`VITE_SUPABASE_ANON_KEY`) from **Project Settings → API**.
3. (Optional) Run SQL schema definitions for candidate profiles and interview sessions.

### 2. Backend BFF API — Render
1. In [Render](https://render.com), create a **New Web Service** and link this repository (or use the declarative [`render.yaml`](render.yaml) blueprint).
2. Configure service settings:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/health`
3. Add Environment Variables in the Render Dashboard:
   ```text
   NODE_ENV               = production
   PORT                   = 4000
   HOST                   = 0.0.0.0
   LOG_LEVEL              = info
   CORS_ORIGIN            = https://careercraft-platform.vercel.app
   INTERNAL_SERVICE_TOKEN = your_cryptographic_random_token_min_32_chars
   OPENROUTER_API_KEY     = your_openrouter_api_key_here
   AI_MOCK_MODE           = false
   ```

### 3. Frontend SPA — Vercel
1. In [Vercel](https://vercel.com), click **Add New Project** and import the `CareerCraft` repository.
2. Vercel automatically detects the **Vite** framework and output directory `dist`.
3. Add Environment Variables in Vercel Project Settings:
   ```text
   VITE_API_BASE_URL      = https://careercraft-backend.onrender.com/api/v1
   VITE_SUPABASE_URL      = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your-supabase-anon-key
   ```
4. Click **Deploy**. The root [`vercel.json`](vercel.json) handles single-page client routing (`/(.*) → /index.html`) to prevent 404 errors on direct navigation and refresh.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.