import { AppConfig } from '../app/config.js';
import { AppError } from '../errors/app-error.js';

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

export class AIGatewayService {
  private config: AppConfig;

  constructor(config: AppConfig) {
    this.config = config;
  }

  public async executeChatCompletion(
    request: AIRequestContract,
    clientRequestId: string
  ): Promise<AIResponseContract> {
    const modelAlias = request.modelAlias || 'career-fast';
    const temperature = request.temperature ?? 0.7;
    const maxTokens = request.maxTokens ?? 1000;

    // Fast path for AI Mock Mode (used in offline dev / CI test runs)
    if (this.config.AI_MOCK_MODE || this.config.NODE_ENV === 'test') {
      return this.generateMockCompletion(modelAlias, request, clientRequestId);
    }

    const payload = {
      model: modelAlias,
      messages: request.messages,
      temperature,
      max_tokens: maxTokens,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    try {
      const response = await fetch(`${this.config.LITELLM_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.config.LITELLM_MASTER_KEY}`,
          'x-request-id': clientRequestId,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        await this.handleGatewayErrorStatus(response.status, response);
      }

      const data = (await response.json()) as {
        id?: string;
        model?: string;
        choices?: Array<{
          message?: { content?: string };
          finish_reason?: string;
        }>;
        usage?: {
          prompt_tokens?: number;
          completion_tokens?: number;
          total_tokens?: number;
        };
      };

      const choice = data.choices?.[0];
      const content = choice?.message?.content || '';

      return {
        requestId: clientRequestId,
        model: data.model || modelAlias,
        content,
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0,
        },
        finishReason: choice?.finish_reason || 'stop',
        providerMetadata: {
          providerUsed: modelAlias.includes('private') ? 'Ollama' : 'OpenRouter',
          fallbackOccurred: false,
        },
      };
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      if (error instanceof AppError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new AppError('AI Gateway request timed out', 504, 'GATEWAY_TIMEOUT');
      }

      // If gateway is unreachable in dev mode, gracefully fall back to mock completion
      if (this.config.NODE_ENV === 'development') {
        return this.generateMockCompletion(modelAlias, request, clientRequestId);
      }

      throw new AppError('Failed to communicate with AI Gateway', 502, 'BAD_GATEWAY');
    }
  }

  private async handleGatewayErrorStatus(status: number, response: Response): Promise<never> {
    let errorText = '';
    try {
      errorText = await response.text();
    } catch {
      errorText = 'No response body';
    }

    if (status === 401) {
      throw new AppError('AI Gateway authentication failure', 401, 'UNAUTHORIZED');
    }
    if (status === 403) {
      throw new AppError('AI Gateway access denied', 403, 'FORBIDDEN');
    }
    if (status === 429) {
      throw new AppError('AI rate limit exceeded. Please try again later.', 429, 'RATE_LIMIT_EXCEEDED');
    }
    if (status >= 500) {
      throw new AppError('AI Provider service unavailable', 503, 'SERVICE_UNAVAILABLE', {
        providerStatus: status,
      });
    }

    throw new AppError(`AI Gateway error: ${errorText}`, status, 'GATEWAY_ERROR');
  }

  private generateMockCompletion(
    modelAlias: string,
    request: AIRequestContract,
    clientRequestId: string
  ): AIResponseContract {
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
