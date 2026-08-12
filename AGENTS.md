# 🤖 CareerCraft AI Coding Agent Operating Manual & Governance Contract

> **Authoritative Specification**: This document is the **Single Source of Truth for AI coding agent behavior, operating directives, workflow rules, and repository boundaries** within the CareerCraft repository.
>
> All AI coding assistants (including Antigravity, Gemini Code Assistant, GitHub Copilot, Claude, and autonomous subagents) and human contributors MUST strictly comply with every directive in this specification.

---

## 1. Purpose

`AGENTS.md` is the central **General AI Operating Manual** for CareerCraft. It exists to establish unified, deterministic operating procedures, repository boundaries, and quality gate requirements for AI coding agents.

### Governance Scope
- **AGENTS.md** defines *how* AI agents operate, what they must inspect, what they are forbidden from doing, how changes are validated, and how documentation hierarchy is respected.
- Specialized domain policies (e.g. `docs/UI-POLICY.md`, `docs/LANGUAGE-POLICY.md`) remain the authoritative owners for domain-specific implementation rules. `AGENTS.md` delegates to these specialized policies rather than duplicating their complete text.

---

## 2. Repository Context

CareerCraft is a modern, enterprise-grade **AI Career & Interview Preparation Platform** built with a multi-service microservice topology:

- **React 19 Frontend (`src/`)**: Modern TypeScript SPA powered by Vite 6, Tailwind CSS v4, and i18n support (`en`, `de` LTR, `ar` RTL).
- **Node.js Fastify BFF (`backend/`)**: TypeScript Backend-for-Frontend managing API routes, Zod validation, Pino structured logging, Helmet headers, rate limits, and the native `AIGatewayService`.
- **Python FastAPI AI Microservice (`ai-service/`)**: Python 3.11 execution engine running stateful **LangGraph workflow graphs** (`resume`, `job`, `career`, `interview`).
- **AI Gateway Layer**: Native Fastify service (`backend/src/services/ai-gateway.service.ts`) orchestrating model aliases (`career-fast`, `career-reasoning`, `career-private`), cloud OpenRouter adapters, local Ollama runtimes, and mock test providers.

---

## 3. AI Operating Principles

AI coding agents operating on CareerCraft MUST adhere to the following core principles:

1. **Inspect Before Modifying**: Thoroughly read relevant source files, types, configurations, and tests before writing code.
2. **Understand Before Implementing**: Trace data flows and API contracts across boundaries. Never guess parameter structures or return shapes.
3. **Prefer Existing Abstractions**: Reuse shared components, helper utilities, and constants. Do NOT write duplicate helper functions or ad-hoc components.
4. **Zero Symptom Patching**: Address root causes. NEVER swallow exceptions, return empty dummy fallbacks, comment out broken tests, or use `@ts-ignore` to suppress errors.
5. **Preserve Contracts & Compatibility**: Do NOT alter function signatures or API contracts without updating all call sites across the codebase.
6. **Scoped Changes**: Keep code modifications strictly scoped to the user's explicit objective. Do NOT make unrequested refactorings or alter unrelated files.
7. **Empirical Verification**: Never claim a task is complete without running full validation commands (`npm run validate`).

---

## 4. Repository Boundaries

AI agents MUST respect service, language, and module boundaries:

- **Frontend / Backend Boundary**: Client SPA (`src/`) MUST NOT invoke database APIs or external AI provider keys directly. All AI and backend operations MUST flow through Fastify BFF endpoints (`/api/v1/*`).
- **TypeScript / Python Boundary**: Node.js Fastify BFF communicates with the Python FastAPI AI service via HTTP JSON calls using the `x-internal-service-token` header.
- **Constant SOT Boundary**: All shared storage keys, route titles, language codes, and status enums MUST reside in `src/utils/constants.ts`. Never define local duplicate storage keys.
- **Strict File Extensions**: All files in `src/` MUST use `.ts` or `.tsx` extensions. Plain `.js` or `.jsx` files are forbidden in `src/`.

---

## 5. Source-of-Truth Rules

When resolving requirements or technical specifications, AI agents MUST follow the authoritative Source-of-Truth hierarchy:

