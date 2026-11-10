/**
 * Genuine End-to-End HTTP Load Testing Suite
 * Targets the production-compiled Next.js application running over real TCP sockets.
 * Measures end-to-end network, HTTP parsing, routing, authentication, session validation,
 * Prisma database queries, caching, rate-limiting, and response serialization.
 */
import { spawn, ChildProcess } from "node:child_process";
import prisma from "../src/lib/prisma";
import { hashPassword } from "../src/lib/password";
import { createSession } from "../src/lib/session";

interface HttpBenchmarkResult {
  scenario: string;
  virtualUsers: number;
  concurrency: number;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  rateLimited429: number;
  durationMs: number;
  requestsPerSecond: number;
  p50Ms: number;
  p90Ms: number;
  p95Ms: number;
  p99Ms: number;
  maxMs: number;
  memRssMb: number;
}

function computePercentiles(latencies: number[]): { p50: number; p90: number; p95: number; p99: number; max: number } {
  if (latencies.length === 0) return { p50: 0, p90: 0, p95: 0, p99: 0, max: 0 };
  const sorted = [...latencies].sort((a, b) => a - b);
  const p50 = sorted[Math.floor(sorted.length * 0.50)];
  const p90 = sorted[Math.floor(sorted.length * 0.90)];
  const p95 = sorted[Math.floor(sorted.length * 0.95)];
  const p99 = sorted[Math.floor(sorted.length * 0.99)];
  const max = sorted[sorted.length - 1];
  return { p50, p90, p95, p99, max };
}

const PORT = 3005;
const BASE_URL = `http://127.0.0.1:${PORT}`;

interface TestAccount {
  id: string;
  email: string;
  password: string;
  sessionToken: string;
}

const TEST_ACCOUNTS: TestAccount[] = [];

async function seedTestAccounts() {
  console.log("[Seed] Preparing synthetic test accounts in database...");
  const rawPassword = "LoadTestPassword123!";
  const passwordHash = await hashPassword(rawPassword);

  for (let i = 1; i <= 5; i++) {
    const email = `loadtest_user_${i}@progress.staging`;
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: `Load Test User ${i}`,
          passwordHash,
        },
      });
    }

    // Ensure user has at least one goal
    const existingGoal = await prisma.goal.findFirst({ where: { userId: user.id } });
    if (!existingGoal) {
      await prisma.goal.create({
        data: {
          userId: user.id,
          title: `Goal for User ${i}`,
          category: "competitive_programming",
          targetMetric: "codeforces_rating",
          targetValue: 1400,
          initialValue: 1200,
          deadline: new Date(Date.now() + 30 * 86400000),
        },
      });
    }

    // Create session
    const session = await createSession(user.id);
    TEST_ACCOUNTS.push({
      id: user.id,
      email,
      password: rawPassword,
      sessionToken: session.sessionToken,
    });
  }
  console.log(`[Seed] Seeded ${TEST_ACCOUNTS.length} authenticated test accounts.`);
}

async function startServer(): Promise<ChildProcess> {
  console.log(`[Server] Starting production Next.js instance on port ${PORT}...`);
  const server = spawn("node", ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", String(PORT)], {
    cwd: process.cwd(),
    stdio: "pipe",
    env: { ...process.env, NODE_ENV: "production", PORT: String(PORT) },
  });

  server.stdout?.on("data", (data) => {
    // console.log(`[Next.js stdout]: ${data.toString().trim()}`);
  });
  server.stderr?.on("data", (data) => {
    console.error(`[Next.js stderr]: ${data.toString().trim()}`);
  });

  // Wait for health endpoint to respond
  const maxAttempts = 30;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise((r) => setTimeout(r, 500));
    try {
      const res = await fetch(`${BASE_URL}/api/health?type=liveness`);
      if (res.ok) {
        console.log(`[Server] Next.js is healthy and serving HTTP requests on port ${PORT}!`);
        return server;
      }
    } catch {}
  }

  server.kill();
  throw new Error(`Failed to start Next.js production server on port ${PORT} within 15 seconds.`);
}

