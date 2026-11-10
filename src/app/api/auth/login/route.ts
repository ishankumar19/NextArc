import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { createSession, SESSION_COOKIE_NAME, SESSION_TTL_DAYS } from "@/lib/session";
import { apiError } from "@/lib/api-response";
import { applyRateLimit, AUTH_RATE_LIMIT } from "@/lib/rate-limit";
import { logRequest, logError } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const limited = applyRateLimit(req, AUTH_RATE_LIMIT);
  if (limited) return limited;

  const start = Date.now();
  let userId: string | null = null;
  let statusCode = 200;

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      statusCode = 400;
      logRequest("POST", "/api/auth/login", null, Date.now() - start, statusCode);
      return apiError("Email and password are required.", 400, "MISSING_CREDENTIALS");
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user || !user.passwordHash) {
      statusCode = 401;
      logRequest("POST", "/api/auth/login", null, Date.now() - start, statusCode);
      return apiError("Invalid email or password.", 401, "INVALID_CREDENTIALS");
    }

    if (typeof password === "string" && password.length > 128) {
      statusCode = 401;
      logRequest("POST", "/api/auth/login", null, Date.now() - start, statusCode);
      return apiError("Invalid email or password.", 401, "INVALID_CREDENTIALS");
    }

    const valid = await verifyPassword(String(password), user.passwordHash);
    if (!valid) {
      statusCode = 401;
      logRequest("POST", "/api/auth/login", null, Date.now() - start, statusCode);
      return apiError("Invalid email or password.", 401, "INVALID_CREDENTIALS");
    }

    const session = await createSession(user.id);
    userId = user.id;

    const response = NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          sessionToken: session.sessionToken,
          expires: session.expires.toISOString(),
        },
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set(SESSION_COOKIE_NAME, session.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_TTL_DAYS * 24 * 60 * 60,
      path: "/",
    });

    logRequest("POST", "/api/auth/login", userId, Date.now() - start, statusCode);
    return response;
  } catch (error: any) {
    statusCode = 500;
    logError("auth/login", error);
    logRequest("POST", "/api/auth/login", userId, Date.now() - start, statusCode);
    return apiError(error.message || "Failed to sign in.", 500);
  }
}
