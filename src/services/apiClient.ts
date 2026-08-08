export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIChatRequestDto {
  task: string;
  modelAlias?: 'career-fast' | 'career-reasoning' | 'career-private';
  messages: AIMessage[];
  temperature?: number;
  maxTokens?: number;
  metadata?: Record<string, unknown>;
}

export interface AIChatResponseDto {
  success: boolean;
  data: {
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
  };
  error?: {
    code: string;
    message: string;
    requestId?: string;
  };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1';

export class ApiClient {
  public async postAiChat(payload: AIChatRequestDto): Promise<AIChatResponseDto> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as AIChatResponseDto;

      if (!response.ok) {
        return {
          success: false,
          data: {
            requestId: data.error?.requestId || 'err_unknown',
            model: payload.modelAlias || 'career-fast',
            content: '',
            usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
            finishReason: 'error',
          },
          error: data.error || {
            code: 'API_ERROR',
            message: `API request failed with status ${response.status}`,
          },
        };
      }

      return data;
    } catch (err: unknown) {
      return {
        success: false,
        data: {
          requestId: 'err_network',
          model: payload.modelAlias || 'career-fast',
          content: '',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
          finishReason: 'error',
        },
        error: {
          code: 'NETWORK_ERROR',
          message: err instanceof Error ? err.message : 'Network error reaching CareerCraft API',
        },
      };
    }
  }

  public async generateInterviewQuestions(payload: { resumeText: string; jobDescription: string; category?: string; questionCount?: number }) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/interview/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (err: unknown) {
      return {
        success: false,
        error: { code: 'NETWORK_ERROR', message: err instanceof Error ? err.message : 'Network error' },
      };
    }
  }

  public async generatePersonalizedAnswer(payload: { resumeText: string; questionText: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/interview/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (err: unknown) {
      return {
        success: false,
        error: { code: 'NETWORK_ERROR', message: err instanceof Error ? err.message : 'Network error' },
      };
    }
  }

  public async evaluateInterviewAnswer(payload: { questionText: string; userAnswer: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/interview/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (err: unknown) {
      return {
        success: false,
        error: { code: 'NETWORK_ERROR', message: err instanceof Error ? err.message : 'Network error' },
      };
    }
  }

  public async runAIEvaluationBenchmark() {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/evaluation/benchmark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return await response.json();
    } catch (err: unknown) {
      return {
        success: false,
        error: { code: 'NETWORK_ERROR', message: err instanceof Error ? err.message : 'Network error' },
      };
    }
  }
}

export const apiClient = new ApiClient();
