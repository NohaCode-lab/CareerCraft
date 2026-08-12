# 🚀 CareerCraft — AI Career & Interview Preparation Platform

> *Built for Senior / Staff Software Engineering Portfolios & Public Demonstrations.*

[![Enterprise CI Pipeline](https://img.shields.io/github/actions/workflow/status/NohaCode-lab/CareerCraft/ci.yml?branch=main&label=Enterprise%20CI%20Pipeline&logo=github)](https://github.com/NohaCode-lab/CareerCraft/actions)
[![License](https://img.shields.io/badge/License-MIT-007EC6.svg)](LICENSE)
[![Release](https://img.shields.io/badge/Release-v1.0.0--rc-6f42c1.svg)](https://github.com/NohaCode-lab/CareerCraft/releases)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-20B2AA.svg?logo=react&logoColor=white)](https://react.dev/)

CareerCraft is an enterprise-grade, production-ready **AI Career & Interview Preparation Platform** built with a modern multi-service microservice topology: a **React 19 + TypeScript + Vite frontend**, a **Node.js Fastify BFF**, a stateful **Python FastAPI AI Microservice** powered by the **LangGraph workflow engine**, and a native **Fastify AI Gateway** with an optional **LiteLLM Proxy**.

---

## 📚 Master Documentation Navigation Map

### Root Governance Specifications
- 🤖 [**AI Coding Agent Operating Manual (`AGENTS.md`)**](AGENTS.md) — Authoritative AI coding-agent governance, release gates, and boundaries.
- 🎯 [**Master System Architecture (`ARCHITECTURE.md`)**](ARCHITECTURE.md) — High-level multi-service topology, data flows, and subsystem maps.
- 💻 [**Developer Quickstart & Onboarding (`DEVELOPMENT.md`)**](DEVELOPMENT.md) — Local setup, environment variables, and Docker workflows.
- 🧪 [**Testing Strategy & Quality Governance (`TESTING.md`)**](TESTING.md) — Vitest/Pytest test inventory, 7-check release gate, and quality policy.
- 🔒 [**Security Architecture & Threat Model (`SECURITY.md`)**](SECURITY.md) — Secret isolation, Zod/Pydantic validation, and threat mitigations.

### Subsystem Deep-Dive Specifications
- 🤖 [**Native AI Gateway Architecture**](docs/AI-GATEWAY.md) — Model aliasing, OpenRouter/Ollama adapters, circuit breaker, & fallbacks.
- 🔌 [**BFF REST API Reference**](docs/API.md) — Fastify routes, Zod payload schemas, FastAPI proxies, & standard envelopes.
- 🚀 [**Deployment & Containerization**](docs/DEPLOYMENT.md) — Multi-stage Dockerfiles, Docker Compose mesh, & GitHub Actions CI pipeline.
- 🌐 [**Internationalization (i18n) Engine**](docs/INTERNATIONALIZATION.md) — Multilingual dictionaries (`en`, `de`, `ar`), `dir="rtl"` control, & layout.
- 📜 [**Language Governance Policy**](docs/LANGUAGE-POLICY.md) — Translation key parity invariants (`keys(en) == keys(de) == keys(ar)`).
- 📡 [**Observability & Telemetry**](docs/OBSERVABILITY.md) — Pino JSON logging, correlation IDs (`x-request-id`), & OpenTelemetry trace spans.
- ⚡ [**Performance Engineering**](docs/PERFORMANCE.md) — Route code-splitting (`React.lazy`), Vite bundle chunks, & minification.
- 🎨 [**UI Design System & Theme Policy**](docs/UI-POLICY.md) — Color palette tokens, dark mode parity, Tailwind logical properties, & 20 AI rules.

### Architectural Decision Records (ADRs)
- [`ADR-002: Native Fastify AI Gateway Architecture`](docs/ADR-002_AI_GATEWAY_ARCHITECTURE.md)
- [`ADR-003: OmniRoute vs LiteLLM Responsibility Matrix`](docs/ADR-003_OMNIROUTE_VS_LITELLM_RESPONSIBILITY.md)
- [`ADR-004: Provider Routing Strategy & Fallback Order`](docs/ADR-004_PROVIDER_ROUTING_STRATEGY.md)
- [`ADR-005: LangGraph Usage Boundaries & Workflow Graphs`](docs/ADR-005_LANGGRAPH_USAGE_BOUNDARIES.md)
- [`ADR-006: Python AI Microservice Architecture`](docs/ADR-006_PYTHON_AI_SERVICE_ARCHITECTURE.md)
- [`ADR-007: Workflow State Management & Checkpointing`](docs/ADR-007_WORKFLOW_STATE_AND_CHECKPOINTING.md)

> 📜 *Note on Audit Logs*: The `docs/audit/` directory contains immutable point-in-time historical audit reports preserving project milestone verification logs.

---

## 🎯 Architectural Overview

CareerCraft provides an end-to-end career workflow including ATS resume optimization, skill gap analysis, personalized STAR answer coaching, mock interview practice, and quantitative AI benchmark evaluation.

```text
                                CAREERCRAFT ARCHITECTURE TOPOLOGY
                                                │
    ┌───────────────────────────────────────────┼───────────────────────────────────────────┐
    ▼                                           ▼                                           ▼
React 19 + TypeScript + Vite frontend     Node.js Fastify BFF                    Python FastAPI AI Microservice
(Port 5173 / 80)                          (Port 4000)                             (Port 8000)
 ├── Multilingual i18n (en, ar RTL, de LTR) ├── Backend-for-Frontend (BFF)           ├── LangGraph workflow engine
 ├── STAR Answer Coach & Mock Sessions    ├── Native Fastify AI Gateway            ├── Factuality Anti-Hallucination
 ├── Interview Readiness Score            ├── Zod Payload Validation               ├── LLM-as-a-Judge Evaluation Engine
 └── OpenTelemetry Distributed Tracing    └── Pino Structured JSON Logging         └── OpenTelemetry Span Generation
                                                │
                                                ▼
                                      LiteLLM AI Gateway Proxy (Optional)
                                      (Port 4001)
                                       ├── Model Aliasing (career-fast, career-reasoning, career-private)
                                       ├── Local-first privacy routing (qwen2.5:7b-instruct)
                                       └── Provider Routing (OpenRouter Cloud & Ollama Local)
```

---

## 🛠️ Technology Stack & Microservice Roles

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
- **Resilience**: Timeout boundary (30s), bounded retries (Max 1), and automated circuit breaker (`CLOSED` $\rightarrow$ `OPEN` $\rightarrow$ `HALF_OPEN`).

---

## 🔒 Security Architecture Summary

CareerCraft enforces defense-in-depth across API boundaries:
- **Server-Side Secret Isolation**: Cloud provider API keys (`OPENROUTER_API_KEY`) reside strictly in `backend/.env`. Zero client-side API key exposure.
- **Perimeter Defense**: `@fastify/helmet` security headers, `@fastify/cors` restricted origins (`http://localhost:5173`), and `@fastify/rate-limit` (100 req/min/IP).
- **Input Validation**: All BFF endpoints validate payloads against Zod schemas (`backend/src/schemas/`). FastAPI routes validate against Pydantic DTOs.
- **Service Authentication**: Internal requests between BFF and Python service are protected via `x-internal-service-token`.
- **Telemetry Sanitization**: PII, credentials, and raw prompt bodies are stripped from Pino logs and OpenTelemetry spans.

> ℹ️ *Security Disclosure Policy*: A dedicated public security disclosure email has not yet been formally established. Vulnerabilities should be reported via GitHub Advisories. See [`SECURITY.md`](SECURITY.md) for full threat model and security policies.

---

## 📡 Observability & Distributed Tracing

- **Pino Structured JSON Logging**: Logs `reqId`, `method`, `url`, `statusCode`, `responseTime`, and `providerUsed`.
- **Request Correlation ID**: `x-request-id` header injected by Fastify BFF and forwarded across internal services.
- **OpenTelemetry Trace Spans**: In-memory OpenTelemetry tracer (`backend/src/telemetry/tracer.ts`) recording performance attributes.
- **Optional Infrastructure Note**: External telemetry collector containers (Prometheus, Grafana, Jaeger) represent optional target external infrastructure. See [`docs/OBSERVABILITY.md`](docs/OBSERVABILITY.md).

---

## 🧪 Quality Gate & Test Verification Results

CareerCraft is backed by **92 automated tests** across 22 test files passing 100%:

| Test Suite / Quality Gate | Target Layer / Scope | Test Count | Status |
| :--- | :--- | :---: | :---: |
| **Python Pytest Suite** | FastAPI AI Microservice & LangGraph | **13 Tests** | **PASS** |
| **Vitest Integration & Unit Suite** | React Frontend & Fastify BFF Services | **79 Tests** | **PASS** |
| **TOTAL AUTOMATED PLATFORM TESTS** | End-to-End System | **92 Tests** | **PASS (92/92)** |
| **TypeScript Compilation (`tsc`)** | Static Type Checking | 0 Errors | **PASS** |
| **ESLint Static Analysis (`lint`)** | Code Syntax & Zero `any` Rules | 0 Errors | **PASS** |
| **i18n Parity Audit (`i18n:check`)** | EN / DE / AR Key Set Equality | 245 Keys Parity | **PASS** |
| **UI Theme Compliance Audit (`ui:audit`)**| Tokens & Dark Class Enforcement | 0 Violations | **PASS** |
| **Architecture Audit (`arch:audit`)** | 0 `.js` files in `src/` & Constants SOT | 0 Violations | **PASS** |
| **Vite Production Build (`build`)** | Static Asset Compilation | 2,314 Modules | **PASS** |

See [`TESTING.md`](TESTING.md) for full test taxonomy and quality gate policies.

---

## 🏃 Local Development Quickstart

### Prerequisites
- Node.js `v20.x` or `v24.x` LTS
- Python `3.11.x`
- Docker Desktop (Optional for container mesh)

### 1. Install & Run Fastify BFF Backend
```bash
cd backend
npm install
npm run dev
# Server running at http://localhost:4000
```

### 2. Install & Run Python AI Microservice
```bash
cd ai-service
python -m venv .venv
.\.venv\Scripts\activate  # Windows
# source .venv/bin/activate # macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
# Service running at http://localhost:8000
```

### 3. Run React 19 + TypeScript + Vite Frontend
```bash
npm install
npm run dev
# Frontend running at http://localhost:5173
```

### 4. Execute Full Release Gate Validation
```bash
npm run validate
# Executes all 7 release gate checks in sequence
```

For complete environment variable reference and container workflows, see [`DEVELOPMENT.md`](DEVELOPMENT.md).

---

## ⚠️ Known Limitations

1. **Browser E2E Automation**: End-to-End browser testing via Playwright/Cypress is not currently implemented (planned for post-v1.0).
2. **Code Coverage Enforcements**: Automated Vitest code coverage percentage thresholds are not currently configured as a failing gate step.
3. **External Observability Dashboards**: External OpenTelemetry Collector, Prometheus, and Grafana containers are not currently present in `docker-compose.yml`.
4. **Cloud Relational Migrations**: Database operations use in-memory and client persistence layers; production PostgreSQL migrations are managed via cloud connection strings.

---

## 📄 License

CareerCraft is released under the [MIT License](LICENSE).