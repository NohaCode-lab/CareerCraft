import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AIGatewayService } from '../../src/services/ai-gateway.service.js';
import { ResiliencePolicy } from '../../src/services/resilience/ResiliencePolicy.js';
import { AIProviderError, AIProvider, AIRequestContract, AIResponseContract } from '../../src/services/providers/AIProvider.js';
import { loadConfig } from '../../src/app/config.js';

class FailingMockProvider implements AIProvider {
  public name: string;
  public callCount = 0;
  public errorToThrow: Error;

  constructor(name: string, errorToThrow: Error) {
    this.name = name;
    this.errorToThrow = errorToThrow;
  }

  public async generate(request: AIRequestContract, clientRequestId: string): Promise<AIResponseContract> {
    this.callCount++;
    throw this.errorToThrow;
  }
}

class SuccessMockProvider implements AIProvider {
  public name: string;
  public callCount = 0;
  public returnContent: string;

  constructor(name: string, returnContent = 'Success Response') {
    this.name = name;
    this.returnContent = returnContent;
  }

  public async generate(request: AIRequestContract, clientRequestId: string): Promise<AIResponseContract> {
    this.callCount++;
    return {
      requestId: clientRequestId,
      model: request.modelAlias || 'career-fast',
      content: this.returnContent,
      usage: { promptTokens: 10, completionTokens: 10, totalTokens: 20 },
      finishReason: 'stop',
      providerMetadata: { providerUsed: this.name, fallbackOccurred: false },
    };
  }
}

