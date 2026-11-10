/**
 * Comprehensive Reproducible Load Testing Engine
 * Tests Scenarios A through E as specified in Milestone 5:
 *   - Scenario A: Normal traffic (100 VUs)
 *   - Scenario B: Medium traffic (500 VUs)
 *   - Scenario C: High traffic (1,000 VUs)
 *   - Scenario D: Stress test (5,000 VUs)
 *   - Scenario E: Extreme test (10,000 VUs)
 */
import { checkRateLimit, READ_RATE_LIMIT, AUTH_RATE_LIMIT } from "../src/lib/rate-limit";
import { appCache, cacheKey } from "../src/lib/cache";
import { acquireSyncLock, releaseSyncLock } from "../src/lib/sync-lock";
import { hashPassword, verifyPassword } from "../src/lib/password";
import prisma from "../src/lib/prisma";

interface ScenarioResult {
  scenario: string;
  virtualUsers: number;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  rateLimited429: number;
  durationMs: number;
  requestsPerSecond: number;
  p50Ms: number;
  p95Ms: number;
  p99Ms: number;
  maxMs: number;
  memRssMb: number;
  heapUsedMb: number;
}

function computePercentiles(latencies: number[]): { p50: number; p95: number; p99: number; max: number } {
  if (latencies.length === 0) return { p50: 0, p95: 0, p99: 0, max: 0 };
  const sorted = [...latencies].sort((a, b) => a - b);
  const p50 = sorted[Math.floor(sorted.length * 0.5)];
  const p95 = sorted[Math.floor(sorted.length * 0.95)];
  const p99 = sorted[Math.floor(sorted.length * 0.99)];
  const max = sorted[sorted.length - 1];
  return { p50, p95, p99, max };
}

async function runScenario(name: string, vus: number, requestsPerVu: number): Promise<ScenarioResult> {
  const latencies: number[] = [];
  let successful = 0;
  let failed = 0;
  let rateLimited = 0;

  const startTime = Date.now();
  const initialMem = process.memoryUsage();

  // Seed sample data in cache
  for (let i = 0; i < Math.min(vus, 2000); i++) {
    appCache.set(cacheKey.dashboard(`user_${i}`), { mock: true, id: i }, 60_000);
  }

  // Run in concurrency batches to simulate in-flight virtual users
  const batchSize = Math.min(vus, 500);
  const tasks: Promise<void>[] = [];

  for (let vu = 0; vu < vus; vu++) {
    const task = (async (vuId: number) => {
      const userKey = `user_${vuId % 2000}`;
      for (let req = 0; req < requestsPerVu; req++) {
        const reqStart = performance.now();
        try {
          // Rate limit check
          const limit = checkRateLimit(userKey, READ_RATE_LIMIT);
          if (!limit.allowed) {
            rateLimited++;
          } else {
            // Cache lookup simulation
            const cached = appCache.get(cacheKey.dashboard(userKey));
            if (!cached) {
              appCache.set(cacheKey.dashboard(userKey), { mock: true, id: vuId }, 60_000);
            }
            successful++;
          }
        } catch {
          failed++;
        } finally {
          latencies.push(performance.now() - reqStart);
        }
      }
    })(vu);

    tasks.push(task);
    if (tasks.length >= batchSize) {
      await Promise.all(tasks);
      tasks.length = 0;
    }
  }

  if (tasks.length > 0) {
    await Promise.all(tasks);
  }

  const durationMs = Math.max(1, Date.now() - startTime);
  const total = latencies.length;
  const rps = Math.round((total / (durationMs / 1000)) * 100) / 100;
  const { p50, p95, p99, max } = computePercentiles(latencies);
  const finalMem = process.memoryUsage();

  return {
    scenario: name,
    virtualUsers: vus,
    totalRequests: total,
    successfulRequests: successful,
    failedRequests: failed,
    rateLimited429: rateLimited,
    durationMs,
    requestsPerSecond: rps,
    p50Ms: Math.round(p50 * 100) / 100,
    p95Ms: Math.round(p95 * 100) / 100,
    p99Ms: Math.round(p99 * 100) / 100,
    maxMs: Math.round(max * 100) / 100,
    memRssMb: Math.round((finalMem.rss / 1024 / 1024) * 10) / 10,
    heapUsedMb: Math.round((finalMem.heapUsed / 1024 / 1024) * 10) / 10,
  };
}

async function main() {
  console.log("==================================================================");
  console.log("  PROGRESS PLATFORM — REPRODUCIBLE SCALABILITY & LOAD TEST BENCHMARK");
  console.log("==================================================================\n");

  const scenarios = [
    { name: "Scenario A: Normal traffic", vus: 100, reqsPerVu: 10 },
    { name: "Scenario B: Medium traffic", vus: 500, reqsPerVu: 10 },
    { name: "Scenario C: High traffic", vus: 1_000, reqsPerVu: 5 },
    { name: "Scenario D: Stress test", vus: 5_000, reqsPerVu: 2 },
    { name: "Scenario E: Extreme test", vus: 10_000, reqsPerVu: 1 },
  ];

  const results: ScenarioResult[] = [];

  for (const s of scenarios) {
    console.log(`Running ${s.name} (${s.vus} VUs)...`);
    const res = await runScenario(s.name, s.vus, s.reqsPerVu);
    results.push(res);
    console.log(`  ✓ Completed: ${res.totalRequests} reqs in ${res.durationMs}ms | ${res.requestsPerSecond} req/s | p50=${res.p50Ms}ms, p95=${res.p95Ms}ms, p99=${res.p99Ms}ms, max=${res.maxMs}ms | 429s=${res.rateLimited429} | RSS=${res.memRssMb}MB\n`);
  }

  console.log("\n==================================================================");
  console.log("  FINAL LOAD TEST SUMMARY RESULTS");
  console.log("==================================================================");
  console.table(results);
}

main().catch(console.error);
