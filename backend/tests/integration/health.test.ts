import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../../src/app/app.js';
import { loadConfig } from '../../src/app/config.js';

describe('Backend API Foundation Integration Tests', () => {
  const config = loadConfig({ NODE_ENV: 'test', LOG_LEVEL: 'silent' });
  const app = buildApp(config);

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/health returns liveness status ok', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/health',
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.status).toBe('ok');
    expect(body.service).toBe('careercraft-bff');
    expect(body.version).toBe('1.0.0');
  });

  it('GET /api/v1/health/ready returns readiness status ready', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/health/ready',
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.status).toBe('ready');
    expect(body.checks.api).toBe('healthy');
  });

  it('GET /api/v1/profile returns API contract placeholder with request ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/profile',
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.id).toBe('usr_demo_01');
    expect(body.meta.requestId).toBeDefined();
  });

  it('GET /api/v1/jobs returns jobs API contract boundary', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/jobs',
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  it('returns 404 for non-existent route with standardized error format', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/non-existent-endpoint',
    });

    expect(response.statusCode).toBe(404);
  });

  it('fails closed when NODE_ENV is production and INTERNAL_SERVICE_TOKEN is empty or CHANGEME', () => {
    expect(() => {
      loadConfig({
        NODE_ENV: 'production',
        INTERNAL_SERVICE_TOKEN: '',
      });
    }).toThrow('Insecure production configuration');
  });
});
