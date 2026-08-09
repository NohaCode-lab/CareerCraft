import { AppConfig } from '../app/config.js';
import { AppError } from '../errors/app-error.js';
import {
  AIProvider,
  AIRequestContract,
  AIResponseContract,
  AIMessage,
} from './providers/AIProvider.js';
import { MockAIProvider } from './providers/MockAIProvider.js';
import { OpenRouterProvider } from './providers/OpenRouterProvider.js';
import { OllamaProvider } from './providers/OllamaProvider.js';
import { AIRouter, AIRoutingDecision } from './routing/AIRouter.js';

export { AIMessage, AIRequestContract, AIResponseContract, AIRoutingDecision };

export class AIGatewayService {
  private config: AppConfig;
  private router: AIRouter;
  private providerRegistry: Map<string, AIProvider>;

  constructor(
    config: AppConfig,
    provider?: AIProvider,
    router?: AIRouter
  ) {
    this.config = config;
    this.router = router || new AIRouter(config);
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

  public getProvider(providerType: string): AIProvider {
    return this.providerRegistry.get(providerType) || this.providerRegistry.get('mock')!;
  }

  public async executeChatCompletion(
    request: AIRequestContract,
    clientRequestId: string
  ): Promise<AIResponseContract> {
    const decision = this.router.route(request);
    const provider = this.getProvider(decision.providerType);

    const enrichedRequest: AIRequestContract = {
      ...request,
      modelAlias: decision.modelAlias,
    };

    try {
      const response = await provider.generate(enrichedRequest, clientRequestId);

      const providerLabel =
        decision.providerType === 'mock'
          ? decision.modelAlias === 'career-private'
            ? 'Ollama (Mock)'
            : 'OpenRouter (Mock)'
          : `${decision.providerType} (${decision.concreteModel})`;

      return {
        ...response,
        model: response.model || decision.modelAlias,
        providerMetadata: {
          ...response.providerMetadata,
          providerUsed: providerLabel,
          fallbackOccurred: false,
        },
      };
    } catch (error: unknown) {
      if (error instanceof AppError) {
        throw error;
      }

      // In development mode, gracefully fall back to Mock provider
      if (this.config.NODE_ENV === 'development') {
        const mockProvider = this.getProvider('mock');
        return mockProvider.generate(enrichedRequest, clientRequestId);
      }

      throw new AppError(
        error instanceof Error ? error.message : 'AI Provider execution failed.',
        502,
        'BAD_GATEWAY'
      );
    }
  }
}
