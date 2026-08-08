# ADR-006: Python AI Microservice Architecture

## Status
Accepted (Implemented in Phase 6)

## Context
Python is the native ecosystem for LangGraph, Pydantic, and AI orchestration. Fastify (Node.js) remains the primary public-facing Backend-for-Frontend (BFF).

## Decision
Deploy a dedicated **Python / FastAPI Microservice** (`ai-service/`) listening on internal port 8000. It authenticates calls from the Node BFF using `X-Internal-Service-Token`.

## Consequences
- Clean separation: Node BFF manages auth, client REST API, request correlation IDs, and rate limits. Python service manages stateful LangGraph graphs and factuality guardrails.
- Public client browser cannot access the internal Python service directly.
