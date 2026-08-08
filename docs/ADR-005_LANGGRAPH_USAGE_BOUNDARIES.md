# ADR-005: LangGraph Usage Boundaries & Stateful Workflow Selection

## Status
Accepted (Implemented in Phase 6)

## Context
Adding AI agent frameworks without architectural boundary constraints risks introducing unnecessary complexity, non-deterministic loops, and latency overhead into simple single-prompt tasks.

## Decision
Restrict **LangGraph** usage strictly to multi-step, stateful, conditional, or validation-heavy AI workflows (Resume Tailoring, Job Requirement Parsing, Career Roadmaps). Single-prompt formatting tasks continue to use direct LLM utility calls.

## Consequences
- Prevents artificial agent loop complexity.
- Ensures all state transitions, ATS scoring calculations, and factuality guardrail nodes execute in controlled sequence.
