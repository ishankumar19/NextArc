import prisma from "@/lib/prisma";

/**
 * Resolves the active user ID for Phase 1.
 * Supports explicit 'x-user-id' header or 'userId' query parameter for multi-tenant isolation,
 * falling back to the active user in the database or creating a clean default user.
 */
export async function getActiveUserId(req?: Request): Promise<string> {
  if (req) {
    const headerUserId = req.headers.get("x-user-id");
    if (headerUserId && headerUserId.trim()) {
      return headerUserId.trim();
    }

    try {
      const url = new URL(req.url);
      const queryUserId = url.searchParams.get("userId");
      if (queryUserId && queryUserId.trim()) {
        return queryUserId.trim();
      }
    } catch {}
  }

  // Fallback to active demo/default user in local environment
  const user = await prisma.user.findFirst({
    where: { email: "demo@progress.dev" },
  });

  if (user) {
    return user.id;
  }

  const anyUser = await prisma.user.findFirst();
  if (anyUser) {
    return anyUser.id;
  }

  const created = await prisma.user.create({
    data: {
      id: "user_demo_1",
      email: "demo@progress.dev",
      name: "Demo Engineer",
    },
  });

  return created.id;
}

export const getCurrentUserId = getActiveUserId;

