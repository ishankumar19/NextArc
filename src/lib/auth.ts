import prisma from "@/lib/prisma";

/**
 * Resolves the active user ID for Phase 1.
 * Defaults to the seeded demo user ("user_demo_1") or the first user in the database.
 */
export async function getActiveUserId(): Promise<string> {
  const user = await prisma.user.findFirst({
    where: { email: "demo@progress.dev" },
  });

  if (user) {
    return user.id;
  }

  // Fallback to first user
  const anyUser = await prisma.user.findFirst();
  if (anyUser) {
    return anyUser.id;
  }

  // Create demo user if none exists
  const created = await prisma.user.create({
    data: {
      id: "user_demo_1",
      email: "demo@progress.dev",
      name: "Demo Engineer",
    },
  });

  return created.id;
}
