import { NextRequest, NextResponse } from "next/server";
import prisma, { getDatabaseConnectionBudget } from "@/lib/prisma";
import { appCache } from "@/lib/cache";
import { getRateLimitMetrics } from "@/lib/rate-limit";
import { codeforcesCircuit, leetcodeCircuit, redisCircuit } from "@/lib/circuit-breaker";
import { getRedisClient } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const type = req.nextUrl?.searchParams?.get("type") || "readiness";

  // Liveness check: confirms process is alive without touching external services
  if (type === "liveness") {
    return NextResponse.json({
      status: "alive",
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  }

  // Readiness check: verifies DB connectivity and provides operational telemetry
  const start = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - start;

    // Ping Redis
    let redisStatus = "not_configured";
    try {
      const redis = getRedisClient();
      redisStatus = (await redis.ping()) === "PONG" ? "connected" : "degraded";
    } catch {
      redisStatus = "error";
    }

    return NextResponse.json({
      status: "ok",
      db: "connected",
      latencyMs,
      redis: redisStatus,
      circuits: {
        codeforces: codeforcesCircuit.getMetrics(),
        leetcode: leetcodeCircuit.getMetrics(),
        redis: redisCircuit.getMetrics(),
      },
      connectionBudget: getDatabaseConnectionBudget(),
      cache: appCache.getMetrics(),
      rateLimiter: getRateLimitMetrics(),
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        db: "disconnected",
        error: error.message || "Database connection check failed",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
