import { describe, it, expect } from 'vitest';
import { MockAIProvider } from '../../src/services/providers/MockAIProvider.js';
import { AIProviderError } from '../../src/services/providers/AIProvider.js';
import { AIGatewayService } from '../../src/services/ai-gateway.service.js';
import { loadConfig } from '../../src/app/config.js';

describe('AIProvider & MockAIProvider Unit Test Suite (Phase 3.1)', () => {
  it('1. MockAIProvider correctly exposes name and implements AIProvider interface', () => {
    const provider = new MockAIProvider();
    expect(provider.name).toBe('MockAIProvider');
  });

  it('2. MockAIProvider generates deterministic normalized completions', async () => {
    const provider = new MockAIProvider();
    const result = await provider.generate(
      {
        task: 'CV Resume Check',
        modelAlias: 'career-fast',
        messages: [{ role: 'user', content: 'Improve my bullet points.' }],
      },
      'req_test_123'
    );

    expect(result.requestId).toBe('req_test_123');
    expect(result.model).toBe('career-fast');
    expect(result.content).toContain('CV Resume Check');
    expect(result.finishReason).toBe('stop');
    expect(result.usage.totalTokens).toBeGreaterThan(0);
    expect(result.providerMetadata?.providerUsed).toBe('OpenRouter (Mock)');
  });

  it('3. AIProviderError correctly normalizes error category and status code', () => {
    const rateLimitError = new AIProviderError('Rate limit exceeded', 'rate_limit', 429);
    expect(rateLimitError.name).toBe('AIProviderError');
    expect(rateLimitError.category).toBe('rate_limit');
    expect(rateLimitError.statusCode).toBe(429);
    expect(rateLimitError.message).toBe('Rate limit exceeded');
  });

  it('4. AIGatewayService executes completion via injected AIProvider abstraction', async () => {
    const config = loadConfig({ NODE_ENV: 'test', AI_MOCK_MODE: 'true' });
    const mockProvider = new MockAIProvider();
    const gatewayService = new AIGatewayService(config, mockProvider);

    const response = await gatewayService.executeChatCompletion(
      {
        task: 'Cover Letter Generation',
        modelAlias: 'career-fast',
        messages: [{ role: 'user', content: 'Generate letter for Frontend Developer.' }],
      },
      'client_req_999'
    );

    expect(response.requestId).toBe('client_req_999');
    expect(response.model).toBe('career-fast');
    expect(response.content).toContain('Cover Letter Generation');
  });
});
