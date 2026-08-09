import { AIRequestContract } from '../providers/AIProvider.js';
import { AppConfig } from '../../app/config.js';

export interface AIRoutingDecision {
  providerType: 'openrouter' | 'ollama' | 'mock';
  modelAlias: 'career-fast' | 'career-reasoning' | 'career-private';
  concreteModel: string;
  task: string;
}

export class AIRouter {
  private config: AppConfig;

  constructor(config: AppConfig) {
    this.config = config;
  }

  public route(request: AIRequestContract): AIRoutingDecision {
    const task = request.task || 'general_chat';
    const modelAlias = this.resolveModelAlias(request.task, request.modelAlias);

    // Fast path for AI Mock Mode
    if (this.config.AI_MOCK_MODE) {
      return {
        providerType: 'mock',
        modelAlias,
        concreteModel: modelAlias,
        task,
      };
    }

    switch (modelAlias) {
      case 'career-private':
        return {
          providerType: 'ollama',
          modelAlias: 'career-private',
          concreteModel: process.env.OLLAMA_MODEL || 'qwen2.5:7b-instruct',
          task,
        };

      case 'career-reasoning':
        return {
          providerType: 'openrouter',
          modelAlias: 'career-reasoning',
          concreteModel: process.env.OPENROUTER_REASONING_MODEL || 'anthropic/claude-3.5-sonnet',
          task,
        };

      case 'career-fast':
      default:
        return {
          providerType: 'openrouter',
          modelAlias: 'career-fast',
          concreteModel: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
          task,
        };
    }
  }

  public resolveModelAlias(
    task: string = '',
    explicitAlias?: 'career-fast' | 'career-reasoning' | 'career-private'
  ): 'career-fast' | 'career-reasoning' | 'career-private' {
    if (explicitAlias) {
      return explicitAlias;
    }

    const lowerTask = task.toLowerCase();

    if (
      lowerTask.includes('private') ||
      lowerTask.includes('sensitive') ||
      lowerTask.includes('local')
    ) {
      return 'career-private';
    }

    if (
      lowerTask.includes('reasoning') ||
      lowerTask.includes('optimize') ||
      lowerTask.includes('gap') ||
      lowerTask.includes('eval')
    ) {
      return 'career-reasoning';
    }

    return 'career-fast';
  }
}
