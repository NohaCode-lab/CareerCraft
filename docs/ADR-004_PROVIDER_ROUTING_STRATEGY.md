# ADR-004: Cloud vs. Local Model Provider Routing Strategy

## Status
Accepted (Implemented in Phase 2)

## Context
CareerCraft users process sensitive career and resume data that requires balancing privacy, response latency, reasoning depth, and operational token cost.

## Decision
Establish three controlled model aliases inside `litellm.config.yaml`:
1. `career-fast`: Default high-speed cloud completion (`openrouter/openai/gpt-4o-mini`) with local Ollama fallback.
2. `career-reasoning`: Complex analysis (`openrouter/anthropic/claude-3.5-sonnet`) with `gpt-4o-mini` fallback.
3. `career-private`: Privacy-first local completion (`ollama/qwen2.5:7b-instruct`).

## Consequences
- Application components request model aliases (`career-fast`) instead of hard-coded provider strings.
- Local model offline status gracefully triggers fallback policies without breaking client execution.
