# CareerCraft Backend BFF (Backend-for-Frontend)

## 📌 1. Purpose & Overview

The **CareerCraft Backend BFF** is a high-performance, secure, and type-safe Node.js & TypeScript service built with **Fastify**. It serves as the primary Backend-for-Frontend boundary for the CareerCraft platform, managing API routing, security headers, rate limiting, request validation, and structured Pino logging.

---

## 🏗️ 2. Architecture & Folder Structure

```text
backend/
├── src/
│   ├── app/
│   │   ├── app.ts            # Fastify application factory (buildApp)
│   │   └── config.ts         # Zod-validated environment configuration loader
│   ├── errors/
│   │   └── app-error.ts      # Custom error types & standardized error formatter
│   ├── routes/
│   │   ├── index.ts          # Unified /api/v1 API router
│   │   ├── health.routes.ts  # Health (liveness/readiness) endpoints
│   │   ├── profile.routes.ts # Candidate profile API contract boundary
│   │   └── jobs.routes.ts    # Job search API contract boundary
│   └── server.ts             # Server listener & graceful shutdown handlers
├── tests/
│   └── integration/
│       └── health.test.ts    # Fastify API integration tests
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 🚀 3. Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run in development mode (hot-reloading via tsx)
npm run dev

# 3. Execute Vitest test suite
npm run test

# 4. Build for production (TypeScript compiler)
npm run build

# 5. Start production server
npm start
```

---

## ⚙️ 4. Environment Variables

Environment configuration is validated at process startup via `Zod`. See `.env.example`:

| Variable | Default | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `development` | Environment mode (`development`, `test`, `production`) |
| `PORT` | `4000` | HTTP port |
| `HOST` | `127.0.0.1` | Network bind address |
| `LOG_LEVEL` | `info` | Pino log level (`info`, `debug`, `error`) |
| `CORS_ORIGIN` | `http://localhost:5173` | Allowed CORS origin |
| `RATE_LIMIT_MAX` | `100` | Max requests per minute per IP |

---

## 🌐 5. API Endpoints & Versioning

All public endpoints are versioned under `/api/v1`:

- **`GET /api/v1/health`**: Liveness check returning HTTP 200 OK and service status.
- **`GET /api/v1/health/ready`**: Readiness check inspecting infrastructure availability.
- **`GET /api/v1/profile`**: Candidate profile API contract boundary.
- **`GET /api/v1/jobs`**: Job search API contract boundary.

---

## 🔒 6. Security & Observability Model

- **Security Headers**: `@fastify/helmet` enforces security headers (CSP, HSTS, X-Frame-Options).
- **CORS Protection**: Restricted to configured frontend origin (`http://localhost:5173`).
- **Rate Limiting**: `@fastify/rate-limit` enforces sliding-window request limits (100 req/min).
- **Request IDs**: Every incoming request receives a unique `x-request-id` header (`req_...`).
- **Structured Logging**: `pino` outputs structured JSON logs with request IDs.

---

## 🔮 7. Future Integration Boundaries

1. **Database Boundary**: Future PostgreSQL / Supabase integration will connect via a repository pattern without modifying Fastify route definitions.
2. **AI Service Boundary**: Future LangGraph / LiteLLM integration will be invoked through dedicated HTTP/gRPC client services from the Python AI microservice, keeping LLM secrets strictly isolated on the backend.
