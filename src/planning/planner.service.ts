import { ProgressContextV1 } from "@/goals/progress-context.types";
import { ProgressSignal } from "./signals.types";
import { AdaptivePlanV1, PlanTask } from "./plan.types";
import { PlanValidator } from "./plan.validator";
import { PlanOutcome } from "./evaluation/evaluation.types";
import { buildPlannerSystemPrompt, buildPlannerUserMessage } from "./prompts/planner-prompt";
import { getDailyProblemForCriteria } from "./problems/problem-catalog";

export interface GeneratePlanParams {
  context: ProgressContextV1;
  signals: ProgressSignal[];
  previousPlan?: AdaptivePlanV1 | null;
  previousOutcome?: PlanOutcome | null;
}

export class DeterministicPlanner {
  /**
   * Deterministically generates a compliant AdaptivePlanV1 from signals and context.
   * Handles adaptation scenarios A through H:
   * A - Plan worked -> progress difficulty
   * B - Plan completed but metric did not improve -> maintain difficulty, consolidate
   * C - Plan not completed -> maintain strategy, consolidate workload
   * D - Insufficient evidence -> collect more evidence, do not aggressively adapt
   * E - Conflicting evidence (practice AC high, rating dropped) -> focus on contest execution
   * F - Zero activity -> maintain plan, do not invent new technical weakness
   * G - Deadline approaching -> strictly respect available weekly hours budget
   * H - Goal already achieved -> maintenance milestone
   */
  static generatePlan(params: GeneratePlanParams): AdaptivePlanV1 {
    const { context, signals, previousPlan, previousOutcome } = params;
    const now = new Date();
    const versionNumber = (previousPlan?.versionNumber ?? 0) + 1;
    const availableHours = context.goal.availableHoursPerWeek ?? 10;
    const generatedAt = context.goal.startDate ? new Date(context.goal.startDate).toISOString() : now.toISOString();

    // SCENARIO H: Goal already achieved
    const isGoalAchieved = context.goal.gap <= 0 || (context.goal.currentValue >= context.goal.targetValue);
    if (isGoalAchieved) {
      const maintProblem = getDailyProblemForCriteria(
        "codeforces",
        Math.max(800, context.goal.targetValue - 100),
        context.goal.targetValue,
        ["greedy", "binary-search"],
        now
      );
      const maintTitle = maintProblem
        ? `Solve ${maintProblem.id} - ${maintProblem.name} (CF ${maintProblem.rating} • ${maintProblem.topics[0]})`
        : "Maintain core rating consistency with 1 problem in your target tier";

      const maintenanceTask: PlanTask = {
        id: `task-${versionNumber}-maintenance`,
        type: "practice",
        title: maintTitle,
        quantity: 1,
        platform: "codeforces",
        difficulty: { min: Math.max(800, context.goal.targetValue - 100), max: context.goal.targetValue },
        topics: ["greedy", "binary-search"],
        reason: maintProblem
          ? `Target metric achieved. Today's daily maintenance problem is ${maintProblem.id} - ${maintProblem.name} (rotates daily).`
          : `Target metric of ${context.goal.targetValue} has already been achieved. Plan focus is on skill maintenance.`,
        evidenceReferences: [signals[0]?.id ?? "sig-goal-achieved"],
        completionMetric: "cf_target_maintenance_solves",
        problemId: maintProblem?.id,
        problemName: maintProblem ? `${maintProblem.id} - ${maintProblem.name}` : undefined,
        problemUrl: maintProblem?.url,
        problemRating: maintProblem?.rating,
        dailyDate: now.toISOString().slice(0, 10),
      };

      const achievedPlan: AdaptivePlanV1 = {
        schemaVersion: "1.0.0",
        generatedAt,
        goalId: context.goal.id,
        versionNumber,
        assessment: {
          summary: `Goal '${context.goal.title}' is achieved (Current: ${context.goal.currentValue} vs Target: ${context.goal.targetValue}). Practice shifted to skill maintenance.`,
          confidence: "high",
        },
        primaryBottleneck: {
          type: "goal_achieved",
          description: `User has achieved the target ${context.goal.targetMetric} of ${context.goal.targetValue}.`,
          evidence: [
            {
              signalId: signals[0]?.id ?? "sig-goal-achieved",
              description: `Current metric value is ${context.goal.currentValue}, meeting or exceeding target ${context.goal.targetValue}.`,
              metric: context.goal.targetMetric,
              value: context.goal.currentValue,
            },
          ],
        },
        nextMilestone: {
          description: "Skill Maintenance & Next Tier Preparation",
          successCriteria: [
            {
              criterion: "Complete maintenance problem set",
              metric: "maintenance_solves",
              targetValue: 3,
            },
          ],
        },
        weeklyTargets: [
          {
            area: "Maintenance",
            targetDescription: "Light consistency practice to maintain current rating level.",
            expectedEffortHours: Math.min(availableHours, 3),
          },
        ],
        tasks: [maintenanceTask],
        reviewPolicy: { reviewAfterDays: 14, reviewAfterEvents: 1 },
      };

      return achievedPlan;
    }

    // 1. Identify primary bottleneck from signals
    const dropoffSignal = signals.find((s) => s.type === "difficulty_dropoff");
    const underexposedTopicSignal = signals.find((s) => s.type === "underexposed_topic");
    const lowContestSignal = signals.find((s) => s.type === "low_contest_frequency");

    let bottleneckType = "difficulty_dropoff";
    let bottleneckDesc = "Performance drop-off at boundary difficulty bracket.";
    const evidenceRefs: Array<{ signalId: string; description: string; metric: string; value: string | number }> = [];

    if (dropoffSignal) {
      bottleneckType = "difficulty_dropoff";
      const desc = typeof dropoffSignal.evidence === "string" 
        ? dropoffSignal.evidence 
        : (dropoffSignal.evidence?.description || "Performance drop-off at boundary difficulty bracket.");
      bottleneckDesc = desc;
      evidenceRefs.push({
        signalId: dropoffSignal.id,
        description: desc,
        metric: dropoffSignal.metric,
        value: dropoffSignal.value,
      });
    } else if (underexposedTopicSignal) {
      bottleneckType = "underexposed_topic";
      const desc = typeof underexposedTopicSignal.evidence === "string" 
        ? underexposedTopicSignal.evidence 
        : (underexposedTopicSignal.evidence?.description || "Underexposed topic requires practice volume.");
      bottleneckDesc = desc;
      evidenceRefs.push({
        signalId: underexposedTopicSignal.id,
        description: desc,
        metric: underexposedTopicSignal.metric,
        value: underexposedTopicSignal.value,
      });
    } else {
      bottleneckType = "difficulty_stagnation";
      bottleneckDesc = "Practice volume is heavily concentrated on problems below stretch difficulty.";
      evidenceRefs.push({
        signalId: signals[0]?.id ?? "sig-default",
        description: "Practice distribution lacks targeted exposure in current target range.",
        metric: "goal_gap",
        value: context.goal.gap,
      });
    }

    // 2. Base difficulty and topics
    let minDiff = 1300;
    let maxDiff = 1400;
    let practiceTopic = "greedy";

    if (context.goal.targetMetric === "codeforces_rating") {
      const currentRating = context.currentState?.codeforcesRating || context.goal.currentValue || 1200;
      minDiff = Math.max(800, Math.floor(currentRating / 100) * 100);
      maxDiff = minDiff + 100;
    }

    // ADAPTATION LOGIC (Scenarios A, B, C, D, E, F)
    let assessmentSummary = `Initial baseline plan addressing key bottleneck in ${bottleneckType}.`;

    if (previousOutcome) {
      const hadZeroActivity = previousOutcome.evidenceCollected.totalProblemsSolvedInPeriod === 0 && previousOutcome.evidenceCollected.contestsParticipated === 0;
      const isInsufficient = previousOutcome.insufficientEvidence || hadZeroActivity;

      if (hadZeroActivity) {
        // SCENARIO F: Zero activity
        assessmentSummary = `Zero activity recorded in previous plan window. Retaining baseline plan without creating unverified technical assumptions.`;
      } else if (isInsufficient) {
        // SCENARIO D: Insufficient evidence
        assessmentSummary = `Insufficient evidence collected (${previousOutcome.evidenceCollected.totalProblemsSolvedInPeriod} solves, ${previousOutcome.evidenceCollected.contestsParticipated} contests). Retaining targets to collect adequate evidence.`;
      } else if (previousOutcome.completionRate >= 80 && previousOutcome.metricChanges.ratingDelta >= 0) {
        // SCENARIO A: Plan worked -> Step up difficulty!
        minDiff += 50;
        maxDiff += 50;
        practiceTopic = "binary-search";
        assessmentSummary = `Plan v${previousPlan?.versionNumber ?? 1} completed successfully with positive rating delta (+${previousOutcome.metricChanges.ratingDelta}). Advancing difficulty to ${minDiff}-${maxDiff}.`;
      } else if (previousOutcome.completionRate >= 80 && previousOutcome.metricChanges.ratingDelta < 0) {
        // SCENARIO B & E: High task completion but metric worsened -> Conflicting evidence! Do NOT increase difficulty!
        assessmentSummary = `Conflicting evidence: Practice tasks completed (${previousOutcome.completionRate}%), but rating decreased (${previousOutcome.metricChanges.ratingDelta}). Maintaining difficulty at ${minDiff}-${maxDiff} with focus on contest time management.`;
      } else if (previousOutcome.completionRate < 50) {
        // SCENARIO C: Plan not completed -> Consolidate workload, maintain strategy
        assessmentSummary = `Plan completion was low (${previousOutcome.completionRate}%). Maintaining focus on ${practiceTopic} and consolidating target workload.`;
      } else {
        assessmentSummary = `Moderate completion observed (${previousOutcome.completionRate}%). Continuing targeted reinforcement on ${practiceTopic}.`;
      }
    }

    // 3. Strict Workload Budgeting (Section 9)
    // Heuristics: ~48 mins (0.8 hrs) per problem, 2.0 hrs per contest.
    // Must strictly respect availableHoursPerWeek.
    let contestAllowed = (context.goal.category === "competitive_programming" || context.goal.targetMetric.includes("rating")) && availableHours >= 4;
    let availableForProblems = contestAllowed ? Math.max(1, availableHours - 2) : availableHours;
    let totalProblemBudget = Math.max(2, Math.floor(availableForProblems / 0.8));

    // Cap problem budget for low hours:
    if (availableHours <= 2) {
      contestAllowed = false;
      totalProblemBudget = 2; // 2 * 0.8 = 1.6 hrs <= 2 hrs
    } else if (availableHours <= 5) {
      totalProblemBudget = Math.min(3, totalProblemBudget); // 3 * 0.8 + 2 = 4.4 hrs <= 5 hrs
    } else if (availableHours <= 10) {
      totalProblemBudget = Math.min(8, totalProblemBudget); // 8 * 0.8 + 2 = 8.4 hrs <= 10 hrs
    } else {
      totalProblemBudget = Math.min(16, totalProblemBudget); // 16 * 0.8 + 2 = 14.8 hrs <= 20 hrs
    }

    const primaryTaskQty = totalProblemBudget === 2 ? 1 : Math.max(1, Math.ceil(totalProblemBudget * 0.6));
    const secondaryTaskQty = totalProblemBudget === 2 ? 1 : Math.max(1, totalProblemBudget - primaryTaskQty);

    const primaryProblem = getDailyProblemForCriteria(
      "codeforces",
      minDiff,
      maxDiff,
      [practiceTopic],
      now
    );

    const secondaryProblem = getDailyProblemForCriteria(
      "codeforces",
      minDiff,
      maxDiff,
      ["two-pointers", "binary-search"],
      now
    );

    const primaryTitle = primaryProblem
      ? `Solve ${primaryProblem.id} - ${primaryProblem.name} (CF ${primaryProblem.rating} • ${practiceTopic})`
      : `Solve ${primaryTaskQty} Codeforces problems rated ${minDiff}–${maxDiff} in ${practiceTopic}`;

    const secondaryTitle = secondaryProblem
      ? `Solve ${secondaryProblem.id} - ${secondaryProblem.name} (CF ${secondaryProblem.rating} • ${secondaryProblem.topics[0]})`
      : `Solve ${secondaryTaskQty} problems focusing on Two Pointers / Binary Search`;

    const tasks: PlanTask[] = [
      {
        id: `task-${versionNumber}-1`,
        type: "practice",
        title: primaryTitle,
        quantity: 1,
        platform: "codeforces",
        difficulty: { min: minDiff, max: maxDiff },
        topics: [practiceTopic],
        reason: dropoffSignal
          ? `Your success rate at rating ${minDiff} drops significantly, and '${practiceTopic}' has limited recent exposure. Today's problem is ${primaryProblem?.id ?? "158A"} - ${primaryProblem?.name ?? "Next Round"} (rotates daily).`
          : `Targeted daily problem to establish consistency at ${minDiff}-${maxDiff} (rotates daily).`,
        evidenceReferences: evidenceRefs.map((e) => e.signalId),
        completionMetric: `cf_${minDiff}_${practiceTopic}_solves`,
        problemId: primaryProblem?.id,
        problemName: primaryProblem ? `${primaryProblem.id} - ${primaryProblem.name}` : undefined,
        problemUrl: primaryProblem?.url,
        problemRating: primaryProblem?.rating,
        dailyDate: now.toISOString().slice(0, 10),
      },
      {
        id: `task-${versionNumber}-2`,
        type: "practice",
        title: secondaryTitle,
        quantity: 1,
        platform: "codeforces",
        difficulty: { min: minDiff, max: maxDiff },
        topics: ["two-pointers", "binary-search"],
        reason: secondaryProblem
          ? `Reinforces foundational problem patterns with today's daily focus: ${secondaryProblem.id} - ${secondaryProblem.name} (rotates daily).`
          : "Reinforces foundational problem patterns that appear frequently alongside current stretch difficulty.",
        evidenceReferences: [evidenceRefs[0]?.signalId ?? "sig-default"],
        completionMetric: "cf_two_pointers_binary_search_solves",
        problemId: secondaryProblem?.id,
        problemName: secondaryProblem ? `${secondaryProblem.id} - ${secondaryProblem.name}` : undefined,
        problemUrl: secondaryProblem?.url,
        problemRating: secondaryProblem?.rating,
        dailyDate: now.toISOString().slice(0, 10),
      },
    ];

    if (contestAllowed) {
      tasks.push({
        id: `task-${versionNumber}-3`,
        type: "contest",
        title: "Participate in 1 official rated Codeforces contest",
        quantity: 1,
        platform: "codeforces",
        reason: lowContestSignal
          ? "You have only 1 or fewer rated contests in the last 30 days. Rating movement requires contest participation."
          : "Regular contest practice evaluates progress under real-time constraints.",
        evidenceReferences: [lowContestSignal?.id ?? evidenceRefs[0]?.signalId ?? "sig-default"],
        completionMetric: "cf_rated_contests",
      });
    }

    const plan: AdaptivePlanV1 = {
      schemaVersion: "1.0.0",
      generatedAt,
      goalId: context.goal.id,
      versionNumber,
      assessment: {
        summary: assessmentSummary,
        confidence: evidenceRefs.length > 0 ? "high" : "medium",
      },
      primaryBottleneck: {
        type: bottleneckType,
        description: bottleneckDesc,
        evidence: evidenceRefs,
      },
      nextMilestone: {
        description: `Achieve consistent >=60% solve rate on ${minDiff}-rated problems.`,
        successCriteria: [
          {
            criterion: `Solve at least ${primaryTaskQty} problems rated ${minDiff}-${maxDiff}`,
            metric: `cf_${minDiff}_solves`,
            targetValue: primaryTaskQty,
          },
        ],
      },
      weeklyTargets: [
        {
          area: `${practiceTopic.toUpperCase()} & ${minDiff} Difficulty`,
          targetDescription: `Targeted practice on ${minDiff}-${maxDiff} problems within available ${availableHours} weekly hours.`,
          expectedEffortHours: Math.min(availableHours, 8),
        },
      ],
      tasks,
      reviewPolicy: {
        reviewAfterDays: 7,
        reviewAfterEvents: 2,
      },
    };

    const validSignalIds = signals.map((s) => s.id);
    const signalConfidenceMap: Record<string, "high" | "medium" | "low"> = {};
    for (const s of signals) {
      signalConfidenceMap[s.id] = s.confidence.level;
    }

    const validation = PlanValidator.validate(plan, {
      availableHoursPerWeek: availableHours,
      validSignalIds,
      signalConfidenceMap,
    });

    if (!validation.success) {
      throw new Error(`Generated plan failed validation: ${validation.errors?.join(", ")}`);
    }

    return plan;
  }
}