1. **Executable Code & Configuration**: The current codebase, `package.json`, `tsconfig.json`, `eslint.config.js`, and build scripts represent authoritative implementation truth.
2. **Accepted ADRs (`docs/ADR-*.md`)**: Architectural Decision Records represent accepted architectural decisions.
3. **Domain-Specific Policies (`docs/*-POLICY.md`)**: Domain policies (`UI-POLICY.md`, `LANGUAGE-POLICY.md`) represent domain governance truth.
4. **`AGENTS.md`**: Authoritative for AI coding-agent operating behavior, boundaries, and validation workflow.
5. **`README.md`**: Primary human-facing project overview and quickstart entrypoint.
6. **Historical Audit Documents (`docs/audit/*`)**: Immutable historical evidence. Must NOT be treated as live operational specifications.

> ⚠️ **Mandatory Rule on Documentation Drift**: If documentation conflicts with active code or configuration, the AI agent MUST NOT silently follow the documentation. Inspect the implementation to verify active behavior, and report documentation drift.

---

## 6. Documentation Governance

CareerCraft maintains a strict documentation hierarchy. AI agents MUST respect file ownership:

- `README.md` $\rightarrow$ Primary human-facing entrypoint and system quickstart.
- `docs/API.md` $\rightarrow$ Authoritative BFF REST API endpoints, schemas, and proxy specifications.
- `docs/AI-GATEWAY.md` $\rightarrow$ Authoritative AI Gateway service, provider adapters, and resilience specs.
- `docs/DEPLOYMENT.md` $\rightarrow$ Authoritative multi-stage Docker builds, Compose topology, and GitHub Actions CI pipelines.
- `docs/INTERNATIONALIZATION.md` $\rightarrow$ Authoritative technical i18n implementation and RTL layout architecture.
- `docs/LANGUAGE-POLICY.md` $\rightarrow$ Authoritative language governance, key set equality, and dictionary rules.
- `docs/UI-POLICY.md` $\rightarrow$ Authoritative visual design system, dark mode, tokens, and component guidelines.
- `docs/OBSERVABILITY.md` $\rightarrow$ Authoritative Pino structured logging, correlation IDs (`x-request-id`), and telemetry.
- `docs/PERFORMANCE.md` $\rightarrow$ Authoritative code-splitting (`React.lazy`), Vite build chunk metrics, and caching status.
- `docs/ADR-*.md` $\rightarrow$ Authoritative immutable Architectural Decision Records.
- `docs/audit/*` $\rightarrow$ Immutable historical validation audit logs.

---

## 7. Specialized Policy Delegation

When executing tasks in specific technical domains, AI agents MUST read and follow the specialized policy documents:

- **UI & Styling Tasks**: Read [`docs/UI-POLICY.md`](docs/UI-POLICY.md).
- **Internationalization, i18n & RTL Tasks**: Read [`docs/LANGUAGE-POLICY.md`](docs/LANGUAGE-POLICY.md) and [`docs/INTERNATIONALIZATION.md`](docs/INTERNATIONALIZATION.md).
- **API & Route Changes**: Read [`docs/API.md`](docs/API.md).
- **AI Gateway & Provider Routing Tasks**: Read [`docs/AI-GATEWAY.md`](docs/AI-GATEWAY.md) and relevant ADRs (`docs/ADR-002` through `004`).
- **Container & Deployment Tasks**: Read [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).
- **Observability & Logging Tasks**: Read [`docs/OBSERVABILITY.md`](docs/OBSERVABILITY.md).
- **Performance & Bundling Tasks**: Read [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md).

---

## 8. Change Workflow

Every AI agent task MUST follow an 8-step execution workflow:

```text
1. UNDERSTAND ──► 2. LOCATE ──► 3. ANALYZE ──► 4. PLAN
                                                  │
8. REPORT   ◄── 7. REVIEW ◄── 6. VERIFY  ◄── 5. IMPLEMENT
```

1. **Step 1 — Understand**: Carefully analyze the user prompt and technical constraints.
2. **Step 2 — Locate**: Use search tools to locate exact source files, types, tests, ADRs, and domain policies.
3. **Step 3 — Analyze**: Determine the root cause of issues or structural requirements before making edits.
4. **Step 4 — Plan**: Define the minimal safe edit strategy.
5. **Step 5 — Implement**: Execute targeted code modifications.
6. **Step 6 — Verify**: Run empirical validation commands (`npm run validate`).
7. **Step 7 — Review**: Inspect changes for potential side effects, broken types, or un-extracted text.
8. **Step 8 — Report**: Synthesize findings, changes made, and empirical verification results cleanly.

