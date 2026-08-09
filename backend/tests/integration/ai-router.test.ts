import { describe, it, expect } from 'vitest';
import { AIRouter } from '../../src/services/routing/AIRouter.js';
import { AIGatewayService } from '../../src/services/ai-gateway.service.js';
import { loadConfig } from '../../src/app/config.js';

describe('AIRouter Task-Based Model Routing & Alias Mapping Suite (Phase 3.3)', () => {
  it('1. career-fast alias routes deterministically to OpenRouter fast model in production config', () => {
    const config = loadConfig({ NODE_ENV: 'production', AI_MOCK_MODE: 'false' });
    const router = new AIRouter(config);

    const decision = router.route({
      task: 'General Chat',
      modelAlias: 'career-fast',
      messages: [{ role: 'user', content: 'Hello' }],
    });

    expect(decision.providerType).toBe('openrouter');
    expect(decision.modelAlias).toBe('career-fast');
    expect(decision.concreteModel).toBe('openai/gpt-4o-mini');
  });

  it('2. career-reasoning alias routes deterministically to OpenRouter reasoning model in production config', () => {
    const config = loadConfig({ NODE_ENV: 'production', AI_MOCK_MODE: 'false' });
    const router = new AIRouter(config);

    const decision = router.route({
      task: 'ATS Gap Analysis',
      modelAlias: 'career-reasoning',
      messages: [{ role: 'user', content: 'Analyze skill gaps' }],
    });

    expect(decision.providerType).toBe('openrouter');
    expect(decision.modelAlias).toBe('career-reasoning');
    expect(decision.concreteModel).toBe('anthropic/claude-3.5-sonnet');
  });

  it('3. career-private alias routes deterministically to local Ollama model in production config', () => {
    const config = loadConfig({ NODE_ENV: 'production', AI_MOCK_MODE: 'false' });
    const router = new AIRouter(config);

    const decision = router.route({
      task: 'Private Resume Processing',
      modelAlias: 'career-private',
      messages: [{ role: 'user', content: 'Candidate PII' }],
    });

    expect(decision.providerType).toBe('ollama');
    expect(decision.modelAlias).toBe('career-private');
    expect(decision.concreteModel).toBe('qwen2.5:7b-instruct');
  });

  it('4. Implicit Task Mapping: Automatically infers alias when modelAlias is omitted', () => {
    const config = loadConfig({ NODE_ENV: 'production', AI_MOCK_MODE: 'false' });
    const router = new AIRouter(config);

    expect(router.resolveModelAlias('resume_optimize')).toBe('career-reasoning');
    expect(router.resolveModelAlias('sensitive_private_data')).toBe('career-private');
    expect(router.resolveModelAlias('cover_letter_chat')).toBe('career-fast');
  });

  it('5. Test/CI Config: Routes cleanly to mock provider without network calls', () => {
    const config = loadConfig({ NODE_ENV: 'test', AI_MOCK_MODE: 'true' });
    const router = new AIRouter(config);

    const decision = router.route({
      task: 'Test Execution',
      modelAlias: 'career-fast',
      messages: [{ role: 'user', content: 'Test' }],
    });

    expect(decision.providerType).toBe('mock');
  });

  it('6. AIGatewayService executes completion via AIRouter routing decision', async () => {
    const config = loadConfig({ NODE_ENV: 'test', AI_MOCK_MODE: 'true' });
    const gatewayService = new AIGatewayService(config);

    const response = await gatewayService.executeChatCompletion(
      {
        task: 'Interview Question Generation',
        modelAlias: 'career-fast',
        messages: [{ role: 'user', content: 'Generate React questions' }],
      },
      'req_router_666'
    );

    expect(response.requestId).toBe('req_router_666');
    expect(response.model).toBe('career-fast');
    expect(response.providerMetadata?.providerUsed).toContain('OpenRouter');
  });
});
