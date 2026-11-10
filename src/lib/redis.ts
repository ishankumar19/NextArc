import Redis from "ioredis";

export interface IRedisClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ...args: (string | number)[]): Promise<string | null>;
  del(...keys: string[]): Promise<number>;
  exists(...keys: string[]): Promise<number>;
  expire(key: string, seconds: number): Promise<number>;
  ttl(key: string): Promise<number>;
  eval(script: string, numkeys: number, ...args: (string | number)[]): Promise<any>;
  ping(): Promise<string>;
  flushdb(): Promise<string>;
  disconnect(): Promise<void>;
  isClusterEnabled(): boolean;
}

/**
 * High-fidelity In-Memory Redis Emulator for local development and offline unit tests.
 * Accurately implements key TTLs, atomic string set options (NX, PX, EX), and Lua rate-limiting.
 */
class InMemoryRedisClient implements IRedisClient {
  private store = new Map<string, { value: string; expiresAt: number | null }>();

  async get(key: string): Promise<string | null> {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  async set(key: string, value: string, ...args: (string | number)[]): Promise<string | null> {
    let expiresAt: number | null = null;
    let onlyIfNotExist = false;

    for (let i = 0; i < args.length; i++) {
      const arg = String(args[i]).toUpperCase();
      if (arg === "PX" && i + 1 < args.length) {
        expiresAt = Date.now() + Number(args[i + 1]);
        i++;
      } else if (arg === "EX" && i + 1 < args.length) {
        expiresAt = Date.now() + Number(args[i + 1]) * 1000;
        i++;
      } else if (arg === "NX") {
        onlyIfNotExist = true;
      }
    }

    if (onlyIfNotExist) {
      const existing = await this.get(key);
      if (existing !== null) return null;
    }

    this.store.set(key, { value: String(value), expiresAt });
    return "OK";
  }

  async del(...keys: string[]): Promise<number> {
    let count = 0;
    for (const key of keys) {
      if (this.store.delete(key)) count++;
    }
    return count;
  }

  async exists(...keys: string[]): Promise<number> {
    let count = 0;
    for (const key of keys) {
      if (await this.get(key) !== null) count++;
    }
    return count;
  }

  async expire(key: string, seconds: number): Promise<number> {
    const entry = this.store.get(key);
    if (!entry) return 0;
    entry.expiresAt = Date.now() + seconds * 1000;
    return 1;
  }

  async ttl(key: string): Promise<number> {
    const entry = this.store.get(key);
    if (!entry) return -2;
    if (entry.expiresAt === null) return -1;
    const remaining = entry.expiresAt - Date.now();
    if (remaining <= 0) {
      this.store.delete(key);
      return -2;
    }
    return Math.ceil(remaining / 1000);
  }

  /**
   * Emulates atomic Lua scripts used for distributed rate limiting and distributed locking.
   */
  async eval(script: string, numkeys: number, ...args: (string | number)[]): Promise<any> {
    const keys = args.slice(0, numkeys).map(String);
    const argv = args.slice(numkeys);

    // Rate Limiting Lua Script Emulation
    if (script.includes("rate_limit") || script.includes("check_rate_limit")) {
      const key = keys[0];
      const now = Number(argv[0]);
      const windowMs = Number(argv[1]);
      const maxRequests = Number(argv[2]);

      const raw = await this.get(key);
      let timestamps: number[] = raw ? JSON.parse(raw) : [];
      timestamps = timestamps.filter((t) => t > now - windowMs);

      if (timestamps.length >= maxRequests) {
        const oldest = timestamps[0] || now;
        const resetMs = oldest + windowMs - now;
        return [0, 0, Math.max(0, resetMs)];
      }

      timestamps.push(now);
      await this.set(key, JSON.stringify(timestamps), "PX", windowMs + 1000);
      return [1, maxRequests - timestamps.length, windowMs];
    }

    // Distributed Lock Release with Token Verification
    if (script.includes("redis.call('get', KEYS[1]) == ARGV[1]")) {
      const key = keys[0];
      const token = String(argv[0]);
      const current = await this.get(key);
      if (current === token) {
        await this.del(key);
        return 1;
      }
      return 0;
    }

    // Default mock evaluation
    return 1;
  }

  async ping(): Promise<string> {
    return "PONG";
  }

  async flushdb(): Promise<string> {
    this.store.clear();
    return "OK";
  }

  async disconnect(): Promise<void> {
    this.store.clear();
  }

  isClusterEnabled(): boolean {
    return false;
  }
}

/**
 * Adapter wrapping real ioredis client.
 */
class RealRedisClient implements IRedisClient {
  private client: Redis;

  constructor(url: string) {
    this.client = new Redis(url, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: false,
      connectTimeout: 5000,
      retryStrategy: (times) => {
        if (times > 5) return null; // cease retrying after 5 attempts
        return Math.min(times * 200, 2000);
      },
    });

    this.client.on("error", (err) => {
      console.error("[Redis Error]", err.message);
    });
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async set(key: string, value: string, ...args: (string | number)[]) {
    return (this.client as any).set(key, value, ...args);
  }

  async del(...keys: string[]) {
    return this.client.del(...keys);
  }

  async exists(...keys: string[]) {
    return this.client.exists(...keys);
  }

  async expire(key: string, seconds: number) {
    return this.client.expire(key, seconds);
  }

  async ttl(key: string) {
    return this.client.ttl(key);
  }

  async eval(script: string, numkeys: number, ...args: (string | number)[]) {
    return this.client.eval(script, numkeys, ...args);
  }

  async ping() {
    return this.client.ping();
  }

  async flushdb() {
    return this.client.flushdb();
  }

  async disconnect() {
    await this.client.quit();
  }

  isClusterEnabled(): boolean {
    return true;
  }

  getRawClient(): Redis {
    return this.client;
  }
}

// Global singleton for Next.js hot reload
const globalForRedis = global as unknown as { redisClient?: IRedisClient };

export function getRedisClient(): IRedisClient {
  if (globalForRedis.redisClient) {
    return globalForRedis.redisClient;
  }

  const redisUrl = process.env.REDIS_URL;
  const isProduction = process.env.NODE_ENV === "production";
  const requireRedis = process.env.REQUIRE_REDIS === "true";

  if (redisUrl) {
    globalForRedis.redisClient = new RealRedisClient(redisUrl);
  } else {
    if (isProduction && requireRedis) {
      throw new Error(
        "FATAL: REDIS_URL environment variable is required in production multi-instance mode when REQUIRE_REDIS=true."
      );
    }
    // Graceful fallback to in-memory implementation for tests & local dev
    globalForRedis.redisClient = new InMemoryRedisClient();
  }

  return globalForRedis.redisClient;
}

export const redis = getRedisClient();
export default redis;
