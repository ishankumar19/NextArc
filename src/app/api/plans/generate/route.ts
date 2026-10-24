import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { ProgressContextService } from "@/goals/progress-context.service";
import { SignalEngine } from "@/planning/signals/signal.engine";
import { PlannerService } from "@/planning/planner.service";
import { PlanRepository } from "@/planning/plan.repository";

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

    // 1. Generate Context
    const context = await ProgressContextService.generateContext(userId, goalId);

    // 2. Extract Deterministic Signals
    const signals = SignalEngine.extractSignals(context);

    // 3. Generate Plan
    const planData = await PlannerService.generatePlan({
      context,
      signals,
    });

    // 4. Persist Plan
    const savedPlan = await PlanRepository.createPlan({
      userId,
      goalId,
      planData,
    });

    return NextResponse.json({
      success: true,
      plan: savedPlan,
      signals,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
