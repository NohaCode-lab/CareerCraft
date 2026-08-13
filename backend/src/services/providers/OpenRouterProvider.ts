import {
  AIProvider,
  AIRequestContract,
  AIResponseContract,
  AIProviderError,
} from './AIProvider.js';

export interface OpenRouterProviderOptions {
  apiKey?: string;
  baseUrl?: string;
  defaultModel?: string;
  timeoutMs?: number;
}

export class OpenRouterProvider implements AIProvider {
  public readonly name = 'OpenRouterProvider';
  private apiKey: string;
  private baseUrl: string;
  private defaultModel: string;
  private timeoutMs: number;

  constructor(options: OpenRouterProviderOptions = {}) {
    this.apiKey = options.apiKey || process.env.OPENROUTER_API_KEY || '';
    this.baseUrl = (options.baseUrl || process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1').replace(/\/$/, '');
    this.defaultModel = options.defaultModel || process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet';
    this.timeoutMs = options.timeoutMs || 30000;
  }

  public async generate(
    request: AIRequestContract,
    clientRequestId: string
  ): Promise<AIResponseContract> {
    if (!this.apiKey) {
      throw new AIProviderError(
        'OpenRouter API key is not configured.',
        'authentication',
        401
      );
    }

    const targetModel = request.modelAlias || this.defaultModel;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    const payload = {
      model: targetModel,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 1000,
    };

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'https://careercraft.app',
          'X-Title': 'CareerCraft AI SaaS',
          'x-request-id': clientRequestId,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        await this.handleErrorResponse(response);
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
        model: data.model || targetModel,
        content,
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0,
        },
        finishReason: choice?.finish_reason || 'stop',
        providerMetadata: {
          providerUsed: 'OpenRouter',
          fallbackOccurred: false,
        },
      };
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      if (error instanceof AIProviderError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new AIProviderError(
          'OpenRouter API request timed out.',
          'timeout',
          504
        );
      }

      throw new AIProviderError(
        error instanceof Error ? error.message : 'Failed to communicate with OpenRouter API.',
        'provider_unavailable',
        502
      );
    }
  }

  private async handleErrorResponse(response: Response): Promise<never> {
    let errorMsg = '';
    try {
      errorMsg = await response.text();
    } catch {
      errorMsg = 'No response body';
    }

    const status = response.status;
    if (status === 400) {
      throw new AIProviderError(`OpenRouter Validation Error: ${errorMsg}`, 'validation', 400);
    }
    if (status === 401) {
      throw new AIProviderError('OpenRouter Authentication Failure: Invalid API Key.', 'authentication', 401);
    }
    if (status === 403) {
      throw new AIProviderError('OpenRouter Access Forbidden.', 'authorization', 403);
    }
    if (status === 429) {
      throw new AIProviderError('OpenRouter Rate Limit Exceeded.', 'rate_limit', 429);
    }
    if (status >= 500) {
      throw new AIProviderError(`OpenRouter Server Error (${status}): ${errorMsg}`, 'server_error', status);
    }

    throw new AIProviderError(`OpenRouter HTTP Error ${status}: ${errorMsg}`, 'unknown', status);
  }
}
