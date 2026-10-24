import { describe, it, expect } from "vitest";
import { PlanValidator } from "@/planning/plan.validator";
import { AdaptivePlanV1 } from "@/planning/plan.types";

describe("Milestone 7: AdaptivePlanV1 Contract & Validator", () => {
  const validPlan: AdaptivePlanV1 = {
    schemaVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    goalId: "goal-123",
    versionNumber: 1,
    assessment: {
      summary: "Strong performance on 1200 rating but clear drop-off at 1300 bracket.",
      confidence: "high",
    },
    primaryBottleneck: {
      type: "difficulty_dropoff",
      description: "Sharp success drop-off on Codeforces 1300-rated problems (38% vs 81% on 1200).",
      evidence: [
        {
          signalId: "sig-diff-drop-cf-1300",
          description: "Codeforces 1300 success rate is 38% across 13 attempts, dropping from 81% at 1200.",
          metric: "codeforces_difficulty_1300",
          value: "38%",
        },
      ],
    },
    nextMilestone: {
      description: "Achieve >= 60% consistency on 1300-rated Codeforces problems.",
      successCriteria: [
        {
          criterion: "Solve at least 5 problems rated 1300 with fewer than 3 incorrect submissions each",
          metric: "cf_1300_solve_count",
          targetValue: 5,
        },
      ],
    },
    weeklyTargets: [
      {
        area: "Greedy & 1300 Problems",
        targetDescription: "Complete targeted 1300-rated practice with focus on Greedy and Two Pointers.",
        expectedEffortHours: 8,
      },
    ],
    tasks: [
      {
        id: "task-1",
        type: "practice",
        title: "Solve 5 Codeforces problems rated 1300–1400 in Greedy",
        quantity: 5,
        platform: "codeforces",
        difficulty: { min: 1300, max: 1400 },
        topics: ["greedy"],
        reason: "1300 success rate is currently 38%, and Greedy solves in the last 30 days is only 2.",
        evidenceReferences: ["sig-diff-drop-cf-1300", "sig-topic-underexposed-greedy"],
        completionMetric: "cf_1300_1400_greedy_solves",
      },
      {
        id: "task-2",
        type: "contest",
        title: "Participate in 1 rated Codeforces Div 2/3 contest",
        quantity: 1,
        platform: "codeforces",
        reason: "Contest frequency is only 1 in the past 30 days, which limits rating progression evidence.",
        evidenceReferences: ["sig-contest-low-frequency"],
        completionMetric: "cf_contests_participated",
      },
    ],
    reviewPolicy: {
      reviewAfterDays: 7,
      reviewAfterEvents: 2,
    },
  };

  it("successfully validates a conforming AdaptivePlanV1 object", () => {
    const res = PlanValidator.validate(validPlan);
    expect(res.success).toBe(true);
    expect(res.data?.schemaVersion).toBe("1.0.0");
    expect(res.data?.tasks.length).toBe(2);
  });

  it("rejects non-object or null input", () => {
    expect(PlanValidator.validate(null).success).toBe(false);
    expect(PlanValidator.validate("string").success).toBe(false);
    expect(PlanValidator.validate([]).success).toBe(false);
  });

  it("rejects missing or unsupported schemaVersion", () => {
    const invalid = { ...validPlan, schemaVersion: "2.0.0" };
    const res = PlanValidator.validate(invalid);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("schemaVersion"))).toBe(true);
  });

  it("rejects empty assessment summary or invalid confidence level", () => {
    const invalid = {
      ...validPlan,
      assessment: { summary: "", confidence: "super_high" as any },
    };
    const res = PlanValidator.validate(invalid);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("assessment.summary"))).toBe(true);
    expect(res.errors?.some((e) => e.includes("assessment.confidence"))).toBe(true);
  });

  it("rejects primaryBottleneck without evidence references", () => {
    const invalid = {
      ...validPlan,
      primaryBottleneck: {
        type: "dropoff",
        description: "Hard dropoff",
        evidence: [],
      },
    };
    const res = PlanValidator.validate(invalid);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("primaryBottleneck.evidence"))).toBe(true);
  });

  it("rejects plans with an empty task array", () => {
    const invalid = { ...validPlan, tasks: [] };
    const res = PlanValidator.validate(invalid);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("tasks"))).toBe(true);
  });

  it("enforces 'Why this?' by rejecting tasks without a reason", () => {
    const invalid = {
      ...validPlan,
      tasks: [
        {
          ...validPlan.tasks[0],
          reason: "   ",
        },
      ],
    };
    const res = PlanValidator.validate(invalid);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("reason is required"))).toBe(true);
  });

  it("enforces evidence traceability by rejecting tasks without evidenceReferences", () => {
    const invalid = {
      ...validPlan,
      tasks: [
        {
          ...validPlan.tasks[0],
          evidenceReferences: [],
        },
      ],
    };
    const res = PlanValidator.validate(invalid);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("evidenceReferences"))).toBe(true);
  });

  it("rejects invalid task types (e.g. watch_video)", () => {
    const invalid = {
      ...validPlan,
      tasks: [
        {
          ...validPlan.tasks[0],
          type: "watch_video" as any,
        },
      ],
    };
    const res = PlanValidator.validate(invalid);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("type 'watch_video' is invalid"))).toBe(true);
  });

  it("rejects tasks with non-positive quantity", () => {
    const invalid = {
      ...validPlan,
      tasks: [
        {
          ...validPlan.tasks[0],
          quantity: 0,
        },
      ],
    };
    const res = PlanValidator.validate(invalid);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("quantity must be a positive number"))).toBe(true);
  });

  it("rejects reviewPolicy without positive reviewAfterDays or reviewAfterEvents", () => {
    const invalid = {
      ...validPlan,
      reviewPolicy: {},
    };
    const res = PlanValidator.validate(invalid);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("reviewPolicy"))).toBe(true);
  });
});
