export type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

export interface CircuitBreakerOptions {
  failureThreshold: number; // consecutive failures to open circuit
  recoveryTimeoutMs: number; // time to wait before entering half-open
  halfOpenSuccessThreshold: number; // consecutive successes in half-open to close circuit
  timeoutMs?: number; // per-request timeout
}

export class CircuitBreaker {
  readonly name: string;
  private state: CircuitState = "CLOSED";
  private failureCount = 0;
  private successCount = 0;
  private lastStateChange = Date.now();
  private readonly options: CircuitBreakerOptions;

  constructor(name: string, options: Partial<CircuitBreakerOptions> = {}) {
    this.name = name;
    this.options = {
      failureThreshold: options.failureThreshold ?? 5,
      recoveryTimeoutMs: options.recoveryTimeoutMs ?? 30_000,
      halfOpenSuccessThreshold: options.halfOpenSuccessThreshold ?? 2,
      timeoutMs: options.timeoutMs ?? 15_000,
    };
  }

  getState(): CircuitState {
    const now = Date.now();
    if (this.state === "OPEN" && now - this.lastStateChange >= this.options.recoveryTimeoutMs) {
      this.transitionTo("HALF_OPEN");
    }
    return this.state;
  }

  isOpen(): boolean {
    return this.getState() === "OPEN";
  }

  async execute<T>(action: () => Promise<T>, fallback?: () => Promise<T> | T): Promise<T> {
    if (this.isOpen()) {
      if (fallback) {
        return fallback();
      }
      throw new Error(`CircuitBreaker '${this.name}' is OPEN. Fast-failing request.`);
    }

    try {
      let promise = action();

      // Wrap with timeout if configured
      if (this.options.timeoutMs) {
        promise = Promise.race([
          promise,
          new Promise<never>((_, reject) =>
            setTimeout(
              () => reject(new Error(`Operation timed out in circuit '${this.name}' after ${this.options.timeoutMs}ms`)),
              this.options.timeoutMs
            )
          ),
        ]);
      }

      const result = await promise;
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      if (fallback) {
        return fallback();
      }
      throw err;
    }
  }

  private onSuccess(): void {
    if (this.state === "HALF_OPEN") {
      this.successCount++;
      if (this.successCount >= this.options.halfOpenSuccessThreshold) {
        this.transitionTo("CLOSED");
      }
    } else if (this.state === "CLOSED") {
      this.failureCount = 0;
    }
  }

  private onFailure(): void {
    this.failureCount++;
    if (this.state === "HALF_OPEN" || this.failureCount >= this.options.failureThreshold) {
      this.transitionTo("OPEN");
    }
  }

  private transitionTo(newState: CircuitState): void {
    this.state = newState;
    this.lastStateChange = Date.now();
    this.failureCount = 0;
    this.successCount = 0;
    // console.log(`[CircuitBreaker:${this.name}] Transitioned to ${newState}`);
  }

  reset(): void {
    this.transitionTo("CLOSED");
  }

  getMetrics(): { name: string; state: CircuitState; failureCount: number } {
    return {
      name: this.name,
      state: this.getState(),
      failureCount: this.failureCount,
    };
  }
}

// Global Singletons for External Dependencies
export const codeforcesCircuit = new CircuitBreaker("codeforces", { failureThreshold: 3, recoveryTimeoutMs: 45_000 });
export const leetcodeCircuit = new CircuitBreaker("leetcode", { failureThreshold: 3, recoveryTimeoutMs: 30_000 });
export const redisCircuit = new CircuitBreaker("redis", { failureThreshold: 5, recoveryTimeoutMs: 15_000 });
export const llmCircuit = new CircuitBreaker("llm", { failureThreshold: 3, recoveryTimeoutMs: 60_000 });
