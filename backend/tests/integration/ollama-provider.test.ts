import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OllamaProvider } from '../../src/services/providers/OllamaProvider.js';
import { AIProviderError } from '../../src/services/providers/AIProvider.js';

describe('OllamaProvider Adapter Unit Test Suite (Phase 3.2)', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('1. Successfully constructs non-streaming payload and normalizes Ollama response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        model: 'qwen2.5:7b-instruct',
        message: { content: 'Private local candidate analysis' },
        done_reason: 'stop',
        prompt_eval_count: 120,
        eval_count: 40,
      }),
    } as any);

    const provider = new OllamaProvider({ baseUrl: 'http://127.0.0.1:11434' });
    const response = await provider.generate(
      {
        task: 'Private Resume Parsing',
        modelAlias: 'career-private',
        messages: [{ role: 'user', content: 'Parse candidate summary' }],
      },
      'req_ollama_201'
    );

    expect(response.requestId).toBe('req_ollama_201');
    expect(response.model).toBe('qwen2.5:7b-instruct');
    expect(response.content).toBe('Private local candidate analysis');
    expect(response.usage.promptTokens).toBe(120);
    expect(response.usage.completionTokens).toBe(40);
    expect(response.usage.totalTokens).toBe(160);
    expect(response.providerMetadata?.providerUsed).toBe('Ollama');

    // Verify non-streaming stream: false payload
    const fetchArgs = (global.fetch as any).mock.calls[0];
    const payload = JSON.parse(fetchArgs[1].body);
    expect(payload.stream).toBe(false);
  });

  it('2. Error Normalization: Converts Ollama HTTP 404 into validation category', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => 'Model qwen2.5:7b-instruct not found',
    } as any);

    const provider = new OllamaProvider();

    try {
      await provider.generate(
        { task: 'Test', messages: [{ role: 'user', content: 'Hi' }] },
        'req_ollama_202'
      );
      expect.fail('Should have thrown AIProviderError');
    } catch (err: any) {
      expect(err).toBeInstanceOf(AIProviderError);
      expect(err.category).toBe('validation');
      expect(err.statusCode).toBe(404);
    }
  });

  it('3. Provider Unavailable: Normalizes network connection refused into provider_unavailable category', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('connect ECONNREFUSED 127.0.0.1:11434'));

    const provider = new OllamaProvider();

    try {
      await provider.generate(
        { task: 'Test', messages: [{ role: 'user', content: 'Hi' }] },
        'req_ollama_203'
      );
      expect.fail('Should have thrown AIProviderError');
    } catch (err: any) {
      expect(err).toBeInstanceOf(AIProviderError);
      expect(err.category).toBe('provider_unavailable');
      expect(err.statusCode).toBe(503);
    }
  });
});
