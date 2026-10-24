import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { PlanRepository } from "@/planning/plan.repository";
import { TaskEvidenceMatcher } from "@/planning/matching/task-matcher";

export async function GET(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    const activeGoal = await GoalService.getActiveGoal(userId);

    if (!activeGoal) {
      return NextResponse.json({ success: true, plan: null, message: "No active goal" });
    }

    // Refresh matching against latest activity
    await TaskEvidenceMatcher.matchTasksForGoal(activeGoal.id);

    const plan = await PlanRepository.getActivePlan(activeGoal.id);

    return NextResponse.json({
      success: true,
      plan,
      goal: activeGoal,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
