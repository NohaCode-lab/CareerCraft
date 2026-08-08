import { AIGatewayProviderStatus, TelemetryTrace, ProviderType } from '../types';

export class AIGatewayService {
  private activeProvider: ProviderType = 'OpenRouter';
  private activeModel = 'anthropic/claude-3.5-sonnet';

  private providers: AIGatewayProviderStatus[] = [
    {
      provider: 'OpenRouter',
      name: 'OpenRouter Cloud Engine',
      endpoint: 'https://openrouter.ai/api/v1',
      status: 'ONLINE',
      latencyMs: 145,
      modelsAvailable: [
        'anthropic/claude-3.5-sonnet',
        'openai/gpt-4o-mini',
        'google/gemini-1.5-pro'
      ],
      activeModel: 'anthropic/claude-3.5-sonnet',
      isLocal: false,
      costPer1kTokensUsd: 0.003
    },
    {
      provider: 'Ollama',
      name: 'Ollama Local Engine',
      endpoint: 'http://localhost:11434/api',
      status: 'ONLINE',
      latencyMs: 42,
      modelsAvailable: [
        'qwen2.5:7b-instruct',
        'llama3.2:3b',
        'deepseek-r1:7b'
      ],
      activeModel: 'qwen2.5:7b-instruct',
      isLocal: true,
      costPer1kTokensUsd: 0.000
    }
  ];

  private traces: TelemetryTrace[] = [
    {
      id: 'trc_901',
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toLocaleTimeString(),
      workflowName: 'ResumeIntelligenceWorkflow',
      stepName: 'ExtractSkillsNode',
      providerUsed: 'Ollama',
      modelUsed: 'qwen2.5:7b-instruct',
      latencyMs: 340,
      promptTokens: 820,
      completionTokens: 210,
      estimatedCostUsd: 0.000,
      fallbackOccurred: false,
      guardrailStatus: 'PASSED'
    },
    {
      id: 'trc_902',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toLocaleTimeString(),
      workflowName: 'ResumeTailoringWorkflow',
      stepName: 'TailorAchievementBulletsNode',
      providerUsed: 'OpenRouter',
      modelUsed: 'anthropic/claude-3.5-sonnet',
      latencyMs: 890,
      promptTokens: 1450,
      completionTokens: 460,
      estimatedCostUsd: 0.00573,
      fallbackOccurred: false,
      guardrailStatus: 'PASSED'
    },
    {
      id: 'trc_903',
      timestamp: new Date(Date.now() - 1000 * 60 * 12).toLocaleTimeString(),
      workflowName: 'JobMatchingWorkflow',
      stepName: 'SeniorityGapAnalysisNode',
      providerUsed: 'OpenRouter',
      modelUsed: 'google/gemini-1.5-pro',
      latencyMs: 1120,
      promptTokens: 1890,
      completionTokens: 320,
      estimatedCostUsd: 0.00331,
      fallbackOccurred: true,
      guardrailStatus: 'PASSED'
    }
  ];

  public getProviders(): AIGatewayProviderStatus[] {
    return this.providers;
  }

  public getActiveProvider(): ProviderType {
    return this.activeProvider;
  }

  public getActiveModel(): string {
    return this.activeModel;
  }

  public setActiveProvider(provider: ProviderType, model?: string): void {
    this.activeProvider = provider;
    if (model) {
      this.activeModel = model;
    } else {
      const p = this.providers.find(item => item.provider === provider);
      if (p) this.activeModel = p.modelsAvailable[0];
    }
  }

  public getTelemetryTraces(): TelemetryTrace[] {
    return this.traces;
  }

  public recordTelemetry(trace: Omit<TelemetryTrace, 'id' | 'timestamp'>): TelemetryTrace {
    const newTrace: TelemetryTrace = {
      ...trace,
      id: `trc_${Math.floor(Math.random() * 9000 + 1000)}`,
      timestamp: new Date().toLocaleTimeString()
    };
    this.traces.unshift(newTrace);
    return newTrace;
  }
}

export const aiGateway = new AIGatewayService();
