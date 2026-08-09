import { CircuitState, CircuitBreakerOptions } from './resilience.types.js';

interface ProviderCircuitInfo {
  state: CircuitState;
  consecutiveFailures: number;
  lastOpenedTimestamp: number;
  halfOpenProbeInFlight: boolean;
}

export class CircuitBreaker {
  private failureThreshold: number;
  private cooldownMs: number;
  private circuits: Map<string, ProviderCircuitInfo>;

  constructor(options: CircuitBreakerOptions = {}) {
    this.failureThreshold = options.failureThreshold ?? 3;
    this.cooldownMs = options.cooldownMs ?? 30000;
    this.circuits = new Map();
  }

  private getInfo(providerName: string): ProviderCircuitInfo {
    let info = this.circuits.get(providerName);
    if (!info) {
      info = {
        state: 'CLOSED',
        consecutiveFailures: 0,
        lastOpenedTimestamp: 0,
        halfOpenProbeInFlight: false,
      };
      this.circuits.set(providerName, info);
    }
    return info;
  }

  public getState(providerName: string): CircuitState {
    const info = this.getInfo(providerName);

    if (info.state === 'OPEN') {
      const elapsed = Date.now() - info.lastOpenedTimestamp;
      if (elapsed >= this.cooldownMs) {
        info.state = 'HALF_OPEN';
        info.halfOpenProbeInFlight = false;
      }
    }

    return info.state;
  }

  public canExecute(providerName: string): boolean {
    const state = this.getState(providerName);

    if (state === 'CLOSED') {
      return true;
    }

    if (state === 'HALF_OPEN') {
      const info = this.getInfo(providerName);
      if (!info.halfOpenProbeInFlight) {
        info.halfOpenProbeInFlight = true;
        return true;
      }
      return false; // Only 1 probe request allowed in HALF_OPEN
    }

    return false; // OPEN state rejects requests
  }

  public recordSuccess(providerName: string): void {
    const info = this.getInfo(providerName);
    info.state = 'CLOSED';
    info.consecutiveFailures = 0;
    info.lastOpenedTimestamp = 0;
    info.halfOpenProbeInFlight = false;
  }

  public recordFailure(providerName: string, isTransient: boolean): void {
    if (!isTransient) {
      // Non-transient errors (400, 401, 403, 404, 429) do not trip circuit breaker
      return;
    }

    const info = this.getInfo(providerName);

    if (info.state === 'HALF_OPEN') {
      info.state = 'OPEN';
      info.lastOpenedTimestamp = Date.now();
      info.halfOpenProbeInFlight = false;
      return;
    }

    info.consecutiveFailures += 1;
    if (info.consecutiveFailures >= this.failureThreshold) {
      info.state = 'OPEN';
      info.lastOpenedTimestamp = Date.now();
    }
  }

  public reset(): void {
    this.circuits.clear();
  }
}
