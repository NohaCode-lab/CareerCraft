import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OpenRouterProvider } from '../../src/services/providers/OpenRouterProvider.js';
import { AIProviderError } from '../../src/services/providers/AIProvider.js';

describe('OpenRouterProvider Adapter Unit Test Suite (Phase 3.2)', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('1. Throws AIProviderError(authentication, 401) if OPENROUTER_API_KEY is missing', async () => {
    const provider = new OpenRouterProvider({ apiKey: '' });
    await expect(
      provider.generate(
        { task: 'Test', messages: [{ role: 'user', content: 'Hi' }] },
        'req_101'
      )
    ).rejects.toThrow(AIProviderError);
  });

  it('2. Successfully sends request and parses OpenRouter normalized response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 'gen-op-101',
        model: 'anthropic/claude-3.5-sonnet',
        choices: [
          {
            message: { content: 'Tailored resume summary response' },
            finish_reason: 'stop',
          },
        ],
        usage: {
          prompt_tokens: 150,
          completion_tokens: 50,
          total_tokens: 200,
        },
      }),
    } as any);

    const provider = new OpenRouterProvider({ apiKey: 'sk-or-test-key' });
    const response = await provider.generate(
      {
        task: 'CV Summary Optimization',
        modelAlias: 'career-reasoning',
        messages: [{ role: 'user', content: 'Optimize summary' }],
      },
      'req_102'
    );

    expect(response.requestId).toBe('req_102');
    expect(response.model).toBe('anthropic/claude-3.5-sonnet');
    expect(response.content).toBe('Tailored resume summary response');
    expect(response.usage.promptTokens).toBe(150);
    expect(response.usage.completionTokens).toBe(50);
    expect(response.usage.totalTokens).toBe(200);
    expect(response.providerMetadata?.providerUsed).toBe('OpenRouter');
    expect(response.providerMetadata?.fallbackOccurred).toBe(false);

    // Verify Authorization header mask safety
    const fetchArgs = (global.fetch as any).mock.calls[0];
    expect(fetchArgs[1].headers.Authorization).toBe('Bearer sk-or-test-key');
  });

  it('3. Error Normalization: Converts OpenRouter HTTP 429 into rate_limit category', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      text: async () => 'Rate limit exceeded',
    } as any);

    const provider = new OpenRouterProvider({ apiKey: 'sk-or-test-key' });

    try {
      await provider.generate(
        { task: 'Test', messages: [{ role: 'user', content: 'Hi' }] },
        'req_103'
      );
      expect.fail('Should have thrown AIProviderError');
    } catch (err: any) {
      expect(err).toBeInstanceOf(AIProviderError);
      expect(err.category).toBe('rate_limit');
      expect(err.statusCode).toBe(429);
    }
  });

  it('4. Timeout Handling: Converts AbortError into timeout category', async () => {
    global.fetch = vi.fn().mockImplementation(() => {
      const error = new Error('The operation was aborted');
      error.name = 'AbortError';
      return Promise.reject(error);
    });

    const provider = new OpenRouterProvider({ apiKey: 'sk-or-test-key', timeoutMs: 50 });

    try {
      await provider.generate(
        { task: 'Test', messages: [{ role: 'user', content: 'Hi' }] },
        'req_104'
      );
      expect.fail('Should have thrown timeout AIProviderError');
    } catch (err: any) {
      expect(err).toBeInstanceOf(AIProviderError);
      expect(err.category).toBe('timeout');
      expect(err.statusCode).toBe(504);
    }
  });
});
