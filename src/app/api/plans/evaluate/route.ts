import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { PlanEvaluator } from "@/planning/evaluation/plan-evaluator";

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json().catch(() => ({}));
    let goalId = body.goalId;

    if (!goalId) {
      const activeGoal = await GoalService.getActiveGoal(userId);
      if (!activeGoal) {
        return NextResponse.json({ success: false, error: "No active goal found" }, { status: 400 });
      }
      goalId = activeGoal.id;
    }

    const outcome = await PlanEvaluator.evaluateGoalPlan(goalId);

    if (!outcome) {
      return NextResponse.json({ success: false, error: "No active plan to evaluate" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      outcome,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
