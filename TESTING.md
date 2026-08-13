# 🧪 CareerCraft Testing Strategy & Quality Governance Policy

> **Authoritative Specification**: This document is the **Single Source of Truth for testing strategy, quality governance, quality gate execution, failure injection protocols, and regression prevention** within CareerCraft.

---

## 1. Purpose & Testing Philosophy

`TESTING.md` establishes a deterministic, multi-layered quality assurance methodology for human software engineers, QA architects, DevOps engineers, and AI coding assistants operating on CareerCraft.

### Core Testing Philosophy
1. **Multi-Layered Quality Gates**: Quality is verified across 4 distinct levels: Static Analysis, Automated Governance Audits, Unit/Integration Test Suites, and Production Build Compilation.
2. **Deterministic & Isolated**: Unit and integration tests MUST be deterministic, fast, and completely isolated from live cloud AI provider credentials or external network dependencies.
3. **No Unverified Declarations**: No feature, bug fix, or refactoring is considered complete until all 7 checks of the `npm run validate` release gate pass cleanly with 0 errors and 0 warnings.
4. **Root-Cause Regression Fixes**: When a test fails, developers MUST fix the underlying root cause. Disabling tests, swallowing exceptions, converting errors to warnings, or using `@ts-ignore` is strictly prohibited.

---

## 2. Testing Pyramid & Level Boundaries

CareerCraft structures testing across 4 formal verification layers:

```text
                     ▲
                    ╱ ╲
                   ╱   ╲  LEVEL 4: Production Build Verification (tsc, vite build)
                  ╱─────╲
                 ╱       ╲  LEVEL 3: Integration & API Suites (Vitest 79, Pytest 13)
                ╱─────────╲
               ╱           ╲  LEVEL 2: Governance Audit Gates (i18n, UI tokens, Arch boundaries)
              ╱─────────────╲
             ╱               ╲  LEVEL 1: Static Code Analysis (TypeScript, ESLint)
            └─────────────────┘
```

| Level | Verification Category | Tools / Command | Primary Responsibility |
| :---: | :--- | :--- | :--- |
| **Level 1** | Static Code Analysis | `tsc --noEmit`, `eslint .` | Syntax correctness, strict type safety, zero `any` types. |
| **Level 2** | Governance Audit Gates | `i18n:check`, `ui:audit`, `arch:audit` | Translation key set equality, Light/Dark tokens, 0 `.js` in `src/`. |
| **Level 3** | Integration & Unit Suites | Vitest (79 tests), Pytest (13 tests) | API routes, AI Gateway resilience, storage, STAR scoring, FastAPI. |
| **Level 4** | Production Build Verification | `vite build`, `tsc --noEmit` | Bundling, tree shaking, ES module compilation into `dist/`. |

- **E2E Testing (Playwright / Cypress)**: `NOT CURRENTLY IMPLEMENTED` (Planned for post-v1.0 release).

---

## 3. Factual Test Inventory

The repository contains **92 automated tests** across 2 main test suites (79 Vitest + 13 Pytest):

