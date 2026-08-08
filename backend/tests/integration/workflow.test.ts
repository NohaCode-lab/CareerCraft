import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../../src/app/app.js';
import { loadConfig } from '../../src/app/config.js';

describe('LangGraph Workflow Integration Tests (BFF -> Python AI Service Boundary)', () => {
  const config = loadConfig({ NODE_ENV: 'test', LOG_LEVEL: 'silent', AI_MOCK_MODE: 'true' });
  const app = buildApp(config);

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /api/v1/ai/workflows/resume/optimize returns LangGraph resume optimization response', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/ai/workflows/resume/optimize',
      payload: {
        input_resume: 'Senior Staff Engineer with 8 years experience in React, TypeScript, and Node.js.',
        job_description: 'Looking for AI Systems Architect skilled in FastAPI and LangGraph.',
      },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.ats_score).toBeGreaterThan(0);
    expect(body.data.factuality_passed).toBe(true);
    expect(body.data.optimizations.length).toBeGreaterThan(0);
  });

  it('POST /api/v1/ai/workflows/job/analyze returns job requirement analysis response', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/ai/workflows/job/analyze',
      payload: {
        job_description: 'Staff Engineer React TypeScript LangGraph Fastify.',
      },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.required_skills.length).toBeGreaterThan(0);
  });

  it('POST /api/v1/ai/workflows/career/plan returns career path roadmap response', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/ai/workflows/career/plan',
      payload: {
        candidate_profile: 'Senior Staff Engineer',
        target_role: 'AI Systems Architect',
      },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.recommended_milestones.length).toBeGreaterThan(0);
  });

  it('POST /api/v1/ai/workflows/resume/optimize rejects missing fields with 400 VALIDATION_ERROR', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/ai/workflows/resume/optimize',
      payload: {},
    });

    expect(response.statusCode).toBe(400);
    const body = response.json();
    expect(body.error.code).toBe('VALIDATION_ERROR');
  });
});
