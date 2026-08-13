import { AppConfig } from '../app/config.js';
import { AppError } from '../errors/app-error.js';
import type {
  AIProvider,
  AIRequestContract,
  AIResponseContract,
  AIMessage,
} from './providers/AIProvider.js';
import { AIProviderError } from './providers/AIProvider.js';
import { MockAIProvider } from './providers/MockAIProvider.js';
import { OpenRouterProvider } from './providers/OpenRouterProvider.js';
import { OllamaProvider } from './providers/OllamaProvider.js';
import { AIRouter } from './routing/AIRouter.js';
import type { AIRoutingDecision } from './routing/AIRouter.js';
import { ResiliencePolicy } from './resilience/ResiliencePolicy.js';
import type { CircuitState } from './resilience/resilience.types.js';

export type { AIMessage, AIRequestContract, AIResponseContract, AIRoutingDecision, CircuitState };

export class AIGatewayService {
  private config: AppConfig;
  private router: AIRouter;
  private resiliencePolicy: ResiliencePolicy;
  private providerRegistry: Map<string, AIProvider>;

  constructor(
    config: AppConfig,
    provider?: AIProvider,
    router?: AIRouter,
    resiliencePolicy?: ResiliencePolicy
  ) {
    this.config = config;
    this.router = router || new AIRouter(config);
    this.resiliencePolicy = resiliencePolicy || new ResiliencePolicy();
    this.providerRegistry = new Map<string, AIProvider>();

    const mock = provider || new MockAIProvider();
    this.providerRegistry.set('mock', mock);
    this.providerRegistry.set(
      'openrouter',
      new OpenRouterProvider({ apiKey: config.OPENROUTER_API_KEY })
    );
    this.providerRegistry.set(
      'ollama',
      new OllamaProvider({ baseUrl: config.OLLAMA_URL })
    );
  }

  public getRouter(): AIRouter {
    return this.router;
  }

  public getResiliencePolicy(): ResiliencePolicy {
    return this.resiliencePolicy;
  }

  public getProvider(providerType: string): AIProvider {
    return this.providerRegistry.get(providerType) || this.providerRegistry.get('mock')!;
  }

  public async executeChatCompletion(
    request: AIRequestContract,
    clientRequestId: string
  ): Promise<AIResponseContract> {
    const decision = this.router.route(request);
    const primaryType = decision.providerType;
    const enrichedRequest: AIRequestContract = {
      ...request,
      modelAlias: decision.modelAlias,
    };

    // Check circuit state for primary provider
    const canExecutePrimary = this.resiliencePolicy.circuitBreaker.canExecute(primaryType);

    if (canExecutePrimary) {
      const primaryProvider = this.getProvider(primaryType);

      // Attempt 1
      try {
        const response = await primaryProvider.generate(enrichedRequest, clientRequestId);
        this.resiliencePolicy.circuitBreaker.recordSuccess(primaryType);

        const providerLabel =
          primaryType === 'mock'
            ? decision.modelAlias === 'career-private'
              ? 'Ollama (Mock)'
              : 'OpenRouter (Mock)'
            : `${primaryType} (${decision.concreteModel})`;

        return {
          ...response,
          model: response.model || decision.modelAlias,
          providerMetadata: {
            ...response.providerMetadata,
            providerUsed: providerLabel,
            fallbackOccurred: false,
          },
        };
      } catch (firstError: unknown) {
        // Record failure for circuit breaker if transient
        const isTransient = this.resiliencePolicy.isTransientFailure(firstError);
        this.resiliencePolicy.circuitBreaker.recordFailure(primaryType, isTransient);

        // Retry Attempt (Max 1 retry for transient errors)
        if (isTransient && this.resiliencePolicy.maxRetries >= 1) {
          try {
            const retryResponse = await primaryProvider.generate(enrichedRequest, clientRequestId);
            this.resiliencePolicy.circuitBreaker.recordSuccess(primaryType);

            const providerLabel =
              primaryType === 'mock'
                ? decision.modelAlias === 'career-private'
                  ? 'Ollama (Mock)'
                  : 'OpenRouter (Mock)'
                : `${primaryType} (${decision.concreteModel})`;

            return {
              ...retryResponse,
              model: retryResponse.model || decision.modelAlias,
              providerMetadata: {
                ...retryResponse.providerMetadata,
                providerUsed: providerLabel,
                fallbackOccurred: false,
              },
            };
          } catch (retryError: unknown) {
            this.resiliencePolicy.circuitBreaker.recordFailure(
              primaryType,
              this.resiliencePolicy.isTransientFailure(retryError)
            );
          }
        }
      }
    }

    // Fallback Path: Primary provider circuit was OPEN or Primary execution failed
    const fallbackType = this.resiliencePolicy.getFallbackProviderType(primaryType);
    const fallbackProvider = this.getProvider(fallbackType);

    try {
      const fallbackResponse = await fallbackProvider.generate(enrichedRequest, clientRequestId);
      this.resiliencePolicy.circuitBreaker.recordSuccess(fallbackType);

      const fallbackLabel =
        fallbackType === 'mock'
          ? decision.modelAlias === 'career-private'
            ? 'Ollama (Mock)'
            : 'OpenRouter (Mock)'
          : `${fallbackType} (Fallback)`;

      return {
        ...fallbackResponse,
        model: fallbackResponse.model || decision.modelAlias,
        providerMetadata: {
          ...fallbackResponse.providerMetadata,
          providerUsed: fallbackLabel,
          fallbackOccurred: true,
        },
      };
    } catch (fallbackError: unknown) {
      // In development / test mode, return deterministic Mock Provider response
      if (this.config.NODE_ENV === 'development' || this.config.NODE_ENV === 'test') {
        const mockProvider = this.getProvider('mock');
        const mockResponse = await mockProvider.generate(enrichedRequest, clientRequestId);
        return {
          ...mockResponse,
          providerMetadata: {
            providerUsed: 'Mock Fallback',
            fallbackOccurred: true,
          },
        };
      }

      if (fallbackError instanceof AppError || fallbackError instanceof AIProviderError) {
        throw fallbackError;
      }

      throw new AppError(
        fallbackError instanceof Error
          ? fallbackError.message
          : 'AI Provider execution and fallback failed.',
        502,
        'BAD_GATEWAY'
      );
    }
  }
}