| Test Suite / Area | Framework | Test File Location | Test Count | Current Status |
| :--- | :---: | :--- | :---: | :---: |
| **AI Resilience & Circuit Breaker** | Vitest | `backend/tests/integration/ai-resilience.test.ts` | 12 | **PASS** |
| **AI Router & Model Aliases** | Vitest | `backend/tests/integration/ai-router.test.ts` | 6 | **PASS** |
| **AI Provider Abstraction** | Vitest | `backend/tests/integration/ai-provider-abstraction.test.ts` | 4 | **PASS** |
| **OpenRouter Provider Adapter** | Vitest | `backend/tests/integration/openrouter-provider.test.ts` | 4 | **PASS** |
| **Ollama Provider Adapter** | Vitest | `backend/tests/integration/ollama-provider.test.ts` | 3 | **PASS** |
| **BFF Provider Adapter Overview**| Vitest | `backend/tests/integration/provider.test.ts` | 5 | **PASS** |
| **BFF Health Check Routes** | Vitest | `backend/tests/integration/health.test.ts` | 5 | **PASS** |
| **BFF AI Chat Endpoint** | Vitest | `backend/tests/integration/ai.test.ts` | 3 | **PASS** |
| **BFF Interview History Routes** | Vitest | `backend/tests/integration/interview.test.ts` | 4 | **PASS** |
| **BFF AI Workflow Proxies** | Vitest | `backend/tests/integration/workflow.test.ts` | 4 | **PASS** |
| **BFF Persistence Boundary** | Vitest | `backend/tests/integration/persistence.test.ts` | 3 | **PASS** |
| **BFF Evaluation Benchmark** | Vitest | `backend/tests/integration/evaluation.test.ts` | 1 | **PASS** |
| **BFF Telemetry & Tracing** | Vitest | `backend/tests/integration/telemetry.test.ts` | 1 | **PASS** |
| **STAR Interview Coaching Helpers**| Vitest | `src/utils/__tests__/interview.test.ts` | 4 | **PASS** |
| **Frontend i18n Utility** | Vitest | `src/utils/__tests__/i18n.test.ts` | 4 | **PASS** |
| **Frontend ErrorBoundary UI** | Vitest | `src/components/ui/__tests__/ErrorBoundary.test.ts` | 5 | **PASS** |
| **ATS Resume Optimizer Service** | Vitest | `src/services/__tests__/atsService.test.ts` | 3 | **PASS** |
| **Client Storage Service** | Vitest | `src/services/__tests__/storageService.test.ts` | 5 | **PASS** |
| **Client Persistence Utility** | Vitest | `src/utils/__tests__/persistence.test.ts` | 1 | **PASS** |
| **Client Telemetry Utility** | Vitest | `src/utils/__tests__/telemetry.test.ts` | 1 | **PASS** |
| **Client Benchmark Evaluator** | Vitest | `src/utils/__tests__/evaluation.test.ts` | 1 | **PASS** |
| **Python FastAPI & LangGraph** | Pytest | `ai-service/tests/` | 13 | **PASS** |
| **GRAND TOTAL PLATFORM TESTS** | Multi | **22 Test Files Across Frontend & Backend** | **92 Tests** | **PASS (92/92)** |

---

## 4. Static Analysis & Code Quality Verification

Static code quality is strictly enforced prior to running unit or integration test suites:

### 1. TypeScript Type Verification (`npm run type-check`)
- **Command**: `tsc --noEmit`
- **Configuration**: Root `tsconfig.json` (`"strict": true`, `"noImplicitAny": true`).
- **Enforcement**: Zero compilation errors permitted.

### 2. ESLint Static Analysis (`npm run lint`)
- **Command**: `eslint .`
- **Configuration**: `eslint.config.js` with TypeScript ESLint plugins.
- **Strict Rule**: `@typescript-eslint/no-explicit-any` set to `"error"`. Using `any` or loose casts (`as any`) aborts CI compilation.

---

## 5. Governance Audit Gates

CareerCraft executes 3 specialized, automated governance audit scripts during validation:

### 1. i18n Dictionary Governance Audit (`npm run i18n:check`)
- **Script**: `scripts/check-i18n.js`
- **Verifies**:
  1. Existence of `en`, `de`, and `ar` dictionaries in `src/utils/i18n.ts`.
  2. **100% Translation Key Parity Invariant**: $\text{keys}(\text{en}) \equiv \text{keys}(\text{de}) \equiv \text{keys}(\text{ar})$. Current count: **245 keys** per locale.
  3. Text direction mapping contracts (`en`/`de` LTR, `ar` RTL).

### 2. UI Theme Compliance Audit (`npm run ui:audit`)
- **Script**: `scripts/audit-theme-compliance.js`
- **Verifies**:
  1. Semantic color token usage (`--color-primary`, `--color-surface`, etc.).
  2. Compliance with shared UI primitives (`Card`, `Button`, `Modal`, `EmptyState`, `Badge`).
  3. **Zero Un-Prefixed Dark Class Invariant**: Disallows un-prefixed dark slate classes like `text-slate-400` without corresponding light mode utility definitions.

