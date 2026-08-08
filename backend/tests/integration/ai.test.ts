import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../../src/app/app.js';
import { loadConfig } from '../../src/app/config.js';

describe('AI Gateway API Integration Tests', () => {
  const config = loadConfig({ NODE_ENV: 'test', LOG_LEVEL: 'silent', AI_MOCK_MODE: 'true' });
  const app = buildApp(config);

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /api/v1/ai/chat with valid payload returns normalized AI completion response', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/ai/chat',
      payload: {
        task: 'Resume Enhancement Recommendation',
        modelAlias: 'career-fast',
        messages: [
          { role: 'system', content: 'You are a career expert.' },
          { role: 'user', content: 'Improve my React lead bullet points.' },
        ],
        temperature: 0.7,
        maxTokens: 500,
      },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.model).toBe('career-fast');
    expect(body.data.content).toContain('CareerCraft AI');
    expect(body.data.requestId).toBeDefined();
    expect(body.data.usage.promptTokens).toBeGreaterThan(0);
  });

  it('POST /api/v1/ai/chat with career-private model alias executes privacy-first routing', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/ai/chat',
      payload: {
        task: 'Private Skill Extraction',
        modelAlias: 'career-private',
        messages: [
          { role: 'user', content: 'Extract skills from text.' },
        ],
      },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.model).toBe('career-private');
    expect(body.data.providerMetadata.providerUsed).toContain('Ollama');
  });

  it('POST /api/v1/ai/chat rejects invalid payload with HTTP 400 VALIDATION_ERROR', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/ai/chat',
      payload: {
        task: '', // empty task fails validation
        messages: [],
      },
    });

    expect(response.statusCode).toBe(400);
    const body = response.json();
    expect(body.error.code).toBe('VALIDATION_ERROR');
    expect(body.error.requestId).toBeDefined();
  });
});
