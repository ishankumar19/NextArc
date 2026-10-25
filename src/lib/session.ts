import crypto from "node:crypto";
import prisma from "@/lib/prisma";

export const SESSION_COOKIE_NAME = "auth_session";
export const SESSION_TTL_DAYS = 30;

export interface SessionWithUser {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: {
    id: string;
    email: string;
    name: string | null;
  };
}

/**
 * Creates a cryptographically secure 32-byte session token and saves it in the database.
 */
export async function createSession(
  userId: string,
  ttlDays: number = SESSION_TTL_DAYS
): Promise<{ sessionToken: string; expires: Date; sessionId: string }> {
  const sessionToken = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);

  const session = await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expires,
    },
  });

  return {
    sessionId: session.id,
    sessionToken: session.sessionToken,
    expires: session.expires,
  };
}

/**
 * Validates a session token.
 * If expired, destroys the session and returns null.
 */
export async function validateSession(
  sessionToken: string
): Promise<SessionWithUser | null> {
  if (!sessionToken || typeof sessionToken !== "string") {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  // Check expiration
  if (session.expires.getTime() < Date.now()) {
    await prisma.session.delete({
      where: { id: session.id },
    }).catch(() => {});
    return null;
  }

  return session as SessionWithUser;
}

/**
 * Destroys a session by its token (e.g. on logout).
 */
export async function destroySession(sessionToken: string): Promise<boolean> {
  if (!sessionToken) return false;
  try {
    await prisma.session.delete({
      where: { sessionToken },
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Deletes all sessions for a user (e.g., password change or account reset).
 */
export async function destroyAllUserSessions(userId: string): Promise<number> {
  const result = await prisma.session.deleteMany({
    where: { userId },
  });
  return result.count;
}

/**
 * Background / cleanup task for expired sessions.
 */
export async function cleanupExpiredSessions(): Promise<number> {
  const result = await prisma.session.deleteMany({
    where: {
      expires: {
        lt: new Date(),
      },
    },
  });
  return result.count;
}
