import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../../src/app/app.js';
import { loadConfig } from '../../src/app/config.js';
import { FastifyInstance } from 'fastify';

describe('OpenTelemetry Tracing & Telemetry Integration Suite', () => {
  const config = loadConfig({ NODE_ENV: 'test', LOG_LEVEL: 'silent' });
  const app: FastifyInstance = buildApp(config);

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('1. GET /api/v1/telemetry/traces returns telemetry spans health report', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/telemetry/traces',
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.status).toBe('healthy');
    expect(body.data.recentSpans).toBeDefined();
  });
});