export class PlannerService {
  /**
   * Generates or adapts an AdaptivePlanV1 using LLM reasoning (when API key is present)
   * or the DeterministicPlanner fallback.
   */
  static async generatePlan(params: GeneratePlanParams): Promise<AdaptivePlanV1> {
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return DeterministicPlanner.generatePlan(params);
    }

    try {
      const systemPrompt = buildPlannerSystemPrompt();
      const userMessage = buildPlannerUserMessage(params);

      let rawOutput = "";

      if (process.env.GEMINI_API_KEY) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                { role: "user", parts: [{ text: `${systemPrompt}\n\nContext:\n${userMessage}` }] },
              ],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Gemini API returned status ${response.status}`);
        }

        const data = await response.json();
        rawOutput = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      } else if (process.env.OPENAI_API_KEY) {
        const baseUrl = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
        const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
        const response = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model,
            response_format: { type: "json_object" },
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userMessage },
            ],
            temperature: 0.2,
          }),
        });

        if (!response.ok) {
          throw new Error(`OpenAI API returned status ${response.status}`);
        }

        const data = await response.json();
        rawOutput = data.choices?.[0]?.message?.content ?? "";
      }

      // Sanitize potential markdown-wrapped JSON (e.g. ```json ... ```)
      let cleanJson = rawOutput.trim();
      if (cleanJson.startsWith("```")) {
        cleanJson = cleanJson.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
      }

      const parsed = JSON.parse(cleanJson);

      const validSignalIds = params.signals.map((s) => s.id);
      const signalConfidenceMap: Record<string, "high" | "medium" | "low"> = {};
      for (const s of params.signals) {
        signalConfidenceMap[s.id] = s.confidence.level;
      }

      const validation = PlanValidator.validate(parsed, {
        availableHoursPerWeek: params.context.goal.availableHoursPerWeek ?? 10,
        validSignalIds,
        signalConfidenceMap,
      });

      if (validation.success && validation.data) {
        return validation.data;
      }

      console.warn("LLM output failed validation, safely falling back to DeterministicPlanner:", validation.errors);
      return DeterministicPlanner.generatePlan(params);
    } catch (err) {
      console.warn("LLM API call failed, safely falling back to DeterministicPlanner:", err);
      return DeterministicPlanner.generatePlan(params);
    }
  }
}
