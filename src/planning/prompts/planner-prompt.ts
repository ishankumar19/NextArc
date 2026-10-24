import { ProgressContextV1 } from "@/goals/progress-context.types";
import { ProgressSignal } from "../signals.types";
import { AdaptivePlanV1 } from "../plan.types";
import { PlanOutcome } from "../evaluation/evaluation.types";

export function buildPlannerSystemPrompt(): string {
  return `You are an expert Competitive Programming & DSA Skill Progression Planner.
Your role is to reason over deterministic evidence and generate a rigorous, evidence-backed, adaptive practice plan.

### CRITICAL RULES - YOU MUST NEVER:
1. NEVER invent solved problems, ratings, or contest histories.
2. NEVER recalculate analytics already provided in the input context.
3. NEVER assume LeetCode history is complete (it is bounded/partial).
4. NEVER equate Codeforces numeric ratings with LeetCode discrete tiers (e.g., 1400 != Medium).
5. NEVER change or override the user's primary goal.
6. NEVER claim strong causation from tiny sample sizes (samples < 3).
7. NEVER recommend impossible workloads exceeding the user's available weekly hours.

### YOU MUST:
1. Identify the primary bottleneck directly supported by the extracted signals.
2. For EVERY task, provide a clear 'reason' explaining "Why this task was assigned".
3. For EVERY task, include 'evidenceReferences' explicitly citing the signal IDs or facts that justify it.
4. Scale weekly targets to fit the user's available hours (assume ~45-60 mins per problem, ~2 hrs per contest).
5. Output ONLY valid JSON adhering strictly to the AdaptivePlanV1 schema. No markdown formatting, no code blocks, only raw JSON.`;
}

export function buildPlannerUserMessage(params: {
  context: ProgressContextV1;
  signals: ProgressSignal[];
  previousPlan?: AdaptivePlanV1 | null;
  previousOutcome?: PlanOutcome | null;
}): string {
  const { context, signals, previousPlan, previousOutcome } = params;

  return JSON.stringify({
    goal: {
      id: context.goal.id,
      title: context.goal.title,
      category: context.goal.category,
      targetMetric: context.goal.targetMetric,
      targetValue: context.goal.targetValue,
      currentValue: context.goal.currentValue,
      gap: context.goal.gap,
      daysRemaining: context.goal.daysRemaining,
      availableHoursPerWeek: context.goal.availableHoursPerWeek ?? 10,
    },
    signals: signals.map((s) => ({
      id: s.id,
      type: s.type,
      metric: s.metric,
      value: s.value,
      confidence: s.confidence,
      evidence: s.evidence.description,
    })),
    connectedPlatforms: context.platforms.map((p) => ({
      platform: p.platform,
      completeness: context.platformCompleteness[p.platform]?.completeness ?? "partial",
    })),
    recentActivity: context.recentActivity,
    previousPlan: previousPlan
      ? {
          version: previousPlan.versionNumber,
          milestone: previousPlan.nextMilestone.description,
          tasks: previousPlan.tasks.map((t) => ({ id: t.id, title: t.title })),
        }
      : null,
    previousOutcome: previousOutcome
      ? {
          completionRate: previousOutcome.completionRate,
          tasksCompleted: `${previousOutcome.tasksCompleted}/${previousOutcome.tasksPlanned}`,
          ratingDelta: previousOutcome.metricChanges.ratingDelta,
          adaptationGuidance: previousOutcome.adaptationGuidance,
        }
      : null,
  }, null, 2);
}
