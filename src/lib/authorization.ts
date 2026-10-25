import prisma from "@/lib/prisma";
import { NotFoundError, AuthorizationError } from "@/lib/errors";

/**
 * Asserts that the specified goal belongs to the authenticated user.
 * Returns the Goal record if authorized, or throws NotFoundError.
 */
export async function assertGoalOwnership(goalId: string, userId: string) {
  if (!goalId || !userId) {
    throw new NotFoundError("Goal not found.");
  }

  const goal = await prisma.goal.findUnique({
    where: { id: goalId },
  });

  if (!goal || goal.userId !== userId) {
    // Return 404 to prevent resource enumeration / existence disclosure
    throw new NotFoundError("Goal not found.");
  }

  return goal;
}

/**
 * Asserts that the specified plan belongs to the authenticated user.
 * Returns the Plan record if authorized, or throws NotFoundError.
 */
export async function assertPlanOwnership(planId: string, userId: string) {
  if (!planId || !userId) {
    throw new NotFoundError("Plan not found.");
  }

  const plan = await prisma.plan.findUnique({
    where: { id: planId },
    include: {
      goal: true,
    },
  });

  if (!plan || plan.userId !== userId) {
    throw new NotFoundError("Plan not found.");
  }

  return plan;
}

/**
 * Asserts that the specified platform connection belongs to the authenticated user.
 */
export async function assertPlatformOwnership(userId: string, platform: string) {
  if (!platform || !userId) {
    throw new NotFoundError("Platform connection not found.");
  }

  const connection = await prisma.platformConnection.findUnique({
    where: {
      userId_platform: {
        userId,
        platform,
      },
    },
  });

  if (!connection) {
    throw new NotFoundError(`Platform connection for '${platform}' not found.`);
  }

  return connection;
}
