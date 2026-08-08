# ADR-003: OmniRoute Integration & LiteLLM AI Gateway Responsibility

## Status
Accepted (Implemented in Phase 2)

## Context
Initial architecture drafts proposed evaluating both OmniRoute and LiteLLM as separate gateway proxy binaries. Chaining two separate LLM proxy processes increases request latency, operational complexity, and network failure points without functional benefit.

## Decision
Adopt **LiteLLM Proxy** as the single canonical AI Gateway binary.

OmniRoute routing concepts/policies were incorporated into the CareerCraft routing strategy and implemented through the LiteLLM configuration and application-level routing logic.

The canonical flow is:
`Application → LiteLLM AI Gateway → Provider (OpenRouter Cloud / Ollama Local)`

## Consequences
- Single gateway binary (**LiteLLM Proxy**) simplifies deployment.
- Lower request latency and straightforward **OpenTelemetry distributed tracing**.
