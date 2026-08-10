# 🔌 CareerCraft API Architecture & Reference

## 1. Overview

The CareerCraft API surface is exposed via a Node.js Fastify Backend-for-Frontend (BFF). The BFF acts as an API gateway facade, validating incoming client requests, enforcing rate limits, routing AI completions to the internal AI Gateway Service, and proxying complex stateful workflow graphs to the Python FastAPI microservice.

* **BFF Base Path**: `/api/v1`
* **Protocol**: HTTP/1.1 (JSON payloads)
* **BFF Runtime**: Fastify 5 (`fastify@^5.2.1`)
* **Python Microservice Runtime**: FastAPI 0.115 (`fastapi>=0.115.0`) on `http://ai-service:8000`
* **BFF Service Port**: `4000`

---

## 2. Authentication & Security Headers

### Security Middleware Configuration
* **CORS**: Origin policies enforced via `@fastify/cors@^10.0.2`.
* **Security Headers**: Security headers enforced via `@fastify/helmet@^13.0.1`.
* **Rate Limiting**: Sliding window rate limiting enforced via `@fastify/rate-limit@^10.2.2` (100 requests per minute per IP).
* **Correlation ID**: Injects or forwards `x-request-id` headers on every request/response cycle.
* **Internal Microservice Token**: Fastify BFF attaches `x-internal-service-token` when proxying requests to the Python FastAPI microservice.

---

## 3. Fastify BFF Endpoint Inventory

### 1. Service Health Check
* **Method**: `GET`
* **Path**: `/api/v1/health`
* **Source**: [`backend/src/routes/health.routes.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/src/routes/health.routes.ts)
* **Auth**: None (Public)
* **Response (200 OK)**:
```json
{
  "status": "ok",
  "timestamp": "2026-08-10T20:30:00.000Z",
  "uptime": 342.15,
  "services": {
    "bff": "healthy",
    "aiGateway": "healthy"
  }
}
```

---

### 2. AI Completion Gateway
* **Method**: `POST`
* **Path**: `/api/v1/ai/chat`
* **Source**: [`backend/src/routes/ai.routes.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/src/routes/ai.routes.ts)
* **Validation Schema**: `chatCompletionRequestSchema` ([`backend/src/schemas/ai.schema.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/src/schemas/ai.schema.ts))

#### Request Body
```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are a senior technical career coach."
    },
    {
      "role": "user",
      "content": "Help me optimize my STAR answer for leadership."
    }
  ],
  "task": "interview_coaching",
  "modelAlias": "career-reasoning",
  "temperature": 0.7,
  "maxTokens": 1000
}
```

#### Response Body (200 OK)
```json
{
  "content": "Here is a structured breakdown of your STAR answer...",
  "provider": "openrouter",
  "model": "anthropic/claude-3.5-sonnet",
  "usage": {
    "promptTokens": 120,
    "completionTokens": 350,
    "totalTokens": 470
  },
  "latencyMs": 845
}
```

---

### 3. AI Workflow & Interview Proxy Endpoints

The Fastify BFF proxies stateful LangGraph workflow requests to the Python FastAPI service.

* **Source File**: [`backend/src/routes/ai-workflow.routes.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/src/routes/ai-workflow.routes.ts)

#### A. Resume Optimization Workflow Proxy
* **Method**: `POST`
* **Path**: `/api/v1/ai/workflows/resume/optimize`
* **Target Microservice**: `POST http://ai-service:8000/workflows/resume/optimize`
* **Request Body**: `{"input_resume": "...", "job_description": "..."}`
* **Response (200 OK)**: `{"success": true, "data": {"ats_score": 88, "parsed_skills": [...], "optimizations": [...], "factuality_passed": true}}`

#### B. Job Skill Gap Analysis Proxy
* **Method**: `POST`
* **Path**: `/api/v1/ai/workflows/job/analyze`
* **Target Microservice**: `POST http://ai-service:8000/workflows/job/analyze`
* **Request Body**: `{"job_description": "..."}`
* **Response (200 OK)**: `{"success": true, "data": {"required_skills": [...], "experience_years": 5}}`

#### C. Career Roadmap Planning Proxy
* **Method**: `POST`
* **Path**: `/api/v1/ai/workflows/career/plan`
* **Target Microservice**: `POST http://ai-service:8000/workflows/career/plan`
* **Request Body**: `{"candidate_profile": "...", "target_role": "Staff Engineer"}`
* **Response (200 OK)**: `{"success": true, "data": {"skill_gaps": [...], "recommended_milestones": [...]}}`

#### D. Interview Questions Generator Proxy
* **Method**: `POST`
* **Path**: `/api/v1/ai/interview/questions`
* **Target Microservice**: `POST http://ai-service:8000/workflows/interview/questions`
* **Validation Schema**: `generateInterviewQuestionsSchema` (`resumeText`, `jobDescription`, `category`, `questionCount`)
* **Response (200 OK)**: `{"success": true, "data": {"questions": [...]}}`

