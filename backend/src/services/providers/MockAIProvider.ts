import { AIProvider, AIRequestContract, AIResponseContract } from './AIProvider.js';

export class MockAIProvider implements AIProvider {
  public readonly name = 'MockAIProvider';

  public async generate(
    request: AIRequestContract,
    clientRequestId: string
  ): Promise<AIResponseContract> {
    const modelAlias = request.modelAlias || 'career-fast';
    const userPrompt = request.messages.find((m) => m.role === 'user')?.content || '';
    const mockContent = `[CareerCraft AI - ${modelAlias}] Normalized response for task "${request.task}". Prompt length: ${userPrompt.length} chars.`;

    return {
      requestId: clientRequestId,
      model: modelAlias,
      content: mockContent,
      usage: {
        promptTokens: Math.ceil(userPrompt.length / 4) + 20,
        completionTokens: Math.ceil(mockContent.length / 4),
        totalTokens: Math.ceil((userPrompt.length + mockContent.length) / 4) + 20,
      },
      finishReason: 'stop',
      providerMetadata: {
        providerUsed: modelAlias === 'career-private' ? 'Ollama (Mock)' : 'OpenRouter (Mock)',
        fallbackOccurred: false,
      },
    };
  }
}
