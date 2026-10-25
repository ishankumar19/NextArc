import { NextRequest, NextResponse } from "next/server";
import { extractSessionToken } from "@/lib/auth";
import { destroySession, SESSION_COOKIE_NAME } from "@/lib/session";

export async function POST(req: NextRequest) {
  const token = extractSessionToken(req);

  if (token) {
    await destroySession(token);
  }

  const response = NextResponse.json({
    success: true,
    data: { message: "Successfully logged out." },
  });

  // Clear session cookie
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
