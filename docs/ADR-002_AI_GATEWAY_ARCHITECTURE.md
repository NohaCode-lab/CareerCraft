# ADR-002: AI Gateway Architecture & LiteLLM Proxy Selection

## Status
Accepted (Implemented in Phase 2)

## Context
CareerCraft requires a secure, provider-agnostic LLM infrastructure layer to handle model aliasing, fallback routing, rate limiting, request validation, and secret protection without exposing provider API keys to the browser.

## Options Considered
1. **Direct Browser Provider Calls**: Insecure; exposes API keys and lacks fallback mechanisms.
2. **Custom Gateway Code in BFF**: Adds maintenance burden for token usage, model fallbacks, and retry exponential backoff.
3. **LiteLLM AI Gateway Proxy**: Enterprise-grade, OpenAI-compatible proxy supporting 100+ LLMs, virtual keys, model aliases, retries, and native OpenTelemetry instrumentation.

## Decision
Adopt **LiteLLM Proxy** as the single authoritative AI Gateway binary.

## Consequences
- All LLM interactions route through LiteLLM Proxy (`http://127.0.0.1:4001`).
- The frontend interacts exclusively via the BFF endpoint (`POST /api/v1/ai/chat`).
- Zero LLM API keys are exposed to the browser or logged in stdout.
