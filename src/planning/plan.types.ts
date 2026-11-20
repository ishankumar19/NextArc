export type PlanTaskType = "practice" | "contest" | "upsolve" | "review";

export interface PlanTaskDifficulty {
  min?: number;
  max?: number;
  tier?: string; // "Easy" | "Medium" | "Hard"
}

export interface PlanTask {
  id: string;
  type: PlanTaskType;
  title: string;
  quantity?: number;
  platform?: string; // "codeforces" | "leetcode" | "cross_platform"
  difficulty?: PlanTaskDifficulty;
  topics?: string[]; // Canonical topic slugs
  reason: string; // Explains "Why this?"
  evidenceReferences: string[]; // Cites specific signals or evidence facts
  completionMetric: string; // e.g. "problems_solved_1300_greedy", "contests_completed"
  // Specific problem recommendation fields (rotates daily)
  problemId?: string;
  problemName?: string;
  problemUrl?: string;
  problemRating?: number;
  dailyDate?: string;
}

export interface EvidenceReference {
  signalId?: string;
  description: string;
  metric?: string;
  value?: string | number;
}

export interface SuccessCriterion {
  criterion: string;
  metric: string;
  targetValue: number | string;
}

export interface WeeklyTarget {
  area: string;
  targetDescription: string;
  expectedEffortHours?: number;
}

export interface PlanReviewPolicy {
  reviewAfterDays?: number;
  reviewAfterEvents?: number;
}

export interface AdaptivePlanV1 {
  schemaVersion: "1.0.0";
  generatedAt: string; // ISO 8601
  goalId: string;
  versionNumber?: number;

  assessment: {
    summary: string;
    confidence: "high" | "medium" | "low";
  };

  primaryBottleneck: {
    type: string;
    description: string;
    evidence: EvidenceReference[];
  };

  nextMilestone: {
    description: string;
    successCriteria: SuccessCriterion[];
  };

  weeklyTargets: WeeklyTarget[];

  tasks: PlanTask[];

  reviewPolicy: {
    reviewAfterDays?: number;
    reviewAfterEvents?: number;
  };
}
