# 🤖 CareerCraft AI Gateway Architecture

## 1. Overview

The **CareerCraft AI Gateway** is a native, resilient, server-side orchestration system operating inside the Fastify Backend-for-Frontend (BFF). It decouples application workflows from specific Artificial Intelligence model providers, managing model routing, provider resilience, bounded fallbacks, timeouts, and circuit breakers.

### Architectural Role
* **Decoupling**: Eliminates direct vendor lock-in to cloud AI providers.
* **Security**: Ensures provider API credentials (`OPENROUTER_API_KEY`, etc.) remain strictly server-side and are never exposed to the client SPA.
* **Deterministic Routing**: Routes candidate tasks dynamically based on latency, reasoning requirements, or candidate data privacy rules.
* **Fault Tolerance**: Prevents upstream provider degradation (e.g. rate limits, 5xx server errors, network timeouts) from breaking user career workflows.

### Source Code Location
```text
backend/src/services/
├── ai-gateway.service.ts          # Central AI Gateway orchestration service
├── providers/
│   ├── AIProvider.ts              # Neutral provider interface & error taxonomy
│   ├── MockAIProvider.ts          # Offline deterministic mock adapter
│   ├── OllamaProvider.ts          # Local privacy-focused LLM adapter
│   └── OpenRouterProvider.ts      # Cloud multi-model aggregator adapter
├── routing/
│   └── AIRouter.ts                # Task-based model routing & alias mapping
└── resilience/
    ├── CircuitBreaker.ts          # Per-provider state machine (CLOSED/OPEN/HALF_OPEN)
    ├── ResiliencePolicy.ts        # Bounded retry, timeout & fallback executor
    └── resilience.types.ts        # Resilience configuration schemas
```

---

## 2. Gateway Architecture & Execution Flow

When a client application initiates an AI request (e.g., CV bullet optimization, STAR answer evaluation, mock interview feedback), the request travels through the following verified path:

```text
React 19 Frontend SPA
        │  (POST /api/v1/ai/chat)
        ▼
Fastify BFF (`ai.routes.ts`)
        │  (Zod Payload Validation)
        ▼
AIGatewayService (`ai-gateway.service.ts`)
        │
        ├─► AIRouter (`AIRouter.ts`)
        │    (Resolves Model Alias e.g. `career-fast` -> `openai/gpt-4o-mini`)
        │
        ├─► ResiliencePolicy (`ResiliencePolicy.ts`)
        │    (Enforces 30s Timeout, Bounded 1-Retry, Immediate 429 Fallback)
        │
        ├─► CircuitBreaker (`CircuitBreaker.ts`)
        │    (Evaluates State: CLOSED -> OPEN -> HALF_OPEN)
        │
        ▼
AIProvider Adapter Interface (`AIProvider.ts`)
        │
   ┌────┴──────────────────────────┬──────────────────────────┐
   ▼                               ▼                          ▼
OpenRouterProvider              OllamaProvider             MockAIProvider
(Cloud API Aggregator)         (Local Qwen2.5 Engine)     (Zero-Network CI/Dev)
```

---

## 3. Provider Abstraction & Normalized Contract

All provider adapters implement the standardized `AIProvider` interface.

```typescript
// Implementation: backend/src/services/providers/AIProvider.ts

export interface AIRequestContract {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  task: 'resume_optimization' | 'job_matching' | 'interview_coaching' | 'general_chat';
  modelAlias?: 'career-fast' | 'career-reasoning' | 'career-private';
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponseContract {
  content: string;
  provider: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  latencyMs: number;
}

export interface AIProvider {
  readonly providerName: string;
  complete(request: AIRequestContract): Promise<AIResponseContract>;
  isHealthy(): Promise<boolean>;
}
```

---

## 4. Provider Adapters

