import prisma from "@/lib/prisma";
import { CreateGoalDTO, GoalProgressView, UpdateGoalDTO } from "./goal.types";
import { differenceInCalendarDays } from "date-fns";

export class GoalService {
  /**
   * Calculates honest progress metrics:
   * Current, Target, Gap (+/-), and Days remaining.
   * Avoids artificial fake percentage (e.g. 1284 / 1400 = 91.7%).
   */
  static calculateProgress(
    targetValue: number,
    currentValue: number,
    deadline: Date,
    startDate: Date = new Date()
  ) {
    const gap = targetValue - currentValue;
    const now = new Date();
    const daysRemaining = Math.max(0, differenceInCalendarDays(new Date(deadline), now));
    const isOverdue = now > new Date(deadline);

    return {
      currentValue,
      targetValue,
      gap,
      daysRemaining,
      isOverdue,
    };
  }

  /**
   * Resolves the user's current metric value from connected platform data.
   */
  static async resolveCurrentMetricValue(
    userId: string,
    targetMetric: string
  ): Promise<number> {
    if (targetMetric === "codeforces_rating") {
      const cfConn = await prisma.platformConnection.findUnique({
        where: { userId_platform: { userId, platform: "codeforces" } },
      });
      if (cfConn?.profileData) {
        try {
          const profile = JSON.parse(cfConn.profileData);
          if (typeof profile.rating === "number") return profile.rating;
        } catch {
          // ignore parsing error
        }
      }
      // Check contest history latest rating
      const latestContest = await prisma.contestHistory.findFirst({
        where: { userId, platform: "codeforces" },
        orderBy: { timestamp: "desc" },
      });
      if (latestContest) return latestContest.newRating;
      return 0;
    }

    if (targetMetric === "leetcode_solved_medium") {
      const count = await prisma.normalizedSubmission.count({
        where: {
          userId,
          platform: "leetcode",
          accepted: true,
          difficulty: "Medium",
        },
      });
      return count;
    }

    if (targetMetric === "leetcode_solved_total") {
      const count = await prisma.normalizedSubmission.count({
        where: {
          userId,
          platform: "leetcode",
          accepted: true,
        },
      });
      return count;
    }

    return 0;
  }

  /**
   * Creates a new goal for a user.
   */
  static async createGoal(dto: CreateGoalDTO) {
    const initialValue =
      dto.initialValue !== undefined
        ? dto.initialValue
        : await this.resolveCurrentMetricValue(dto.userId, dto.targetMetric);

    const goal = await prisma.goal.create({
      data: {
        userId: dto.userId,
        title: dto.title,
        category: dto.category,
        targetMetric: dto.targetMetric,
        targetValue: dto.targetValue,
        initialValue: initialValue,
        startDate: dto.startDate ?? new Date(),
        deadline: new Date(dto.deadline),
        availableHoursPerWeek: dto.availableHoursPerWeek,
        status: "active",
      },
    });

    return goal;
  }

  /**
   * Fetches all goals for a user with computed gap and remaining time.
   */
  static async getUserGoals(userId: string): Promise<GoalProgressView[]> {
    const goals = await prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const views: GoalProgressView[] = [];

    for (const g of goals) {
      const resolved = await this.resolveCurrentMetricValue(
        userId,
        g.targetMetric
      );
      const currentValue = resolved > 0 ? resolved : g.initialValue;
      const prog = this.calculateProgress(g.targetValue, currentValue, g.deadline, g.startDate);

      views.push({
        id: g.id,
        userId: g.userId,
        title: g.title,
        category: g.category,
        targetMetric: g.targetMetric,
        targetValue: g.targetValue,
        initialValue: g.initialValue,
        currentValue: prog.currentValue,
        gap: prog.gap,
        daysRemaining: prog.daysRemaining,
        isOverdue: prog.isOverdue,
        status: g.status,
        startDate: g.startDate.toISOString(),
        deadline: g.deadline.toISOString(),
        availableHoursPerWeek: g.availableHoursPerWeek,
      });
    }

    return views;
  }

  /**
   * Fetches single goal by ID with computed gap and progress.
   */
  static async getGoalById(
    goalId: string,
    userId: string
  ): Promise<GoalProgressView | null> {
    const g = await prisma.goal.findFirst({
      where: { id: goalId, userId },
    });

    if (!g) return null;

    const resolved = await this.resolveCurrentMetricValue(
      userId,
      g.targetMetric
    );
    const currentValue = resolved > 0 ? resolved : g.initialValue;
    const prog = this.calculateProgress(g.targetValue, currentValue, g.deadline, g.startDate);

    return {
      id: g.id,
      userId: g.userId,
      title: g.title,
      category: g.category,
      targetMetric: g.targetMetric,
      targetValue: g.targetValue,
      initialValue: g.initialValue,
      currentValue: prog.currentValue,
      gap: prog.gap,
      daysRemaining: prog.daysRemaining,
      isOverdue: prog.isOverdue,
      status: g.status,
      startDate: g.startDate.toISOString(),
      deadline: g.deadline.toISOString(),
      availableHoursPerWeek: g.availableHoursPerWeek,
    };
  }

  /**
   * Updates an existing goal.
   */
  static async updateGoal(goalId: string, userId: string, dto: UpdateGoalDTO) {
    return prisma.goal.update({
      where: { id: goalId },
      data: {
        ...(dto.title ? { title: dto.title } : {}),
        ...(dto.targetValue !== undefined ? { targetValue: dto.targetValue } : {}),
        ...(dto.deadline ? { deadline: new Date(dto.deadline) } : {}),
        ...(dto.availableHoursPerWeek !== undefined
          ? { availableHoursPerWeek: dto.availableHoursPerWeek }
          : {}),
        ...(dto.status ? { status: dto.status } : {}),
      },
    });
  }

  /**
   * Deletes a goal.
   */
  static async deleteGoal(goalId: string, userId: string) {
    return prisma.goal.delete({
      where: { id: goalId },
    });
  }
}