#### E. Personalized STAR Answer Generator Proxy
* **Method**: `POST`
* **Path**: `/api/v1/ai/interview/answer`
* **Target Microservice**: `POST http://ai-service:8000/workflows/interview/answer`
* **Validation Schema**: `generatePersonalizedAnswerSchema` (`resumeText`, `questionText`)
* **Response (200 OK)**: `{"success": true, "data": {"situation": "...", "task": "...", "action": "...", "result": "..."}}`

#### F. Answer Evaluation & STAR Scoring Proxy
* **Method**: `POST`
* **Path**: `/api/v1/ai/interview/evaluate`
* **Target Microservice**: `POST http://ai-service:8000/workflows/interview/evaluate`
* **Validation Schema**: `evaluateInterviewAnswerSchema` (`questionText`, `userAnswer`)
* **Response (200 OK)**: `{"success": true, "data": {"overallScore": 85, "feedback": [...]}}`

#### G. LLM-as-a-Judge Golden Benchmark Proxy
* **Method**: `GET` / `POST`
* **Path**: `/api/v1/ai/evaluation/benchmark`
* **Target Microservice**: `POST http://ai-service:8000/evaluation/benchmark`
* **Response (200 OK)**: `{"success": true, "data": {"factuality_score": 1.0, "ats_alignment": 0.88}}`

#### H. Telemetry Traces Export Proxy
* **Method**: `GET`
* **Path**: `/api/v1/telemetry/traces`
* **Target Microservice**: `GET http://ai-service:8000/telemetry/traces`
* **Response (200 OK)**: `{"success": true, "data": {"spans": [...]}}`

---

### 4. Job Feed Listing
* **Method**: `GET`
* **Path**: `/api/v1/jobs`
* **Source**: [`backend/src/routes/jobs.routes.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/src/routes/jobs.routes.ts)
* **Query Parameters**: `search`, `country`, `seniority`, `workMode`, `employmentType`
* **Response (200 OK)**: Returns list of job matching objects.

---

### 5. Candidate Profile Management
* **Method**: `GET` / `PUT`
* **Path**: `/api/v1/profile`
* **Source**: [`backend/src/routes/profile.routes.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/src/routes/profile.routes.ts)
* **Purpose**: Retrieves or updates candidate preferences, resume profile data, and target roles.

---

### 6. Mock Interview History & Session Persistence
* **Method**: `GET` / `POST`
* **Path**: `/api/v1/interview-history`
* **Source**: [`backend/src/routes/interview-history.routes.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/backend/src/routes/interview-history.routes.ts)
* **Purpose**: Persists mock interview sessions, questions, candidate STAR answers, and evaluation scores.

---

## 4. Python AI Microservice Direct Endpoints

The Python FastAPI microservice executes LangGraph workflow state machines directly on port `8000`.

* **Source File**: [`ai-service/app/main.py`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/ai-service/app/main.py)
* **Authorization**: Enforces internal token header (`x-internal-service-token`).

| Method | Path | Pydantic Input DTO | LangGraph Workflow |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | None | Liveness check |
| `GET` | `/health/ready` | None | Readiness check |
| `POST` | `/workflows/resume/optimize` | `ResumeOptimizeDto` | `resume_workflow_graph` |
| `POST` | `/workflows/job/analyze` | `JobAnalyzeDto` | `job_workflow_graph` |
| `POST` | `/workflows/career/plan` | `CareerPlanDto` | `career_workflow_graph` |
| `POST` | `/workflows/interview/questions` | `InterviewQuestionsDto` | `interview_workflow_graph` |
| `POST` | `/workflows/interview/answer` | `InterviewAnswerDto` | `interview_workflow_graph` |
| `POST` | `/workflows/interview/evaluate` | `InterviewEvaluateDto` | `interview_workflow_graph` |
| `POST` | `/evaluation/benchmark` | None | `llm_judge` Golden Suite |
| `GET` | `/telemetry/traces` | None | `otel_tracer` Span Reader |

---

## 5. Standard Error Envelopes & Status Codes

All Fastify BFF endpoints return standard HTTP status codes and error payloads:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "body/task must be equal to one of the allowed values",
  "requestId": "req-9c8b7a"
}
```

### Status Code Standards
* **`200 OK`**: Request processed successfully.
* **`400 Bad Request`**: Payload failed Zod / Pydantic schema validation.
* **`401 Unauthorized`**: Internal service token missing or invalid.
* **`429 Too Many Requests`**: Client exceeded sliding-window rate limit (100 req/min).
* **`500 Internal Server Error`**: Server-side error.
* **`503 Service Unavailable`**: Upstream AI provider or microservice unreachable.

---

## Related Documentation

- [AI Gateway](./AI-GATEWAY.md)
- [Deployment & DevOps](./DEPLOYMENT.md)
- [Observability & Telemetry](./OBSERVABILITY.md)
- [Performance Engineering](./PERFORMANCE.md)
- [Internationalization](./INTERNATIONALIZATION.md)
