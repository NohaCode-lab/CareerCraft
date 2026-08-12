# 🔒 CareerCraft Security Architecture & Governance Policy

> **Authoritative Specification**: This document is the **Single Source of Truth for security architecture, threat modeling, secret isolation, input validation, and security governance** within CareerCraft.

---

## 1. Purpose

`SECURITY.md` defines the security model, trust boundaries, threat mitigations, and secret management policy for human software engineers, security architects, DevSecOps specialists, and AI coding assistants operating on CareerCraft.

---

## 2. Security Scope

This specification covers:
- Secret management and API key isolation across server processes and client SPAs.
- Perimeter defense (CORS, security headers, rate limiting).
- Input validation boundaries (Zod schemas, Pydantic DTOs).
- Service-to-service authentication (`x-internal-service-token`).
- Telemetry PII masking and structured log sanitization.
- Threat modeling across 14 distinct attack vectors.
- Vulnerability reporting procedures.

---

## 3. Security Architecture Overview

CareerCraft implements defense-in-depth across 3 security tiers:

```text
[ Browser Zone (Untrusted) ]
           │
           ▼  (HTTPS / REST APIs + CORS + Rate Limiting + Helmet Headers)
[ Fastify BFF Facade (Perimeter Defense Zone) ]
  ├── Zod Payload Schema Validation
  ├── Server-Side Secret Isolation (OPENROUTER_API_KEY)
  ├── Pino JSON Log Masking
  └── Internal Token Injection (x-internal-service-token)
           │
           ▼  (Internal Network / HTTP Service Mesh)
[ Python FastAPI AI Microservice (Execution Zone) ]
  ├── Pydantic DTO Schema Validation
  └── LangGraph Workflow Isolation
```

---

## 4. Trust Boundaries

- **Browser Zone (Untrusted)**: Client-side SPA running in user web browsers. Has ZERO access to backend database connections or AI provider API keys.
- **Fastify BFF Facade (Perimeter Zone)**: Public-facing gateway facade. Validates all client input, enforces rate limits, terminates public CORS connections, and injects correlation IDs.
- **Internal Service Mesh Zone (Trusted)**: Private network connecting Fastify BFF to Python FastAPI AI microservice. Authenticated via `x-internal-service-token`.
- **External AI Provider Zone (Third-Party)**: External cloud APIs (OpenRouter) or local daemons (Ollama). Communicates via server-side HTTPS/REST requests.

---

## 5. Authentication

- **Current Implementation**: Stateless candidate sessions. User choices and application preferences reside in client-side `localStorage`.
- **Planned / Post-v1.0**: Database-backed candidate authentication via JWT / Supabase Auth (`@supabase/supabase-js`).
- **Invariant**: Client browsers MUST NOT authenticate directly with third-party LLM APIs.

---

## 6. Authorization

- **Backend Enforcement**: Authorization decisions MUST be evaluated on the Fastify BFF or database layer, never solely in client-side React UI state.
- **Role-Based Access Control (RBAC)**: Currently candidate-centric. Planned for multi-role employer/candidate portals in future releases.

---

## 7. Service-to-Service Security

- **Internal Token Protection**: Communication between Fastify BFF (`backend/src/routes/ai-workflow.routes.ts`) and Python FastAPI (`ai-service/app/main.py`) requires an internal authorization header:
  ```http
  x-internal-service-token: dev-secret-token
  ```
- **Enforcement**: Fastify BFF injects the token on proxy requests; FastAPI validates the token before executing LangGraph workflows. Requests lacking valid tokens return `HTTP 401 Unauthorized`.

---

## 8. Secret Management & Isolation Policy

1. **Zero Secret Exposure in Client Bundles**: API keys (`OPENROUTER_API_KEY`) MUST reside strictly inside `backend/.env` and process environment memory. Never expose secrets in Vite `VITE_*` variables.
2. **Git Exclusion**: `.env`, `.env.local`, `.env.production`, and credential files MUST remain explicitly listed in `.gitignore`.
3. **No Hardcoded Credentials**: Never write production credentials, tokens, or private keys directly into source code files.
4. **Immediate Rotation**: Any credential accidentally committed to git history MUST be immediately revoked and rotated.

---

## 9. Input Validation Boundaries

- **Fastify BFF Boundary**: All incoming HTTP request bodies, query strings, and parameters are validated against Zod schemas (`backend/src/schemas/ai.schema.ts`, `jobs.schema.ts`, `profile.schema.ts`). Invalid payloads fail with `HTTP 400 Bad Request`.
- **Python FastAPI Boundary**: Incoming workflow inputs are validated against Pydantic DTOs (`ResumeOptimizeDto`, `JobAnalyzeDto`, `InterviewQuestionsDto`).

---

## 10. API Security