### 3. Architectural Boundary Audit (`npm run arch:audit`)
- **Script**: `scripts/audit-architecture.js`
- **Verifies**:
  1. **Zero `.js`/`.jsx` Files In `src/`**: Ensures all frontend code is strictly typed TypeScript.
  2. **Single Source of Truth for Constants**: Validates that shared constants reside in `src/utils/constants.ts`.

---

## 6. Vitest Integration & Unit Suite (Frontend & BFF)

- **Framework**: Vitest 3 (`vitest@^3.0.0`) with `happy-dom` / `jsdom` environments.
- **Execution Mode**: `npm test` (Runs single pass in CI) or `npx vitest` (Interactive watch mode).
- **Scope**: Covers React UI primitives, local storage helpers, Fastify BFF route controllers, AI Gateway model routers, resilience policies, and provider adapters.

---

## 7. Pytest Suite (Python AI Microservice)

- **Framework**: Pytest 8 (`pytest>=8.0.0`) with `pytest-asyncio>=0.23.0`.
- **Location**: `ai-service/tests/`.
- **Execution Command**:
  ```bash
  cd ai-service
  pytest
  # Passes 13 automated tests covering FastAPI health endpoints and LangGraph workflows
  ```

---

## 8. API Contract & Route Testing

BFF API endpoints under `/api/v1/` are validated using Vitest integration tests hitting Fastify route handlers:
- **Health Checks**: `backend/tests/integration/health.test.ts` validates `GET /api/v1/health` and readiness checks.
- **AI Chat Endpoint**: `backend/tests/integration/ai.test.ts` validates payload parsing and Zod schema error responses (HTTP 400).
- **Workflow Proxies**: `backend/tests/integration/workflow.test.ts` validates Fastify proxy forwarding to Python FastAPI with internal service tokens (`x-internal-service-token`).

---

## 9. AI Gateway Resilience & Provider Testing

The native Fastify AI Gateway (`backend/src/services/ai-gateway.service.ts`) is covered by 29 dedicated integration tests:
- **`ai-resilience.test.ts` (12 tests)**: Validates 30-second timeout boundaries, bounded 1-retry policies, immediate HTTP 429 rate limit fallbacks, and `CircuitBreaker` state transitions (`CLOSED` $\rightarrow$ `OPEN` $\rightarrow$ `HALF_OPEN`).
- **`ai-router.test.ts` (6 tests)**: Validates task-to-alias mapping (`resume_optimization` $\rightarrow$ `career-fast`, `interview_coaching` $\rightarrow$ `career-reasoning`).
- **Provider Adapters**: `openrouter-provider.test.ts` (4 tests), `ollama-provider.test.ts` (3 tests), and `MockAIProvider` abstractions.

---

## 10. LangGraph Workflow Graph Testing

- **Engine**: Python LangGraph 0.2 execution engine.
- **Workflow Testing**: `ai-service/tests/` tests state transitions across `resume_workflow_graph`, `job_workflow_graph`, and `interview_workflow_graph`.
- **Factuality & Benchmark Testing**: Automated LLM-as-a-Judge test runner evaluates outputs against `golden_dataset.json` for factuality and ATS alignment.

---

## 11. Test Data, Fixtures & Mocking Strategy

- **Zero Production Credentials**: Tests MUST NOT require live cloud API keys or external network connections.
- **Deterministic Mocking**: Vitest and Pytest test suites utilize `MockAIProvider` (`backend/src/services/providers/MockAIProvider.ts`) to return deterministic completion payloads.
- **In-Memory Storage**: Client storage tests use simulated `localStorage` in Vitest environments without mutating persistent disk files.

---

## 12. External AI Provider Test Isolation

```text
       TEST SUITE EXECUTION (npm test / pytest)
                          │
                          ▼
            [ AIGatewayService / AIRouter ]
                          │
            ┌─────────────┴─────────────┐
            ▼                           ▼
    (MockAIProvider)            (Ollama Mock Stub)
    Returns Static JSON          Zero External Network
    Deterministic Tokens        Zero Cloud API Key Required
```