---

## 9. Validation Requirements

A change is NEVER considered complete merely because code compiles or an editor displays zero inline warnings.

### Primary Release Gate
All changes MUST pass the 7-check release pipeline:

```bash
npm run validate
```

```text
               ┌─────────────────────────────────────────────────────────────┐
               │                     npm run validate                        │
               └─────────────────────────────────────────────────────────────┘
                                              │
    ┌──────────────┬──────────────┬───────────┴───┬──────────────┬────────────┬────────────┐
    ▼              ▼              ▼               ▼              ▼            ▼            ▼
1. type-check  2. lint        3. i18n:check   4. ui:audit   5. arch:audit  6. test     7. build
  (tsc)        (eslint .)     (keys parity)   (tokens & bg) (0 .js in src) (vitest)   (vite build)
```

1. `npm run type-check` $\rightarrow$ TypeScript type check (`tsc --noEmit`).
2. `npm run lint` $\rightarrow$ ESLint static analysis (`eslint .`).
3. `npm run i18n:check` $\rightarrow$ Translation key set equality check across `en`, `de`, `ar` (`scripts/check-i18n.js`).
4. `npm run ui:audit` $\rightarrow$ UI theme token and raw slate class check (`scripts/audit-theme-compliance.js`).
5. `npm run arch:audit` $\rightarrow$ Architecture check ensuring 0 `.js` files in `src/` (`scripts/audit-architecture.js`).
6. `npm test` $\rightarrow$ Vitest unit and integration test suite execution.
7. `npm run build` $\rightarrow$ Vite production bundle build.

---

## 10. Failure and Regression Prevention

- **No Suppression**: NEVER use `@ts-ignore`, `@ts-nocheck`, or `any` casts to silence type errors.
- **No Test Deletion**: NEVER delete or comment out failing tests to achieve green test reports.
- **No Warning Swallowing**: NEVER turn strict linter errors into warnings to pass CI checks.
- **Machine-Enforced Protections**: ESLint (`@typescript-eslint/no-explicit-any: "error"`), TypeScript `strict: true`, `scripts/audit-architecture.js`, `scripts/audit-theme-compliance.js`, and `scripts/check-i18n.js` enforce repository invariants automatically.

---

## 11. Security Rules

- **Zero Client Key Exposure**: AI provider API keys (`OPENROUTER_API_KEY`, etc.) MUST remain strictly server-side inside `backend/.env`. Never expose keys in Vite `VITE_*` environment variables or frontend bundles.
- **Strict Payload Validation**: All incoming BFF routes MUST be validated against Zod schemas (`backend/src/schemas/`). FastAPI endpoints MUST validate against Pydantic DTOs (`ai-service/app/schemas/`).
- **Security Middleware**: `@fastify/helmet` enforces security headers, `@fastify/cors` restricts allowed origins, and `@fastify/rate-limit` enforces 100 req/min limits.
- **Telemetry Masking**: Sensitive candidate data, raw resumes, passwords, and authorization tokens MUST be sanitized before emitting logs or OpenTelemetry spans (`backend/src/telemetry/tracer.ts`).

---

## 12. Dependency Governance

Before adding any new dependency:
1. Verify whether existing standard library features or installed packages (`clsx`, `tailwind-merge`, `dayjs`, `lucide-react`, `zod`, `framer-motion`) already provide the required functionality.
2. Check `package.json` for compatible existing versions.
3. Evaluate bundle size impact for frontend packages.
4. Obtain explicit approval before introducing new major frameworks or heavy external libraries.

---

## 13. Architecture Preservation

- **Respect ADRs**: Obey accepted Architectural Decision Records (`docs/ADR-*.md`).
- **Service Isolation**: Keep Fastify BFF routing decoupled from database layers via repository patterns, and keep AI provider logic inside `AIGatewayService`.
- **Fast Refresh Compliance**: Keep React Context definitions in `.ts` files and Providers in `.tsx` files to satisfy React Fast Refresh rules.

---

## 14. Documentation Change Rules

When implementation changes alter system behavior:
1. Determine which documentation file owns the modified domain (refer to Section 6).
2. Update ONLY the authoritative owner document.
3. Do NOT copy updated documentation into secondary files; insert markdown links pointing to the authoritative owner.
4. Ensure code symbols (`functions`, `classes`, `types`, `files`) are formatted as markdown links using relative or `file://` URIs.