- **Security Headers (`@fastify/helmet`)**: Enforces Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and Referrer-Policy.
- **CORS Policy (`@fastify/cors`)**: Restricts allowed origins strictly to configured frontend hosts (`http://localhost:5173`).
- **Rate Limiting (`@fastify/rate-limit`)**: Sliding-window rate limit enforcing a maximum of **100 requests per minute per IP address**.

---

## 11. AI Security & Prompt Injection Mitigation

1. **System Prompt Isolation**: Candidate resume bullets and job description texts are injected strictly into `user` role fields within `AIRequestContract`. System instructions remain immutable.
2. **Untrusted AI Output Handling**: Output from cloud LLMs is validated and sanitized before rendering in the React UI to prevent Cross-Site Scripting (XSS).
3. **Factuality Anti-Hallucination Gate**: Python LangGraph workflows run automated factuality checks to verify candidate STAR claims against uploaded CV experience.

---

## 12. PII & Candidate Data Privacy Policy

1. **Client Storage Privacy**: Candidate resumes, saved jobs, and interview responses are stored locally in the user's browser `localStorage`.
2. **Telemetry Sanitization**: PII (names, emails, phone numbers, raw resume text) is stripped from OpenTelemetry span attributes and Pino structured logs (`backend/src/telemetry/tracer.ts`).

---

## 13. Logging & Observability Security

- **Pino Structured Logs**: High-performance JSON logger outputs request metadata (`reqId`, `url`, `statusCode`, `responseTime`).
- **Forbidden Log Data**: Passwords, authorization tokens (`Bearer ...`), API keys, and raw resume texts MUST NEVER be output to `stdout`/`stderr` log files.

---

## 14. Error Handling & Information Exposure

- **Standard Error Envelopes**: Fastify BFF maps custom errors into standardized HTTP payloads (`statusCode`, `error`, `message`, `requestId`).
- **Production Masking**: Internal server stack traces and database connection strings are omitted from production API error responses (`HTTP 500`).

---

## 15. Rate Limiting Policy

- **Engine**: `@fastify/rate-limit`.
- **Threshold**: Sliding window enforcing a max of **100 requests per minute per IP**.
- **Exceeding Limits**: Exceeding rate limits returns `HTTP 429 Too Many Requests` and immediately triggers gateway fallback adapters without burning cloud API retries.

---

## 16. CORS & Security Headers

```typescript
// Fastify Security Header Configuration (backend/src/app/app.ts)
await app.register(fastifyHelmet, { contentSecurityPolicy: true });
await app.register(fastifyCors, { origin: config.CORS_ORIGIN });
```

---

## 17. Dependency Security & Governance

- **Audit Checks**: Run `npm audit` and `pip audit` periodically to scan dependencies for known vulnerabilities.
- **Lockfile Integrity**: All dependency updates MUST commit updated `package-lock.json` files to guarantee reproducible builds.

---

## 18. Container & Deployment Security

- **Non-Root Execution**: Dockerfiles run web servers under unprivileged system users (`nginx` / `node`).
- **Minimal Base Images**: Containers use minimal Alpine Linux (`node:20-alpine`, `node:24-alpine`) and Python slim images (`python:3.11-slim`) to minimize attack surface.

---

## 19. CI/CD Security & GitHub Actions Secrets

- **Secret Storage**: Cloud API keys and production tokens reside in GitHub Repository Secrets.
- **Zero Secrets in Repository Code**: `.github/workflows/ci.yml` accesses secrets strictly via `${{ secrets.OPENROUTER_API_KEY }}`.

---

## 20. CareerCraft Threat Model

| # | Threat Vector | Attack Surface | Existing Mitigation | Residual Risk | Recommended Action |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **1** | Stolen Provider API Key | Cloud LLM APIs | Server-side key isolation in `backend/.env` | Key leak via host access | Restrict API key permissions on OpenRouter. |
| **2** | Unauthenticated Workflow Proxy | FastAPI `/workflows/*` | Token check (`x-internal-service-token`) | Hardcoded default token | Generate unique token per deployment. |
| **3** | Client Payload Tampering | Fastify REST endpoints | Zod payload schema validation | Schema evasion | Maintain strict Zod payload definitions. |
| **4** | DoS / API Exhaustion | Public HTTP endpoints | `@fastify/rate-limit` (100 req/min) | Distributed botnet IPs | Implement Cloudflare / WAF IP filtering. |
| **5** | XSS via AI Output | React SPA rendering | React automatic JSX escaping | Rich text rendering | Sanitize AI outputs before DOM insertion. |
| **6** | Prompt Injection Attack | Candidate CV input | Injected into `user` field, system prompt fixed | Clever jailbreak prompts | Run AI output validation guardrails. |
| **7** | Credential Leak in Logs | Pino log output | Headers & body stripped from Pino | Debug level logging | Audit Pino log serializers. |
| **8** | PII Leak in Telemetry | OpenTelemetry spans | Sanitized in `tracer.ts` | Custom span attributes | Enforce telemetry masking checks. |
| **9** | Unauthorized CORS Request | Cross-origin fetch | `@fastify/cors` origin restrictions | Misconfigured origin | Keep `CORS_ORIGIN` strictly bounded. |
| **10** | Compromised Dependency | `node_modules` / `pip` | Package lockfiles & GitHub Dependabot | Zero-day supply chain | Run automated `npm audit` in CI. |
| **11** | Clickjacking Attack | Client iframe | `@fastify/helmet` (`X-Frame-Options: DENY`) | None | Maintain Helmet security headers. |
| **12** | Local Storage Tampering | Candidate Browser | Client validation of parsed JSON | Storage corruption | Parse local storage payloads safely. |
| **13** | Provider Outage / 5xx | Upstream Cloud LLMs | Circuit breaker & Mock fallback | Model degradation | Maintain fallback provider adapters. |
| **14** | MitM Communication | Network transport | HTTPS SSL/TLS encryption | HTTP staging links | Enforce HTTPS redirect on edge proxy. |

