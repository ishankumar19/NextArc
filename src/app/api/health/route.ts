import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { appCache } from "@/lib/cache";
import { getRateLimitMetrics } from "@/lib/rate-limit";

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

    return NextResponse.json({
      status: "ok",
      db: "connected",
      latencyMs,
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
