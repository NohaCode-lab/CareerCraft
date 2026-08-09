# CareerCraft AI Assistant & Service Resilience Audit Record (`AI_RESILIENCE.md`)

## Status: VERIFIED & RESILIENT 🔒

- **Date**: August 9, 2026
- **Baseline Commit**: `056c197`
- **Release Tag**: `v1.0.1`

---

## 1. Verified AI Runtime Architecture Graph

```text
index.html
   ↓
src/main.tsx
   ↓
AppProviders.tsx
   ↓
App.tsx (Surrounded by ErrorBoundary)
   ↓
AIAssistantPage.tsx (Lazy-loaded route)
   ↓
AIAssistantChat.tsx (Component state & PromptInput)
   ↓
src/services/aiService.js (generateCV, generateCoverLetter, getCareerSuggestions)
   ↓
backend/src/routes/ai.routes.ts (BFF Fastify endpoint /api/v1/ai/chat)
   ↓
backend/src/services/ai-gateway.service.ts (AIGatewayService)
   ↓
ai-service/app/main.py (FastAPI LangGraph Microservice)
```

---

## 2. Service Failure & Resilience Matrix

| Failure Mode | Current Handling | UI Behavior | Safe Input? | Verified? |
| :--- | :--- | :--- | :--- | :--- |
| **Network Failure** | `try/catch` in `AIAssistantChat.tsx` | Localized error banner | ✅ Input preserved | ✅ PASS |
| **HTTP 400** | `createErrorResponse('Validation error')` | Error toast / fallback msg | ✅ Input preserved | ✅ PASS |
| **HTTP 401** | Handled in Fastify BFF / Python `verify_internal_token` | Credentials masked | ✅ Input preserved | ✅ PASS |
| **HTTP 403** | Fastify error handler fallback | Safe error banner | ✅ Input preserved | ✅ PASS |
| **HTTP 429** | Fastify BFF rate limiter / retry protection | Error notice, 0 infinite loops | ✅ Input preserved | ✅ PASS |
| **HTTP 500** | `createErrorResponse()` / fallback response | Deterministic fallback content | ✅ Input preserved | ✅ PASS |
| **Timeout** | Fastify client request timeout policy | Safe user message | ✅ Input preserved | ✅ PASS |
| **Malformed Response**| `normalizeText()` fallback checks | Safe fallback render | ✅ Input preserved | ✅ PASS |
| **Empty Response** | `!aiText` fallback generation | Contextual career advice | ✅ Input preserved | ✅ PASS |

---

## 3. Security & Secret Exposure Audit

- **Browser Secrets**: Zero private API keys, bearer tokens, or provider secrets are exposed in `import.meta.env` or client JavaScript (`NONE`).
- **Token Masking**: Client calls `/api/v1/ai/chat`. External provider keys (OpenRouter / Ollama) reside strictly on the server side (`backend/` & `ai-service/`).

---

## 4. Error Boundary Separation

- **Service API Failures**: Intercepted cleanly by `AIAssistantChat.tsx` local component state (`setErrorMessage`), preventing normal API drops from triggering uncaught React render exceptions.
- **Render Exceptions**: Uncaught JSX rendering crashes fall back safely to the top-level `ErrorBoundary` fallback UI without exposing internal stack traces in production.
