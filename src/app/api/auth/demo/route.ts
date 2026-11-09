import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createSession, SESSION_COOKIE_NAME, SESSION_TTL_DAYS } from "@/lib/session";
import { apiError } from "@/lib/api-response";
import { applyRateLimit, AUTH_RATE_LIMIT } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const limited = applyRateLimit(req, AUTH_RATE_LIMIT);
  if (limited) return limited;

  // Demo login is allowed when not in production, or when ALLOW_DEV_DEMO_USER is true
  const isProduction = process.env.NODE_ENV === "production";
  const allowDevDemo = process.env.ALLOW_DEV_DEMO_USER === "true";

  if (isProduction && !allowDevDemo) {
    return apiError("Demo access is disabled in production.", 403, "FORBIDDEN");
  }

  let demoUser = await prisma.user.findFirst({
    where: { email: "demo@progress.dev" },
  });

  if (!demoUser) {
    demoUser = await prisma.user.create({
      data: {
        id: "user_demo_1",
        email: "demo@progress.dev",
        name: "Demo Engineer",
      },
    });
  }

  const session = await createSession(demoUser.id);

  const response = NextResponse.json({
    success: true,
    data: {
      user: {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
      },
      sessionToken: session.sessionToken,
      expires: session.expires.toISOString(),
    },
  });

  // Set HTTP-only session cookie
  response.cookies.set(SESSION_COOKIE_NAME, session.sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_TTL_DAYS * 24 * 60 * 60,
    path: "/",
  });

  return response;
}
