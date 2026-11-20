import prisma from "@/lib/prisma";
import { SESSION_COOKIE_NAME, validateSession, SessionWithUser } from "@/lib/session";
import { AuthenticationError } from "@/lib/errors";
import { cache } from "react";

/**
 * Extracts a session token from either Authorization header or Cookie header.
 */
export function extractSessionToken(req: Request): string | null {
  // 1. Bearer token
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    if (token) return token;
  }

  // 2. Cookie: auth_session=<token>
  const cookieHeader = req.headers.get("cookie");
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").map((c) => c.trim());
    for (const cookie of cookies) {
      const [name, ...valParts] = cookie.split("=");
      if (name.trim() === SESSION_COOKIE_NAME) {
        const val = valParts.join("=").trim();
        if (val) return decodeURIComponent(val);
      }
    }
  }

  return null;
}

/**
 * Resolves the authenticated session from the incoming request or Server Component cookies.
 * Clients CANNOT spoof identity via `x-user-id` or `?userId=`.
 * Dev demo user fallback is strictly fail-closed: only allowed when
 * NODE_ENV !== "production" AND ALLOW_DEV_DEMO_USER === "true".
 * Wrapped in React cache() to memoize per-render-pass calls in Server Components.
 */
export const resolveSession = cache(async (req?: Request): Promise<SessionWithUser | null> => {
  let token: string | null = null;

  if (req) {
    token = extractSessionToken(req);
  } else {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      token = cookieStore.get(SESSION_COOKIE_NAME)?.value || null;
    } catch {
      // outside Next.js request context (e.g. tests or standalone scripts)
    }
  }

  if (token) {
    const session = await validateSession(token);
    if (session) {
      return session;
    }
  }

  // Strict fail-closed check for dev demo mode
  const isProduction = process.env.NODE_ENV === "production";
  const allowDevDemo = process.env.ALLOW_DEV_DEMO_USER === "true";

  if (!isProduction && allowDevDemo) {
    const demoUser = await getOrCreateDevDemoUser();
    return {
      id: "dev_demo_session",
      sessionToken: "dev_demo_token",
      userId: demoUser.id,
      expires: new Date(Date.now() + 86400000),
      user: {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
      },
    };
  }

  return null;
});

/**
 * Requires an authenticated user session. Throws AuthenticationError if absent or invalid.
 */
export async function requireAuth(req: Request): Promise<SessionWithUser> {
  const session = await resolveSession(req);
  if (!session) {
    throw new AuthenticationError("Authentication required. Please provide a valid session.");
  }
  return session;
}

/**
 * Derives the verified active userId from the session.
 */
export async function getActiveUserId(req?: Request): Promise<string> {
  const session = await resolveSession(req);
  if (!session) {
    throw new AuthenticationError("Authentication required. Please sign in.");
  }
  return session.userId;
}

export const getCurrentUserId = getActiveUserId;

/**
 * Internal helper to resolve or create the development demo user.
 * Only callable when ALLOW_DEV_DEMO_USER === "true" and NODE_ENV !== "production".
 */
async function getOrCreateDevDemoUser() {
  const user = await prisma.user.findFirst({
    where: { email: "demo@progress.dev" },
  });

  if (user) {
    return user;
  }

  return prisma.user.create({
    data: {
      id: "user_demo_1",
      email: "demo@progress.dev",
      name: "Demo Engineer",
    },
  });
}