All CI pipeline test runs are completely isolated from live cloud billing endpoints (`OpenRouter`) or local hardware daemons (`Ollama`), ensuring reliable execution in isolated GitHub Actions runners.

---

## 13. Automated Failure Injection Matrix

CareerCraft verifies system resilience using automated failure injection scenarios:

| Failure Scenario | Test File Location | Simulated Condition | Expected Behavior | Status |
| :--- | :--- | :--- | :--- | :---: |
| **Provider Timeout (30s)** | `ai-resilience.test.ts` | Delay completion > 30,000 ms | Throws `AIProviderError` (category: `timeout`) & executes fallback. | **PASS** |
| **Provider 429 Rate Limit** | `ai-resilience.test.ts` | Return HTTP 429 status | Bypasses retry budget, immediately executes bounded fallback. | **PASS** |
| **Provider 5xx Server Error** | `ai-resilience.test.ts` | Return HTTP 500/503 status | Triggers bounded 1 retry, then executes fallback adapter. | **PASS** |
| **Circuit Breaker Tripping** | `ai-resilience.test.ts` | Inject 3 consecutive failures | Circuit transitions `CLOSED` $\rightarrow$ `OPEN`. Calls fail fast for 30s. | **PASS** |
| **Invalid Internal Token** | `workflow.test.ts` | Omit `x-internal-service-token` | FastAPI microservice returns HTTP 401 Unauthorized. | **PASS** |
| **Corrupt JSON in Storage** | `storageService.test.ts` | Inject invalid JSON payload | Handles parse error gracefully without crashing SPA runtime. | **PASS** |

---

## 14. Regression Prevention Strategy

To prevent visual, functional, or architectural regressions from entering `main`:

1. **Automated ESLint Checks**: Catches unused variables, broken hooks, and explicit `any` types.
2. **Automated i18n Checks**: Prevents missing translation keys in German or Arabic dictionaries.
3. **Automated UI Audits**: Prevents un-prefixed dark classes or broken UI primitives.
4. **Automated Architectural Audits**: Blocks introduction of legacy `.js` files into `src/`.
5. **Vitest & Pytest Suites**: Verifies business logic, scoring formulas, and Gateway state machines.

---

## 15. The 7-Check Release Gate Pipeline (`npm run validate`)

The single authoritative command for release validation is:

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

### Gate Execution Order & Responsibility

| # | Gate Step | Command | Domain Protected | Failure Impact |
| :-: | :--- | :--- | :--- | :--- |
| **1** | `type-check` | `tsc --noEmit` | TypeScript static type safety | Aborts pipeline on type errors |
| **2** | `lint` | `eslint .` | Code style, syntax & zero `any` rules | Aborts pipeline on lint errors/warnings |
| **3** | `i18n:check` | `node scripts/check-i18n.js` | 100% key parity across EN/DE/AR | Aborts pipeline on missing locale keys |
| **4** | `ui:audit` | `node scripts/audit-theme-compliance.js` | Theme token & dark class compliance | Aborts pipeline on un-prefixed dark classes |
| **5** | `arch:audit` | `node scripts/audit-architecture.js` | Architecture boundaries & 0 `.js` in `src/` | Aborts pipeline on `.js` files in `src/` |
| **6** | `test` | `vitest run` | Vitest 79 integration & unit tests | Aborts pipeline on test assertion failure |
| **7** | `build` | `npm run build` | Vite production bundle compilation | Aborts pipeline on asset bundling errors |

---

## 16. CI/CD Pipeline Integration (`.github/workflows/ci.yml`)

The GitHub Actions CI workflow triggers on every push and pull request to `main`:

```yaml
# .github/workflows/ci.yml Summary
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4 (Node 24)
      - uses: actions/setup-python@v5 (Python 3.11)
      - run: pip install -r ai-service/requirements.txt
      - run: pytest ai-service/                # 13 Python Tests PASS
      - run: npm ci
      - run: npm run validate                  # Full 7-Check Release Gate PASS
```

---

## 17. Code Coverage Policy & Status