describe('AI Gateway Provider Resilience, Circuit Breaker & Fallback Suite (Phase 3.4)', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it('1. Test 1 — Successful Primary Provider returns fallbackOccurred = false', async () => {
    const config = loadConfig({ NODE_ENV: 'test', AI_MOCK_MODE: 'true' });
    const gateway = new AIGatewayService(config);

    const response = await gateway.executeChatCompletion(
      { task: 'General Chat', modelAlias: 'career-fast', messages: [{ role: 'user', content: 'Hi' }] },
      'req_resilience_01'
    );

    expect(response.providerMetadata?.fallbackOccurred).toBe(false);
  });

  it('2. Test 2 — Timeout causes bounded execution and fallback', async () => {
    const config = loadConfig({ NODE_ENV: 'production', AI_MOCK_MODE: 'false' });
    const policy = new ResiliencePolicy({ timeoutMs: 30000 });
    const timeoutError = new AIProviderError('Gateway request timeout', 'timeout', 504);
    
    const primary = new FailingMockProvider('openrouter', timeoutError);
    const fallback = new SuccessMockProvider('ollama', 'Fallback after timeout');

    const gateway = new AIGatewayService(config, primary, undefined, policy);
    (gateway as any).providerRegistry.set('openrouter', primary);
    (gateway as any).providerRegistry.set('ollama', fallback);

    const response = await gateway.executeChatCompletion(
      { task: 'General Chat', modelAlias: 'career-fast', messages: [{ role: 'user', content: 'Hi' }] },
      'req_resilience_02'
    );

    expect(response.content).toBe('Fallback after timeout');
    expect(response.providerMetadata?.fallbackOccurred).toBe(true);
  });

  it('3. Test 3 — HTTP 429 Rate Limit causes 0 retries and immediate fallback', async () => {
    const config = loadConfig({ NODE_ENV: 'production', AI_MOCK_MODE: 'false' });
    const policy = new ResiliencePolicy({ maxRetries: 1 });
    const rateLimitError = new AIProviderError('Rate limit', 'rate_limit', 429);

    const primary = new FailingMockProvider('openrouter', rateLimitError);
    const fallback = new SuccessMockProvider('ollama', 'Fallback after 429');

    const gateway = new AIGatewayService(config, primary, undefined, policy);
    (gateway as any).providerRegistry.set('openrouter', primary);
    (gateway as any).providerRegistry.set('ollama', fallback);

    const response = await gateway.executeChatCompletion(
      { task: 'General Chat', modelAlias: 'career-fast', messages: [{ role: 'user', content: 'Hi' }] },
      'req_resilience_03'
    );

    expect(primary.callCount).toBe(1); // Exactly 1 call (0 retries)
    expect(fallback.callCount).toBe(1);
    expect(response.providerMetadata?.fallbackOccurred).toBe(true);
  });

  it('4. Test 4 — HTTP 500 Server Error executes 1 retry before fallback', async () => {
    const config = loadConfig({ NODE_ENV: 'production', AI_MOCK_MODE: 'false' });
    const policy = new ResiliencePolicy({ maxRetries: 1 });
    const serverError = new AIProviderError('Server error', 'server_error', 500);

    const primary = new FailingMockProvider('openrouter', serverError);
    const fallback = new SuccessMockProvider('ollama', 'Fallback after 500');

    const gateway = new AIGatewayService(config, primary, undefined, policy);
    (gateway as any).providerRegistry.set('openrouter', primary);
    (gateway as any).providerRegistry.set('ollama', fallback);

    const response = await gateway.executeChatCompletion(
      { task: 'General Chat', modelAlias: 'career-fast', messages: [{ role: 'user', content: 'Hi' }] },
      'req_resilience_04'
    );

    expect(primary.callCount).toBe(2); // 1 initial + 1 retry
    expect(fallback.callCount).toBe(1);
    expect(response.providerMetadata?.fallbackOccurred).toBe(true);
  });

  it('5. Test 5 — Authentication Failure (401) executes 0 retries', async () => {
    const policy = new ResiliencePolicy();
    const authError = new AIProviderError('Invalid API Key', 'authentication', 401);
    expect(policy.isRetryableError(authError)).toBe(false);
  });

  it('6. Test 6 — Validation Error (400) executes 0 retries', async () => {
    const policy = new ResiliencePolicy();
    const valError = new AIProviderError('Bad request payload', 'validation', 400);
    expect(policy.isRetryableError(valError)).toBe(false);
  });

  it('7. Test 7 — Consecutive transient failures trip circuit to OPEN state', async () => {
    const policy = new ResiliencePolicy({ circuitBreakerOptions: { failureThreshold: 3, cooldownMs: 30000 } });
    const cb = policy.circuitBreaker;

    cb.recordFailure('openrouter', true);
    cb.recordFailure('openrouter', true);
    expect(cb.getState('openrouter')).toBe('CLOSED');

    cb.recordFailure('openrouter', true);
    expect(cb.getState('openrouter')).toBe('OPEN');
  });

  it('8. Test 8 — OPEN circuit state bypasses primary provider execution', async () => {
    const config = loadConfig({ NODE_ENV: 'production', AI_MOCK_MODE: 'false' });
    const policy = new ResiliencePolicy({ circuitBreakerOptions: { failureThreshold: 3, cooldownMs: 30000 } });
    const cb = policy.circuitBreaker;

    // Trip circuit to OPEN
    cb.recordFailure('openrouter', true);
    cb.recordFailure('openrouter', true);
    cb.recordFailure('openrouter', true);
    expect(cb.getState('openrouter')).toBe('OPEN');

    const primary = new FailingMockProvider('openrouter', new AIProviderError('500', 'server_error', 500));
    const fallback = new SuccessMockProvider('ollama', 'Primary bypassed');

    const gateway = new AIGatewayService(config, primary, undefined, policy);
    (gateway as any).providerRegistry.set('openrouter', primary);
    (gateway as any).providerRegistry.set('ollama', fallback);

    const response = await gateway.executeChatCompletion(
      { task: 'General Chat', modelAlias: 'career-fast', messages: [{ role: 'user', content: 'Hi' }] },
      'req_resilience_08'
    );

    expect(primary.callCount).toBe(0); // Bypassed primary entirely
    expect(fallback.callCount).toBe(1);
    expect(response.content).toBe('Primary bypassed');
  });

  it('9. Test 9 — Half-Open Probe Recovery resets circuit state to CLOSED upon success', async () => {
    const policy = new ResiliencePolicy({ circuitBreakerOptions: { failureThreshold: 3, cooldownMs: 100 } });
    const cb = policy.circuitBreaker;

    cb.recordFailure('openrouter', true);
    cb.recordFailure('openrouter', true);
    cb.recordFailure('openrouter', true);
    expect(cb.getState('openrouter')).toBe('OPEN');

    // Wait for cooldown
    await new Promise((r) => setTimeout(r, 110));
    expect(cb.getState('openrouter')).toBe('HALF_OPEN');

    cb.recordSuccess('openrouter');
    expect(cb.getState('openrouter')).toBe('CLOSED');
  });

  it('10. Test 10 — Half-Open Probe Failure re-trips circuit to OPEN state', async () => {
    const policy = new ResiliencePolicy({ circuitBreakerOptions: { failureThreshold: 3, cooldownMs: 100 } });
    const cb = policy.circuitBreaker;

    cb.recordFailure('openrouter', true);
    cb.recordFailure('openrouter', true);
    cb.recordFailure('openrouter', true);
    expect(cb.getState('openrouter')).toBe('OPEN');

    await new Promise((r) => setTimeout(r, 110));
    expect(cb.getState('openrouter')).toBe('HALF_OPEN');

    cb.recordFailure('openrouter', true);
    expect(cb.getState('openrouter')).toBe('OPEN');
  });

  it('11. Test 11 — Fallback Success returns fallbackOccurred = true', async () => {
    const config = loadConfig({ NODE_ENV: 'production', AI_MOCK_MODE: 'false' });
    const policy = new ResiliencePolicy();
    const primary = new FailingMockProvider('openrouter', new AIProviderError('503 Service Unavailable', 'provider_unavailable', 503));
    const fallback = new SuccessMockProvider('ollama', 'Fallback Output');

    const gateway = new AIGatewayService(config, primary, undefined, policy);
    (gateway as any).providerRegistry.set('openrouter', primary);
    (gateway as any).providerRegistry.set('ollama', fallback);

    const response = await gateway.executeChatCompletion(
      { task: 'Cover Letter', modelAlias: 'career-fast', messages: [{ role: 'user', content: 'Gen' }] },
      'req_resilience_11'
    );

    expect(response.providerMetadata?.fallbackOccurred).toBe(true);
  });

  it('12. Test 12 — Primary and Fallback double failure throws normalized error gracefully without unhandled rejection', async () => {
    const config = loadConfig({ NODE_ENV: 'production', AI_MOCK_MODE: 'false' });
    const policy = new ResiliencePolicy();
    const primary = new FailingMockProvider('openrouter', new AIProviderError('500 Server Error', 'server_error', 500));
    const fallback = new FailingMockProvider('ollama', new AIProviderError('503 Service Unavailable', 'provider_unavailable', 503));

    const gateway = new AIGatewayService(config, primary, undefined, policy);
    (gateway as any).providerRegistry.set('openrouter', primary);
    (gateway as any).providerRegistry.set('ollama', fallback);

    await expect(
      gateway.executeChatCompletion(
        { task: 'Cover Letter', modelAlias: 'career-fast', messages: [{ role: 'user', content: 'Gen' }] },
        'req_resilience_12'
      )
    ).rejects.toThrow(AIProviderError);
  });
});
