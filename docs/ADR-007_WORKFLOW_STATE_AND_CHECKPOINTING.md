# ADR-007: LangGraph Workflow State & In-Memory Checkpointing

## Status
Accepted (Implemented in Phase 6)

## Context
LangGraph state graphs require explicit state schemas (`TypedDict` / Pydantic) to maintain variables across node execution steps.

## Decision
For Phase 6, workflow state is maintained in-memory during state graph execution. Persistent state checkpointing to PostgreSQL is deferred to the future Data Layer phase.

## Consequences
- Fast workflow execution without external database overhead.
- Explicit schema definitions ensure zero untyped node mutations.
