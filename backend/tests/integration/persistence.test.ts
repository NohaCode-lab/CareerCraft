import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../../src/app/app.js';
import { loadConfig } from '../../src/app/config.js';
import { FastifyInstance } from 'fastify';

describe('Phase 9 — Data Layer & Interview Session Persistence Suite', () => {
  const config = loadConfig({ NODE_ENV: 'test', LOG_LEVEL: 'silent' });
  const app: FastifyInstance = buildApp(config);

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('1. GET /api/v1/interview/history returns user interview sessions', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/interview/history?userId=usr_demo_01',
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.history.length).toBeGreaterThan(0);
    expect(body.data.history[0].id).toBe('sess_demo_01');
  });

  it('2. GET /api/v1/interview/session/:id returns detailed session data', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/interview/session/sess_demo_01',
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.session.id).toBe('sess_demo_01');
    expect(body.data.questions.length).toBeGreaterThan(0);
  });

  it('3. POST /api/v1/interview/session/save persists a new interview session', async () => {
    const newSession = {
      session: {
        id: 'sess_test_99',
        userId: 'usr_demo_01',
        jobTitle: 'AI Platform Engineer',
        readinessScore: 88,
        completedAt: new Date().toISOString(),
      },
      questions: [
        {
          id: 'q_test_99',
          sessionId: 'sess_test_99',
          category: 'technical',
          difficulty: 'hard',
          questionText: 'Explain how you trace state transitions in a multi-agent graph.',
          reason: 'LangGraph architecture assessment.',
        },
      ],
      answers: [
        {
          id: 'ans_test_99',
          questionId: 'q_test_99',
          userAnswer: 'I pass traceparent context through state checkpoints.',
        },
      ],
      evaluations: [
        {
          id: 'eval_test_99',
          answerId: 'ans_test_99',
          overallScore: 90,
          relevance: 92,
          clarity: 88,
          structure: 90,
          technicalAccuracy: 92,
          jobAlignment: 90,
          feedback: ['Excellent trace explanation.'],
          improvements: [],
        },
      ],
    };

    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/interview/session/save',
      payload: newSession,
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.session.id).toBe('sess_test_99');
  });
});