async function executeScenario(
  scenarioName: string,
  totalRequests: number,
  concurrency: number,
  requestGenerator: (reqIndex: number) => Promise<{ status: number }>
): Promise<HttpBenchmarkResult> {
  const latencies: number[] = [];
  let successful = 0;
  let failed = 0;
  let rateLimited = 0;

  const startTime = performance.now();
  let currentIndex = 0;

  const workers = Array.from({ length: concurrency }, async () => {
    while (true) {
      const idx = currentIndex++;
      if (idx >= totalRequests) break;

      const t0 = performance.now();
      try {
        const res = await requestGenerator(idx);
        const elapsed = performance.now() - t0;
        latencies.push(elapsed);

        if (res.status === 429) {
          rateLimited++;
        } else if (res.status >= 200 && res.status < 400) {
          successful++;
        } else {
          failed++;
        }
      } catch (err) {
        const elapsed = performance.now() - t0;
        latencies.push(elapsed);
        failed++;
      }
    }
  });

  await Promise.all(workers);

  const durationMs = performance.now() - startTime;
  const rps = Math.round((totalRequests / (durationMs / 1000)) * 100) / 100;
  const { p50, p90, p95, p99, max } = computePercentiles(latencies);
  const mem = process.memoryUsage();

  return {
    scenario: scenarioName,
    virtualUsers: concurrency,
    concurrency,
    totalRequests,
    successfulRequests: successful,
    failedRequests: failed,
    rateLimited429: rateLimited,
    durationMs: Math.round(durationMs),
    requestsPerSecond: rps,
    p50Ms: Math.round(p50 * 100) / 100,
    p90Ms: Math.round(p90 * 100) / 100,
    p95Ms: Math.round(p95 * 100) / 100,
    p99Ms: Math.round(p99 * 100) / 100,
    maxMs: Math.round(max * 100) / 100,
    memRssMb: Math.round((mem.rss / 1024 / 1024) * 10) / 10,
  };
}

