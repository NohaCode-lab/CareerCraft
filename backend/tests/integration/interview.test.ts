import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../../src/app/app.js';
import { loadConfig } from '../../src/app/config.js';

describe('AI Interview Preparation Endpoints Integration Suite', () => {
  const config = loadConfig({ NODE_ENV: 'test', LOG_LEVEL: 'silent' });
  const app = buildApp(config);

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('1. POST /api/v1/ai/interview/questions generates structured questions', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/ai/interview/questions',
      payload: {
        resumeText: 'Frontend Developer with React, TypeScript, and Fastify experience.',
        jobDescription: 'Seeking Senior Engineer to build React components and Node.js APIs.',
        category: 'technical',
        questionCount: 3,
      },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.questions).toBeDefined();
    expect(body.data.questions.length).toBeGreaterThan(0);
    expect(body.data.questions[0].category).toBe('technical');
  });

  it('2. POST /api/v1/ai/interview/answer returns STAR structured answer', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/ai/interview/answer',
      payload: {
        resumeText: 'Fullstack engineer with Fastify and React background.',
        questionText: 'How do you prevent performance bottlenecks in React components?',
      },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.framework).toBe('STAR');
    expect(body.data.situation).toBeDefined();
    expect(body.data.action).toBeDefined();
  });

  it('3. POST /api/v1/ai/interview/evaluate evaluates user answer with scores', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/ai/interview/evaluate',
      payload: {
        questionText: 'How do you handle production API errors?',
        userAnswer: 'I implement structured logging using Pino, sanitize error responses in production, and correlate requests with IDs.',
      },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.overallScore).toBeGreaterThanOrEqual(50);
    expect(body.data.feedback).toBeDefined();
  });

  it('4. Rejects invalid payload missing required fields', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/ai/interview/questions',
      payload: {},
    });

    expect(response.statusCode).toBe(400);
    const body = response.json();
    expect(body.error.code).toBe('VALIDATION_ERROR');
  });
});
