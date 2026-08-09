export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface CircuitBreakerOptions {
  failureThreshold?: number; // default: 3 consecutive transient failures
  cooldownMs?: number;       // default: 30000 (30s cooldown before half-open probe)
}

export interface ResiliencePolicyOptions {
  maxRetries?: number;       // default: 1
  timeoutMs?: number;        // default: 30000 (30s)
  circuitBreakerOptions?: CircuitBreakerOptions;
}