### 1. `OpenRouterProvider`
* **File**: [`backend/src/services/providers/OpenRouterProvider.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/src/services/providers/OpenRouterProvider.ts)
* **Purpose**: Connects to the OpenRouter unified API aggregator, providing access to top-tier cloud LLMs (OpenAI, Anthropic, Google, Meta).
* **Timeout & Abort**: Enforces a strict **30,000 ms (30 second)** timeout via `AbortController`.
* **Headers**: Includes HTTP Referer `https://careercraft.app` and title `CareerCraft Platform`.
* **Error Handling**: Converts HTTP 401/403 to `authentication` errors, 429 to `rate_limit` errors, and 5xx to `server_error`.

### 2. `OllamaProvider`
* **File**: [`backend/src/services/providers/OllamaProvider.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/src/services/providers/OllamaProvider.ts)
* **Purpose**: Serves local-first, privacy-sensitive workflows (e.g. `career-private`) using local containerized models (`qwen2.5:7b-instruct`).
* **Endpoint**: Default `http://127.0.0.1:11434/api/chat` (configurable via `OLLAMA_BASE_URL`).
* **Non-Streaming**: Passes `stream: false` to return complete structured responses.

### 3. `MockAIProvider`
* **File**: [`backend/src/services/providers/MockAIProvider.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/src/services/providers/MockAIProvider.ts)
* **Purpose**: Enables deterministic, zero-network development and CI pipeline testing without external cloud dependencies.
* **Output**: Returns tailored mock responses based on the request `task` property.

---

## 5. Model Routing & Alias Mapping

The `AIRouter` maps candidate requests to model aliases and concrete provider model identifiers.

```typescript
// Implementation: backend/src/services/routing/AIRouter.ts

export const MODEL_ALIASES = {
  'career-fast': {
    provider: 'openrouter',
    model: 'openai/gpt-4o-mini',
  },
  'career-reasoning': {
    provider: 'openrouter',
    model: 'anthropic/claude-3.5-sonnet',
  },
  'career-private': {
    provider: 'ollama',
    model: 'qwen2.5:7b-instruct',
  },
} as const;
```

### Deterministic Routing Rules
1. If `modelAlias` is explicitly specified in `AIRequestContract`, `AIRouter` maps directly to that target model.
2. If `modelAlias` is omitted, `AIRouter` inspects the request `task`:
   * `interview_coaching` $\rightarrow$ `career-reasoning` (`claude-3.5-sonnet`)
   * `resume_optimization` $\rightarrow$ `career-fast` (`gpt-4o-mini`)
   * `job_matching` $\rightarrow$ `career-fast` (`gpt-4o-mini`)
   * Default / `general_chat` $\rightarrow$ `career-fast` (`gpt-4o-mini`)

---

## 6. Provider Resilience, Fallback & Circuit Breaker

```text
Resilience Execution Order:
Primary Provider Request -> Timeout (30s) -> Bounded Retry (Max 1) -> Circuit Breaker Check -> Bounded Fallback
```

### 1. Timeout Policy
* Every request is wrapped in a **30,000 ms** timeout boundary. Exceeding this throws an `AIProviderError` with category `timeout`.

### 2. Retry Policy
* **Max Retries**: **1 retry** (total 2 attempts per provider).
* **Retryable Errors**: `timeout`, 5xx `server_error`, network connection failures.
* **Non-Retryable Errors**: `authentication` (401/403), `validation` (400), and `rate_limit` (429). Rate limit errors immediately trigger fallback without wasting retry budget.

### 3. Bounded Fallback Hierarchy
If the primary provider fails after retries, `ResiliencePolicy` executes a bounded fallback sequence:

```text
Primary: openrouter  ──(Failure)──►  Fallback 1: ollama  ──(Failure)──►  Fallback 2: mock
Primary: ollama      ──(Failure)──►  Fallback 1: mock
```

### 4. Circuit Breaker State Machine
Each provider maintains an independent `CircuitBreaker` instance (`backend/src/services/resilience/CircuitBreaker.ts`):

```text
               ┌────────────────────────┐
               ▼                        │
          ┌────────┐ (3 Failures)  ┌────────┐
          │ CLOSED │──────────────►│  OPEN  │
          └────────┘               └────────┘
              ▲                         │
     (Probe   │                         │ (30s Cooldown
    Success)  │                         │  Expires)
              │    ┌───────────┐        │
              └────│ HALF_OPEN │◄───────┘
                   └───────────┘
```

* **Failure Threshold**: 3 consecutive transient failures trip the state to `OPEN`.
* **Cooldown Period**: 30,000 ms (30 seconds). While `OPEN`, calls immediately fail fast without hitting the provider network.
* **Half-Open Probe**: After 30s, the next request transitions to `HALF_OPEN`. A single success resets state to `CLOSED`; a failure trips it back to `OPEN`.

---

## 7. Normalized Error Taxonomy

All provider failures are captured and mapped into a standardized `AIProviderError` class:

| Category | Trigger Conditions | Retryable? | Fallback Triggered? |
| :--- | :--- | :---: | :---: |
| `rate_limit` | HTTP 429 Rate Limit Exceeded | No (Immediate) | Yes |
| `timeout` | Execution exceeds 30,000 ms | Yes (Max 1) | Yes |
| `server_error` | HTTP 500, 502, 503, 504 | Yes (Max 1) | Yes |
| `provider_unavailable` | Connection refused, DNS failure, Circuit Breaker OPEN | No | Yes |
| `authentication` | HTTP 401 Unauthorized, 403 Forbidden | No | No (Fatal) |
| `validation` | HTTP 400 Bad Request | No | No (Fatal) |

---

## 8. Testing & Verification

The AI Gateway architecture is backed by 5 dedicated integration test suites:

* [`backend/tests/integration/ai-provider-abstraction.test.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/tests/integration/ai-provider-abstraction.test.ts) (4 tests)
* [`backend/tests/integration/ai-router.test.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/tests/integration/ai-router.test.ts) (6 tests)
* [`backend/tests/integration/ai-resilience.test.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/tests/integration/ai-resilience.test.ts) (12 tests)
* [`backend/tests/integration/openrouter-provider.test.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/tests/integration/openrouter-provider.test.ts) (4 tests)
* [`backend/tests/integration/ollama-provider.test.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/tests/integration/ollama-provider.test.ts) (3 tests)

---

## 9. Security & Secret Isolation

1. **Server-Side Credential Isolation**: `OPENROUTER_API_KEY` is loaded exclusively into server process memory via `backend/src/app/config.ts`.
2. **Zero Client Exposure**: The React frontend interacts solely with `POST /api/v1/ai/chat`. No provider keys exist in frontend JavaScript bundles.
3. **Payload Sanitization**: Incoming request payloads are validated against Zod schemas (`backend/src/schemas/ai.schema.ts`) before being passed to provider adapters.

---

## 10. Current Limitations & Documentation Drift Notes

> [!IMPORTANT]
> **Documentation Drift Note**:
> Older project documentation referenced an external `LiteLLM Proxy` container running on port 4001 as the primary AI Gateway.
> The authoritative implementation in the repository is the **native Fastify `AIGatewayService`** (`backend/src/services/ai-gateway.service.ts`). LiteLLM proxy definitions exist in `docker-compose.yml` for optional container setups, but the Fastify BFF executes provider requests natively.

* **Live Cloud Credentials**: Live completion through `OpenRouterProvider` requires setting a valid `OPENROUTER_API_KEY` in `backend/.env`. When omitted, the gateway defaults to `MockAIProvider` for safe offline execution.
* **Local Ollama Daemon**: `OllamaProvider` requires an active Ollama process running at `http://127.0.0.1:11434`. If unavailable, `ResiliencePolicy` gracefully falls back to `MockAIProvider`.

---

## Related Documentation

- [API Reference](./API.md)
- [Observability & Telemetry](./OBSERVABILITY.md)
- [Deployment & DevOps](./DEPLOYMENT.md)
- [Performance Engineering](./PERFORMANCE.md)
- [Internationalization](./INTERNATIONALIZATION.md)
