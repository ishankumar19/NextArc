import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { createSession, SESSION_COOKIE_NAME, SESSION_TTL_DAYS } from "@/lib/session";
import { apiError } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return apiError("A valid email address is required.", 400, "INVALID_EMAIL");
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return apiError("Password must be at least 8 characters long.", 400, "INVALID_PASSWORD");
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return apiError("An account with this email already exists.", 409, "USER_EXISTS");
    }

    const passwordHash = hashPassword(password);

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

    return response;
  } catch (error: any) {
    return apiError(error.message || "Failed to register account.", 500);
  }
}
