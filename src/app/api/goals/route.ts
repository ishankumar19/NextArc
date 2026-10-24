import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const userId = await getActiveUserId(req);
    const goals = await GoalService.getUserGoals(userId);
    return apiSuccess(goals);
  } catch (err: any) {
    return apiError(err?.message || "Failed to retrieve goals", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getActiveUserId();
    const body = await req.json();

    const {
      title,
      category,
      targetMetric,
      targetValue,
      initialValue,
      deadline,
      availableHoursPerWeek,
    } = body;

    if (!title || !targetMetric || targetValue === undefined || !deadline) {
      return apiError(
        "Missing required fields: title, targetMetric, targetValue, and deadline are mandatory.",
        400,
        "VALIDATION_ERROR"
      );
    }

    const created = await GoalService.createGoal({
      userId,
      title: String(title).trim(),
      category: category || "competitive_programming",
      targetMetric,
      targetValue: Number(targetValue),
      initialValue: initialValue !== undefined ? Number(initialValue) : undefined,
      deadline: new Date(deadline),
      availableHoursPerWeek:
        availableHoursPerWeek !== undefined
          ? Number(availableHoursPerWeek)
          : undefined,
    });

    return apiSuccess(created, 201);
  } catch (err: any) {
    return apiError(err?.message || "Failed to create goal", 400);
  }
}