async function runGenuineBenchmark() {
  console.log("==================================================================");
  console.log("  PROGRESS PLATFORM — GENUINE HTTP LOAD-TEST FORENSICS & BENCHMARK");
  console.log("==================================================================\n");

  await seedTestAccounts();
  const server = await startServer();

  const results: HttpBenchmarkResult[] = [];

  try {
    // Scenario 1: Health / Readiness probe (warm-up)
    console.log("\n[1/8] Running Health & Readiness probe baseline (100 requests, 10 concurrent)...");
    const resHealth = await executeScenario(
      "Readiness Probe (/api/health)",
      100,
      10,
      async () => {
        const res = await fetch(`${BASE_URL}/api/health?type=readiness`);
        return { status: res.status };
      }
    );
    results.push(resHealth);

    // Scenario 2: Authenticated Dashboard retrieval (Full route + Auth validation + DB / Cache)
    console.log("[2/8] Running Authenticated Dashboard Retrieval (/api/dashboard) (200 requests, 25 concurrent)...");
    const resDashboard = await executeScenario(
      "Authenticated Dashboard (/api/dashboard)",
      200,
      25,
      async (idx) => {
        const account = TEST_ACCOUNTS[idx % TEST_ACCOUNTS.length];
        const res = await fetch(`${BASE_URL}/api/dashboard`, {
          headers: {
            Cookie: `auth_session=${account.sessionToken}`,
            "x-forwarded-for": `192.168.1.${(idx % 50) + 1}`,
          },
        });
        return { status: res.status };
      }
    );
    results.push(resDashboard);

    // Scenario 3: Analytics API retrieval (/api/analytics/activity)
    console.log("[3/8] Running Analytics Activity Retrieval (/api/analytics/activity) (200 requests, 25 concurrent)...");
    const resAnalytics = await executeScenario(
      "Analytics Activity (/api/analytics/activity)",
      200,
      25,
      async (idx) => {
        const account = TEST_ACCOUNTS[idx % TEST_ACCOUNTS.length];
        const res = await fetch(`${BASE_URL}/api/analytics/activity`, {
          headers: {
            Cookie: `auth_session=${account.sessionToken}`,
            "x-forwarded-for": `192.168.2.${(idx % 50) + 1}`,
          },
        });
        return { status: res.status };
      }
    );
    results.push(resAnalytics);

    // Scenario 4: Goals API retrieval (/api/goals)
    console.log("[4/8] Running Goals Retrieval (/api/goals) (200 requests, 25 concurrent)...");
    const resGoals = await executeScenario(
      "Goals List (/api/goals)",
      200,
      25,
      async (idx) => {
        const account = TEST_ACCOUNTS[idx % TEST_ACCOUNTS.length];
        const res = await fetch(`${BASE_URL}/api/goals`, {
          headers: {
            Cookie: `auth_session=${account.sessionToken}`,
            "x-forwarded-for": `192.168.3.${(idx % 50) + 1}`,
          },
        });
        return { status: res.status };
      }
    );
    results.push(resGoals);

    // Scenario 5: High-Concurrency Mixed Read Traffic (500 requests, 50 concurrent in-flight VUs)
    console.log("[5/8] Running High-Concurrency Mixed Read Traffic (500 requests, 50 concurrent in-flight)...");
    const endpoints = ["/api/dashboard", "/api/analytics/activity", "/api/goals", "/api/plans/current"];
    const resMixed = await executeScenario(
      "Mixed Reads (50 Concurrent VUs)",
      500,
      50,
      async (idx) => {
        const account = TEST_ACCOUNTS[idx % TEST_ACCOUNTS.length];
        const ep = endpoints[idx % endpoints.length];
        const res = await fetch(`${BASE_URL}${ep}`, {
          headers: {
            Cookie: `auth_session=${account.sessionToken}`,
            "x-forwarded-for": `192.168.4.${(idx % 80) + 1}`,
          },
        });
        return { status: res.status };
      }
    );
    results.push(resMixed);

    // Scenario 6: Controlled Write Operations (Creating Goals)
    console.log("[6/8] Running Controlled Write Operations (POST /api/goals) (50 requests, 10 concurrent)...");
    const resWrites = await executeScenario(
      "Controlled Writes (POST /api/goals)",
      50,
      10,
      async (idx) => {
        const account = TEST_ACCOUNTS[idx % TEST_ACCOUNTS.length];
        const res = await fetch(`${BASE_URL}/api/goals`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `auth_session=${account.sessionToken}`,
            "x-forwarded-for": `192.168.5.${(idx % 10) + 1}`,
          },
          body: JSON.stringify({
            title: `Load Test Goal ${idx}`,
            category: "dsa",
            targetMetric: "leetcode_solved_medium",
            targetValue: 150,
            initialValue: 100,
            deadline: new Date(Date.now() + 60 * 86400000).toISOString(),
          }),
        });
        return { status: res.status };
      }
    );
    results.push(resWrites);

    // Scenario 7: Rate-Limit Boundary Verification (rapid bursts from single IP to trigger HTTP 429)
    console.log("[7/8] Running Rate-Limit Boundary Testing (Burst from single IP to verify HTTP 429)...");
    const resRateLimit = await executeScenario(
      "Rate-Limit Defense (Burst from 1 IP)",
      25,
      5,
      async () => {
        const res = await fetch(`${BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": "10.0.0.99",
          },
          body: JSON.stringify({ email: "invalid@test.com", password: "WrongPassword123!" }),
        });
        return { status: res.status };
      }
    );
    results.push(resRateLimit);

    // Clean up created test goals
    await prisma.goal.deleteMany({
      where: { title: { startsWith: "Load Test Goal" } },
    });
  } finally {
    console.log("\n[Teardown] Shutting down Next.js production server...");
    server.kill();
    if (server.pid) {
      spawn("taskkill", ["/pid", String(server.pid), "/f", "/t"]);
    }
  }

  console.log("\n==================================================================");
  console.log("  GENUINE HTTP LOAD-TEST FORENSIC RESULTS TABLE");
  console.log("==================================================================");
  console.table(results);
}

runGenuineBenchmark().catch((err) => {
  console.error("Benchmark failed with error:", err);
  process.exit(1);
});