---

## 15. Historical Documentation Rules

Files under `docs/audit/` and historical migration maps (`docs/PHASE1_ARCHITECTURE_AUDIT.md`, `docs/PHASE2_MIGRATION_MAP.md`) represent **immutable point-in-time audit logs**.

- AI agents MUST NOT edit historical audit logs to match current code changes.
- Historical audit files preserve project milestone evidence. Live operational documentation belongs strictly in `docs/` core specifications and root README/AGENTS files.

---

## 16. Forbidden AI Behaviors

```text
❌ FORBIDDEN AI BEHAVIORS:
 1. NEVER patch visible symptoms with ad-hoc fallbacks or @ts-ignore suppressions.
 2. NEVER introduce plain .js or .jsx files into src/.
 3. NEVER use `any` or `as any` type casts (@typescript-eslint/no-explicit-any: "error").
 4. NEVER hardcode raw un-prefixed dark classes (e.g. text-slate-400) without light mode pairs.
 5. NEVER build ad-hoc empty state markup instead of using <EmptyState />.
 6. NEVER duplicate storage keys or constants outside src/utils/constants.ts.
 7. NEVER bypass Zod schema validation on Fastify BFF route boundaries.
 8. NEVER expose server API keys or secrets in frontend JavaScript bundles.
 9. NEVER delete, skip, or disable failing tests to make a pipeline green.
10. NEVER declare a task fixed or complete without running `npm run validate`.
```

---

## 17. Definition of Done

A task is considered **DONE** if and only if:
1. The requested feature or bug fix is fully implemented.
2. Core architecture and domain boundaries remain intact.
3. No duplicate abstractions, storage keys, or helper functions were introduced.
4. All domain-specific guidelines (`UI-POLICY.md`, `LANGUAGE-POLICY.md`) were respected.
5. The full 7-step release gate `npm run validate` executes cleanly with **0 errors and 0 warnings**.
6. The final report accurately details what was changed and verified.

---

## 18. Escalation & Stop Conditions

An AI agent MUST stop execution and ask the user for clarification when:
- Requirements contradict existing system contracts or ADRs.
- Changing an API signature will break un-migrated consumers.
- Multiple conflicting sources of truth exist and cannot be resolved through code inspection.
- The request requires destructive schema migrations or breaking changes without a defined migration path.

---

## 19. Documentation Navigation

Use the following index to locate specialized technical specifications:

| Specialized Domain | Authoritative Spec |
| :--- | :--- |
| **Visual Design System, Theme Tokens & UI Directives** | [`docs/UI-POLICY.md`](docs/UI-POLICY.md) |
| **Language Governance, Key Parity & i18n Directives** | [`docs/LANGUAGE-POLICY.md`](docs/LANGUAGE-POLICY.md) |
| **Technical i18n & RTL Layout Engine** | [`docs/INTERNATIONALIZATION.md`](docs/INTERNATIONALIZATION.md) |
| **BFF REST API Endpoint Reference & Schemas** | [`docs/API.md`](docs/API.md) |
| **Native AI Gateway, Provider Adapters & Resilience** | [`docs/AI-GATEWAY.md`](docs/AI-GATEWAY.md) |
| **Multi-Stage Docker & GitHub Actions Pipelines** | [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) |
| **Pino Logging, Correlation IDs & Tracing** | [`docs/OBSERVABILITY.md`](docs/OBSERVABILITY.md) |
| **Vite Bundle Optimization & Code Splitting** | [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md) |

---

## 20. Governance Precedence

In the event of conflicting documentation or requirements, the following precedence order applies:

```text
1. Explicit User Instructions for the Current Task
        ↓
2. Executable Code & Configuration (tsconfig.json, eslint.config.js, package.json)
        ↓
3. Accepted ADRs (docs/ADR-*.md)
        ↓
4. Domain-Specific Policy Documents (docs/UI-POLICY.md, docs/LANGUAGE-POLICY.md)
        ↓
5. AGENTS.md (General AI Operating Manual)
        ↓
6. Primary Entrypoint (README.md)
        ↓
7. Historical Audit Logs (docs/audit/*)
```

If a conflict arises between code and documentation, inspect the implementation to verify active behavior and report documentation drift.
