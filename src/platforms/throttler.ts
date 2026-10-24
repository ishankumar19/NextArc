/**
 * Global shared throttler for Codeforces API.
 * Strictly enforces official rate limit: at most 1 request every 2000ms.
 * Concurrent syncs across different users are serialized through this global queue.
 */

export interface ThrottlerOptions {
  minIntervalMs: number;
  maxRetries?: number;
  initialBackoffMs?: number;
  rateLimitBackoffMs?: number;
}

export class SharedPlatformThrottler {
  private minIntervalMs: number;
  private maxRetries: number;
  private initialBackoffMs: number;
  private rateLimitBackoffMs: number;
  private lastExecutedAt = 0;
  private queue: Array<() => Promise<void>> = [];
  private isProcessing = false;

  constructor(options: ThrottlerOptions) {
    this.minIntervalMs = options.minIntervalMs;
    this.maxRetries = options.maxRetries ?? 3;
    this.initialBackoffMs = options.initialBackoffMs ?? 1000;
    this.rateLimitBackoffMs = options.rateLimitBackoffMs ?? 3000;
  }

  /**
   * Enqueues an async task, ensuring it is executed at least `minIntervalMs`
   * after the previous request finished, with automatic retry and exponential backoff.
   */
  public enqueue<T>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await this.executeWithRetry(task);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });

      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const nextTask = this.queue.shift();
      if (!nextTask) break;

      const now = Date.now();
      const elapsed = now - this.lastExecutedAt;
      const waitTime = Math.max(0, this.minIntervalMs - elapsed);

      if (waitTime > 0) {
        await this.sleep(waitTime);
      }

      this.lastExecutedAt = Date.now();
      await nextTask();
    }

    this.isProcessing = false;
  }

  private async executeWithRetry<T>(task: () => Promise<T>): Promise<T> {
    let attempt = 0;
    while (attempt <= this.maxRetries) {
      try {
        return await task();
      } catch (error: any) {
        attempt++;
        if (attempt > this.maxRetries) {
          throw error;
        }

        // Check if rate limited or transient network error
        const isRateLimit =
          error?.status === 429 ||
          error?.statusCode === 429 ||
          error?.message?.includes("429") ||
          error?.message?.includes("Call limit exceeded");

        const backoff = this.initialBackoffMs * Math.pow(2, attempt);
        const delay = isRateLimit ? Math.max(backoff, this.rateLimitBackoffMs) : backoff;

        await this.sleep(delay);
      }
    }

    throw new Error("Maximum retry attempts exceeded in platform throttler.");
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Reconfigures throttler parameters (useful for zero-latency testing environments).
   */
  public configure(options: Partial<ThrottlerOptions>): void {
    if (options.minIntervalMs !== undefined) this.minIntervalMs = options.minIntervalMs;
    if (options.maxRetries !== undefined) this.maxRetries = options.maxRetries;
    if (options.initialBackoffMs !== undefined) this.initialBackoffMs = options.initialBackoffMs;
    if (options.rateLimitBackoffMs !== undefined) this.rateLimitBackoffMs = options.rateLimitBackoffMs;
  }
}

// Global singleton instance for Codeforces (1 request / 2000ms)
export const codeforcesThrottler = new SharedPlatformThrottler({
  minIntervalMs: 2000,
  maxRetries: 3,
  initialBackoffMs: 1500,
  rateLimitBackoffMs: 3000,
});
