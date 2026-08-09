import { AIProviderError } from '../providers/AIProvider.js';
import { CircuitBreaker } from './CircuitBreaker.js';
import { ResiliencePolicyOptions } from './resilience.types.js';

export class ResiliencePolicy {
  public maxRetries: number;
  public timeoutMs: number;
  public circuitBreaker: CircuitBreaker;

  constructor(options: ResiliencePolicyOptions = {}) {
    this.maxRetries = options.maxRetries ?? 1;
    this.timeoutMs = options.timeoutMs ?? 30000;
    this.circuitBreaker = new CircuitBreaker(options.circuitBreakerOptions);
  }

  public isRetryableError(error: unknown): boolean {
    if (error instanceof AIProviderError) {
      if (
        error.category === 'timeout' ||
        error.category === 'provider_unavailable' ||
        error.category === 'server_error'
      ) {
        return true;
      }
      if (error.statusCode >= 500 && error.statusCode <= 504) {
        return true;
      }
    }
    return false;
  }

  public isTransientFailure(error: unknown): boolean {
    return this.isRetryableError(error);
  }

  public getFallbackProviderType(primaryType: string): string {
    switch (primaryType) {
      case 'openrouter':
        return 'ollama';
      case 'ollama':
        return 'mock';
      default:
        return 'mock';
    }
  }
}
