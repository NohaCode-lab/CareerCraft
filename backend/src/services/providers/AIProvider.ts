export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIRequestContract {
  task: string;
  modelAlias?: 'career-fast' | 'career-reasoning' | 'career-private';
  messages: AIMessage[];
  temperature?: number;
  maxTokens?: number;
  metadata?: Record<string, unknown>;
}

export interface AIResponseContract {
  requestId: string;
  model: string;
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason: string;
  providerMetadata?: {
    providerUsed?: string;
    fallbackOccurred?: boolean;
  };
}

export type AIProviderErrorCategory =
  | 'validation'
  | 'authentication'
  | 'authorization'
  | 'rate_limit'
  | 'timeout'
  | 'provider_unavailable'
  | 'server_error'
  | 'unknown';

export class AIProviderError extends Error {
  public category: AIProviderErrorCategory;
  public statusCode: number;

  constructor(message: string, category: AIProviderErrorCategory, statusCode = 500) {
    super(message);
    this.name = 'AIProviderError';
    this.category = category;
    this.statusCode = statusCode;
  }
}

export interface AIProvider {
  readonly name: string;
  generate(request: AIRequestContract, clientRequestId: string): Promise<AIResponseContract>;
}
