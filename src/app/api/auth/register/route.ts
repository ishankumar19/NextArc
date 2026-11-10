import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { createSession, SESSION_COOKIE_NAME, SESSION_TTL_DAYS } from "@/lib/session";
import { apiError } from "@/lib/api-response";
import { applyRateLimit, AUTH_RATE_LIMIT } from "@/lib/rate-limit";
import { logRequest, logError } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const limited = applyRateLimit(req, AUTH_RATE_LIMIT);
  if (limited) return limited;

  const start = Date.now();
  let userId: string | null = null;
  let statusCode = 201;

  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      statusCode = 400;
      logRequest("POST", "/api/auth/register", null, Date.now() - start, statusCode);
      return apiError("A valid email address is required.", 400, "INVALID_EMAIL");
    }

    if (!password || typeof password !== "string" || password.length < 8 || password.length > 128) {
      statusCode = 400;
      logRequest("POST", "/api/auth/register", null, Date.now() - start, statusCode);
      return apiError("Password must be between 8 and 128 characters long.", 400, "INVALID_PASSWORD");
    }

    if (name && (typeof name !== "string" || name.length > 100)) {
      statusCode = 400;
      logRequest("POST", "/api/auth/register", null, Date.now() - start, statusCode);
      return apiError("Name cannot exceed 100 characters.", 400, "INVALID_NAME");
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      statusCode = 409;
      logRequest("POST", "/api/auth/register", null, Date.now() - start, statusCode);
      return apiError("An account with this email already exists.", 409, "USER_EXISTS");
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        name: typeof name === "string" ? name.trim() : null,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    const session = await createSession(user.id);
    userId = user.id;

    const response = NextResponse.json(
      {
        success: true,
        data: {
          user,
          sessionToken: session.sessionToken,
          expires: session.expires.toISOString(),
        },
      },
      { status: 201 }
    );

    // Set HTTP-only session cookie
    response.cookies.set(SESSION_COOKIE_NAME, session.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_TTL_DAYS * 24 * 60 * 60,
      path: "/",
    });

    logRequest("POST", "/api/auth/register", userId, Date.now() - start, statusCode);
    return response;
  } catch (error: any) {
    statusCode = 500;
    logError("auth/register", error);
    logRequest("POST", "/api/auth/register", userId, Date.now() - start, statusCode);
    return apiError(error.message || "Failed to register account.", 500);
  }
}