---

## 21. Security Testing Strategy & Failure Scenarios

- **Automated Zod Tests**: `backend/tests/integration/ai.test.ts` tests invalid request payload rejection (HTTP 400).
- **Automated Service Token Tests**: `backend/tests/integration/workflow.test.ts` tests missing token rejection (HTTP 401).
- **Automated Storage Parsing Tests**: `src/services/__tests__/storageService.test.ts` tests graceful handling of corrupt dynamic dynamic storage JSON payloads without runtime crashes.

---

## 22. Security Incident Response Protocol

In the event of a suspected security incident or secret disclosure:
1. **Identify & Contain**: Identify compromised key, server process, or token.
2. **Revoke & Rotate**: Immediately revoke the compromised API key on OpenRouter / cloud provider and generate a fresh key.
3. **Redact & Cleanse**: Remove committed secrets from git history if applicable using `git filter-repo` or BFG Repo-Cleaner.
4. **Deploy Patch**: Update environment variables on deployment hosts and restart services.
5. **Post-Mortem**: Document root cause and implement preventative CI lint rules.

---

## 23. Vulnerability Reporting Policy

> ℹ️ **Security Contact Policy**: CareerCraft currently lacks a dedicated public security disclosure email address. Security researchers discovering vulnerabilities should report findings directly to the repository maintainers via GitHub Security Advisories.
>
> A dedicated `security@careercraft.app` reporting address will be established prior to public commercial v1.0 release.

---

## 24. Security Findings & Remediation Register

| Severity | Finding / Security Item | Evidence | Remediation Status |
| :---: | :--- | :--- | :---: |
| **RESOLVED** | Config Schema Integration for Service Token | `INTERNAL_SERVICE_TOKEN` added to Zod schema in `backend/src/app/config.ts` | **FIXED** — Validated in config & consumed dynamically in `AIWorkflowService` |
| **RESOLVED** | Dependency Vulnerability Audit in CI | Added `npm audit --audit-level=high` step to `.github/workflows/ci.yml` | **FIXED** — Enforced on every push/PR |
| **LOW** | Missing Public Security Contact | `SECURITY.md` lacks explicit security email | **DEFERRED** — Establish official contact address prior to commercial release |

---

## 25. Security Source-of-Truth Matrix

| Security Domain | Authoritative Specification | Code / Config Authority |
| :--- | :--- | :--- |
| **Security Architecture & Governance**| [`SECURITY.md`](SECURITY.md) | `backend/src/app/app.ts` |
| **AI Agent Security Boundaries** | [`AGENTS.md`](AGENTS.md) | `scripts/audit-architecture.js` |
| **API Perimeter & Schemas** | [`docs/API.md`](docs/API.md) | `backend/src/routes/`, `backend/src/schemas/` |
| **AI Gateway Key Isolation** | [`docs/AI-GATEWAY.md`](docs/AI-GATEWAY.md) | `backend/src/services/ai-gateway.service.ts` |
| **Deployment & Container Security** | [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | `docker-compose.yml`, `Dockerfile` |
| **Observability & Log Privacy** | [`docs/OBSERVABILITY.md`](docs/OBSERVABILITY.md) | `backend/src/telemetry/tracer.ts` |

---

## 26. Subsystem Documentation Delegation

- **API Security & Routes**: Delegate to [`docs/API.md`](docs/API.md).
- **AI Gateway & Provider Security**: Delegate to [`docs/AI-GATEWAY.md`](docs/AI-GATEWAY.md).
- **Container & Deployment Security**: Delegate to [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).
- **Logging & Telemetry Privacy**: Delegate to [`docs/OBSERVABILITY.md`](docs/OBSERVABILITY.md).

---

## 27. Maintenance & Audit Rules

- `SECURITY.md` MUST be audited and updated whenever new microservices, authentication mechanisms, or third-party AI provider adapters are added to CareerCraft.
- AI coding agents MUST consult `SECURITY.md` before making API routing, secret handling, or middleware changes.
