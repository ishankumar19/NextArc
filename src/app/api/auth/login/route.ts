import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { createSession, SESSION_COOKIE_NAME, SESSION_TTL_DAYS } from "@/lib/session";
import { apiError } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return apiError("Email and password are required.", 400, "MISSING_CREDENTIALS");
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user || !user.passwordHash) {
      return apiError("Invalid email or password.", 401, "INVALID_CREDENTIALS");
    }

    const valid = verifyPassword(String(password), user.passwordHash);
    if (!valid) {
      return apiError("Invalid email or password.", 401, "INVALID_CREDENTIALS");
    }

    const session = await createSession(user.id);

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

    return response;
  } catch (error: any) {
    return apiError(error.message || "Failed to sign in.", 500);
  }
}
