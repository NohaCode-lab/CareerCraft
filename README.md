# 🚀 CareerCraft — AI Career & Interview Preparation Platform

> *Built for Senior / Staff Software Engineering Portfolios & Public Demonstrations.*

[![Enterprise CI Pipeline](https://img.shields.io/github/actions/workflow/status/NohaCode-lab/CareerCraft/ci.yml?branch=main&label=Enterprise%20CI%20Pipeline&logo=github)](https://github.com/NohaCode-lab/CareerCraft/actions)
[![License](https://img.shields.io/badge/License-MIT-007EC6.svg)](LICENSE)
[![Release](https://img.shields.io/github/v/tag/NohaCode-lab/CareerCraft?color=6f42c1&label=Release)](https://github.com/NohaCode-lab/CareerCraft/releases)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-20B2AA.svg?logo=react&logoColor=white)](https://react.dev/)

CareerCraft is an enterprise-grade, production-ready **AI Career & Interview Preparation Platform** built with a modern multi-service microservice topology: a **React 19 + TypeScript + Vite frontend**, a **Node.js Fastify BFF**, a stateful **Python FastAPI AI Microservice** powered by the **LangGraph workflow engine**, and a unified **LiteLLM AI Gateway**.

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
 ├── STAR Answer Coach & Mock Sessions    ├── Zod Payload Validation               ├── Factuality Anti-Hallucination
 ├── Interview Readiness Score            ├── Request correlation ID (x-request-id)├── LLM-as-a-Judge Evaluation Engine
 └── OpenTelemetry Distributed Tracing    └── Persistent Repository Data Layer     └── OpenTelemetry Span Generation
                                                │
                                                ▼
                                      LiteLLM AI Gateway Proxy
                                      (Port 4001)
                                       ├── Model Aliasing (career-fast, career-reasoning, career-private)
                                       ├── Local-first privacy routing (qwen2.5:7b-instruct)
                                       └── Provider Routing (OpenRouter Cloud & Ollama Local)
```

---

## 🛠️ Technology Stack & Microservice Roles

### 1. React 19 + TypeScript + Vite frontend
- **Role**: Modern, responsive presentation layer with full internationalization (English `en`, Arabic `ar` with `dir="rtl"`, and German `de` with `dir="ltr"`).
- **Features**: Interactive CV Builder, Job Application Pipeline, AI Assistant, and **AI Interview Preparation Module**.

### 2. Node.js Fastify BFF (Backend-for-Frontend)
- **Role**: Secure API gateway facade for client requests.
- **Security & Reliability**: Zod schema validation, Pino structured logging, Helmet security headers, CORS origin enforcement, sliding-window rate limiting, and request correlation IDs (`x-request-id`).

### 3. Python FastAPI AI Microservice
- **Role**: Stateful multi-agent AI execution engine built with the **LangGraph workflow engine**.
- **Workflows**:
  - `resume_workflow_graph`: ATS scoring and bullet optimization.
  - `job_workflow_graph`: Role requirement extraction and skill gap analysis.
  - `career_workflow_graph`: Career path milestone generation.
  - `interview_workflow_graph`: Contextual question generation, STAR answer coaching, answer evaluation, and factuality validation.

### 4. LiteLLM AI Gateway
- **Role**: Canonical AI gateway proxy managing model aliases and provider routing.
- **Model Aliases**:
  - `career-fast`: Fast response tasks (OpenRouter cloud provider).
  - `career-reasoning`: Complex analysis tasks (OpenRouter cloud provider).
  - `career-private`: Local-first privacy routing for PII candidate data (Ollama local runtime).
- **OmniRoute Integration**: OmniRoute routing concepts/policies were incorporated into the CareerCraft routing strategy and implemented through the LiteLLM configuration and application-level routing logic.

---

## 🎯 AI Interview Preparation Module

The platform includes a complete **AI Interview Preparation Module** featuring 5 canonical tools:

1. **AI Interview Question Generator**: Contextual question generation across 5 categories (**Behavioral**, **Technical**, **Situational**, **HR**, and **Company-Specific**).
2. **STAR Answer Coach**: Generates candidate-tailored STAR responses (`Situation`, `Task`, `Action`, `Result`) with a **Factuality Anti-Hallucination Guardrail** enforcing strict adherence to real resume experience.
3. **AI Answer Evaluator**: Evaluates practice answers returning numerical coaching metrics (`overallScore`, `relevance`, `clarity`, `structure`, `technicalAccuracy`, `jobAlignment`) and actionable feedback.
4. **AI Mock Interview Session**: Live Q&A practice state machine tracking real-time user answers.
5. **Interview Readiness Score**: Calculated overall readiness metric (`78%`), category breakdown, and practice recommendations.

---

## 📊 AI Evaluation & Golden Benchmark Suite

To quantitatively verify AI output reliability and safety, CareerCraft includes an automated **AI Evaluation & Golden Benchmark Suite**:

- **Golden Dataset**: 50 reference test cases (`golden_dataset.json`) containing candidate resume and ground-truth requirements.
- **LLM-as-a-Judge Engine**: Automated scoring engine evaluating:
  - **Factuality Score**: 100% (Zero hallucinated candidate experience allowed).
  - **ATS Alignment Score**: >=85% (Precision matching of extracted skills).
  - **STAR Completeness Score**: >=85% (Structure validation).
  - **Coaching Quality Score**: >=85% (Feedback actionability).
- **Controlled Benchmark Validation**: Pre-commit CI benchmark verification ensuring zero quality regressions.

---

## 📡 Observability & Distributed Tracing

- **OpenTelemetry Distributed Tracing**: Measures end-to-end request latency across `React 19 + TypeScript + Vite frontend` $\rightarrow$ `Node.js Fastify BFF` $\rightarrow$ `Python FastAPI AI Microservice` $\rightarrow$ `LiteLLM AI Gateway`.
- **W3C Trace Context / `traceparent`**: Standardized `traceparent` (`00-<trace_id>-<span_id>-01`) header propagation.
- **Request Correlation ID**: `x-request-id` header generated per request for Pino structured log correlation.
- **Planned / Target Observability Architecture**: Production export to an OpenTelemetry Collector, Prometheus, Grafana, and Jaeger/Tempo telemetry visualization dashboards.

---

## 💾 Relational Data Layer & Interview Session Persistence

- **Persistence Layer**: Relational data models (`DbUser`, `DbResume`, `DbJob`, `DbInterviewSession`, `DbInterviewQuestion`, `DbInterviewAnswer`, `DbInterviewEvaluation`).
- **Repository Pattern**: `InterviewRepository` abstraction supporting session saving, retrieval by ID, and user history queries.
- **Cross-Session Storage**: Allows candidates to save mock interview sessions, review past coaching reports, and track readiness improvement across logins.
- **Planned / Target Persistence Architecture**: Production PostgreSQL / Supabase cloud database instance and Redis task cache cluster.

---

## 🐳 Docker Compose & GitHub Actions CI/CD

- **Docker Compose**: Single-command local container orchestration (`docker-compose up --build`) deploying:
  - `frontend`: React Vite static Nginx web server.
  - `backend`: Node 24 LTS Fastify BFF container.
  - `ai-service`: Python 3.11 FastAPI + LangGraph container.
  - `litellm-gateway`: LiteLLM Proxy container.
- **GitHub Actions CI/CD**: Automated quality gate pipeline (`.github/workflows/ci.yml`) running all 58 automated tests, static analysis, type checking, and production builds on every push.

---

## 🧪 Quality Gate & Test Verification Results

| Test Suite / Quality Gate | Target Layer | Test Count | Status |
|---|---|---|---|
| **Python Pytest Suite** | Python FastAPI AI Microservice | **13 Tests** | **PASS** |
| **Vitest Integration & Unit Suite** | React Frontend & Fastify BFF | **45 Tests** | **PASS** |
| **GRAND TOTAL PLATFORM TESTS** | End-to-End System | **58 Tests** | **PASS (58/58)** |
| **ESLint Static Analysis** | Codebase Syntax & Rules | 0 Errors | **PASS** |
| **Fastify TypeScript Build (`tsc`)**| Fastify BFF Output | 0 Errors | **PASS** |
| **Vite Production Build (`build`)** | Frontend Bundle | 2,570 Modules | **PASS** |
| **Secret Security Audit** | Git Tracking & Logs | 0 Secrets | **PASS (`NOT FOUND`)** |

---

## 🏃 Local Development Quickstart

### Prerequisites
- Node.js `v24.x`
- Python `3.11.x`
- Docker & Docker Compose (Optional for container deployment)

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
.\.venv\Scripts\activate  # On Windows
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000
# Service running at http://localhost:8000
```

### 3. Run React 19 + TypeScript + Vite Frontend
```bash
npm install
npm run dev
# Frontend running at http://localhost:5173
```

### 4. Run Full Docker Container Topology
```bash
docker-compose up --build
```