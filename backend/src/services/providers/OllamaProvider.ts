import {
  AIProvider,
  AIRequestContract,
  AIResponseContract,
  AIProviderError,
} from './AIProvider.js';

export interface OllamaProviderOptions {
  baseUrl?: string;
  defaultModel?: string;
  timeoutMs?: number;
}

export class OllamaProvider implements AIProvider {
  public readonly name = 'OllamaProvider';
  private baseUrl: string;
  private defaultModel: string;
  private timeoutMs: number;

  constructor(options: OllamaProviderOptions = {}) {
    this.baseUrl = (options.baseUrl || process.env.OLLAMA_URL || process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').replace(/\/$/, '');
    this.defaultModel = options.defaultModel || process.env.OLLAMA_MODEL || 'qwen2.5:7b-instruct';
    this.timeoutMs = options.timeoutMs || 30000;
  }

  public async generate(
    request: AIRequestContract,
    clientRequestId: string
  ): Promise<AIResponseContract> {
    const targetModel = request.modelAlias || this.defaultModel;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    const payload = {
      model: targetModel,
      messages: request.messages,
      stream: false,
      options: {
        temperature: request.temperature ?? 0.7,
      },
    };

    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        model?: string;
        message?: { content?: string };
        done_reason?: string;
        prompt_eval_count?: number;
        eval_count?: number;
      };

      const content = data.message?.content || '';
      const promptTokens = data.prompt_eval_count || 0;
      const completionTokens = data.eval_count || 0;

      return {
        requestId: clientRequestId,
        model: data.model || targetModel,
        content,
        usage: {
          promptTokens,
          completionTokens,
          totalTokens: promptTokens + completionTokens,
        },
        finishReason: data.done_reason || 'stop',
        providerMetadata: {
          providerUsed: 'Ollama',
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
          'Ollama request timed out.',
          'timeout',
          504
        );
      }

      throw new AIProviderError(
        error instanceof Error ? error.message : 'Failed to communicate with local Ollama service.',
        'provider_unavailable',
        503
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
    if (status === 404) {
      throw new AIProviderError(`Ollama Model Not Found (404): ${errorMsg}`, 'validation', 404);
    }
    if (status === 400) {
      throw new AIProviderError(`Ollama Bad Request (400): ${errorMsg}`, 'validation', 400);
    }
    if (status >= 500) {
      throw new AIProviderError(`Ollama Server Error (${status}): ${errorMsg}`, 'server_error', status);
    }

    throw new AIProviderError(`Ollama HTTP Error ${status}: ${errorMsg}`, 'unknown', status);
  }
}
