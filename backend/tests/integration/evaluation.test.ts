import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../../src/app/app.js';
import { loadConfig } from '../../src/app/config.js';
import { FastifyInstance } from 'fastify';

describe('AI Evaluation & Golden Benchmark Integration Suite', () => {
  const config = loadConfig({ NODE_ENV: 'test', LOG_LEVEL: 'silent' });
  const app: FastifyInstance = buildApp(config);

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('1. POST /api/v1/ai/evaluation/benchmark triggers full evaluation benchmark scan', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/ai/evaluation/benchmark',
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.benchmark_status).toBe('PASS');
    expect(body.data.average_factuality_score).toBe(100.0);
    expect(body.data.average_overall_quality_score).toBeGreaterThanOrEqual(85.0);
  });
});
