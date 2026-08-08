# Phase 1 — Architecture Audit & Component Inventory

## 1. Executive Summary

This document establishes the **Phase 1 Architecture Audit** for CareerCraft.

CareerCraft is an enterprise-grade AI Career & Interview Preparation Platform built with a multi-service microservice topology:
- **React 19 + TypeScript + Vite frontend**
- **Node.js Fastify BFF** (Backend-for-Frontend)
- **Python FastAPI AI Microservice** powered by the **LangGraph workflow engine**
- **LiteLLM AI Gateway**

The goal of Phase 1 was to audit the repository, document entry points, and define a safe, non-destructive migration sequence from initial prototype files to a robust TypeScript architecture.

---

## 2. Active Application Entry Point Analysis

### HTML Entry Point (`index.html`)
- **File**: `index.html`
- **Active Script Tag**: `<script type="module" src="/src/main.tsx"></script>`
- **Status**: The active entry point executed by Vite is **`/src/main.tsx`**.

### Active App Entry (`src/main.tsx` & `src/App.tsx`)
- `src/main.tsx` mounts `<React.StrictMode>`, `<BrowserRouter>`, and `<AppProviders>`.
- `src/App.tsx` is the active routing root using `react-router-dom` (v7) with lazy-loaded page modules:
  - `/` -> `Dashboard.jsx`
  - `/cv-builder` -> `CVBuilderPage.jsx`
  - `/jobs` -> `JobSearchPage.jsx`
  - `/saved-jobs` -> `SavedJobsPage.jsx`
  - `/applications` -> `ApplicationsPage.jsx`
  - `/interview-prep` -> `InterviewPrepPage.tsx`
  - `/ai-assistant` -> `AIAssistantPage.jsx`
  - `/settings` -> `SettingsPage.jsx`

---

## 3. Architecture Topology & Canonical Terminology

| Component | Architecture Role | Tech Stack | Status |
| :--- | :--- | :--- | :--- |
| **Frontend** | Presentation Layer | **React 19 + TypeScript + Vite frontend** | Implemented & Verified |
| **Backend** | Backend-for-Frontend (BFF) | **Node.js Fastify BFF** | Implemented & Verified |
| **AI Service** | Multi-Agent Execution | **Python FastAPI AI Microservice** | Implemented & Verified |
| **Workflow Engine** | Stateful AI Workflows | **LangGraph workflow engine** | Implemented & Verified |
| **AI Gateway** | Provider Proxy & Aliases | **LiteLLM AI Gateway** | Implemented & Verified |
| **Cloud Provider** | Cloud LLM Routing | **OpenRouter — cloud model provider/router** | Implemented & Verified |
| **Local Runtime** | Local LLM Privacy Execution | **Ollama — local model runtime** (`qwen2.5:7b-instruct — local model`) | Implemented & Verified |

---

## 4. OmniRoute Gateway Integration Strategy

OmniRoute routing concepts/policies were incorporated into the CareerCraft routing strategy and implemented through the LiteLLM configuration and application-level routing logic. LiteLLM is the canonical AI gateway binary in the production topology (`Application → LiteLLM → Provider`).

---

## 5. Verification Commands

Run the following validation commands to verify application integrity:

```bash
# 1. Typecheck TypeScript files & ESLint static analysis
npm run lint

# 2. Run Vitest & Pytest Automated Tests
npm run test
cd ai-service && pytest

# 3. Production Build Verification
npm run build
```