- **Current Coverage Threshold Status**: `NOT CURRENTLY ENFORCED` (Coverage collection via Vitest v8/c8 is optional and not currently configured as a failing gate threshold).
- **Core Coverage Targets**: AI Gateway resilience (100% scenario coverage), i18n key parity (100% key set coverage), shared UI primitives (100% token audit coverage).

---

## 18. Testing Definition of Done

A task is considered **TEST-COMPLETE** if and only if:
1. Unit or integration tests are added/updated for new or altered business logic.
2. All 92 automated tests (79 Vitest + 13 Pytest) PASS.
3. No existing tests were deleted, skipped, or weakened.
4. The full 7-step release gate `npm run validate` executes cleanly with **0 errors and 0 warnings**.

---

## 19. AI Coding-Agent Testing Directives

When modifying code, AI coding agents MUST:
1. Inspect existing tests in `backend/tests/` and `src/utils/__tests__/` before modifying functions.
2. Never delete or disable failing tests to achieve green CI.
3. Fix underlying root causes rather than weakening assertions or wrapping calls in `@ts-ignore`.
4. Run `npm run validate` and report actual empirical outputs before declaring completion.
5. See [`AGENTS.md`](AGENTS.md) for full AI operating rules.

---

## 20. Test Failure Investigation Protocol

When a test fails during local development or CI:

```text
1. Capture Full Stack Trace
        ↓
2. Identify Failing Layer (Static / Audit / Unit / Integration / Build)
        ↓
3. Reproduce Deterministically (npx vitest <file-path>)
        ↓
4. Trace Upstream Data Provider & Root Cause
        ↓
5. Implement Root-Cause Fix (No Workarounds / No @ts-ignore)
        ↓
6. Execute npm run validate
```

---

## 21. Testing Gap Analysis & Future Roadmap

| Testing Domain | Current Status | Coverage Evidence | Identified Gap / Risk | Recommended Future Action |
| :--- | :---: | :--- | :--- | :--- |
| **BFF & AI Gateway** | **EXCELLENT** | 29 integration tests PASS | None | Maintain existing Vitest suite. |
| **i18n & Governance** | **EXCELLENT** | 245 keys parity PASS | None | Maintain `scripts/check-i18n.js`. |
| **Python FastAPI AI Service**| **GOOD** | 13 Pytest tests PASS | Basic route coverage | Add explicit LangGraph node state tests. |
| **Frontend UI Components** | **MODERATE** | ErrorBoundary & Card tests | Limited component unit tests | Add React Testing Library component tests. |
| **End-to-End (E2E)** | **MISSING** | 0 E2E tests | No browser automation | Add Playwright E2E suite for STAR coach flow. |
| **Performance Benchmarking** | **MISSING** | Vite build metrics only | No automated Lighthouse | Add automated performance benchmarks. |

---

## 22. Subsystem Documentation Navigation Hub

| Need / Domain | Authoritative Specification |
| :--- | :--- |
| **AI Coding Agent Operating Manual** | [`AGENTS.md`](AGENTS.md) |
| **Master System Architecture & Service Maps** | [`ARCHITECTURE.md`](ARCHITECTURE.md) |
| **Developer Setup & Environment Guide** | [`DEVELOPMENT.md`](DEVELOPMENT.md) |
| **BFF REST API Endpoints & Schemas** | [`docs/API.md`](docs/API.md) |
| **Native AI Gateway & Model Resilience** | [`docs/AI-GATEWAY.md`](docs/AI-GATEWAY.md) |
| **Docker Compose & Deployment Specifications** | [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) |
| **UI Design System, Theme Tokens & Guidelines** | [`docs/UI-POLICY.md`](docs/UI-POLICY.md) |
| **Translation Governance & Key Parity Rules** | [`docs/LANGUAGE-POLICY.md`](docs/LANGUAGE-POLICY.md) |
| **Observability, Pino Logs & Tracing** | [`docs/OBSERVABILITY.md`](docs/OBSERVABILITY.md) |
| **Vite Bundle Optimization & Performance** | [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md) |
