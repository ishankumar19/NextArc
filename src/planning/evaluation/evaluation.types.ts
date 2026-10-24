export interface PlanOutcome {
  planId: string;
  versionNumber: number;
  evaluatedAt: string;
  completionRate: number; // 0 to 100 percentage
  tasksPlanned: number;
  tasksCompleted: number;
  insufficientEvidence: boolean;
  evidenceCollected: {
    totalSubmissionsInPeriod: number;
    totalProblemsSolvedInPeriod: number;
    contestsParticipated: number;
    targetRangeProblemsSolved: number;
  };
  metricChanges: {
    startRating?: number | null;
    endRating?: number | null;
    ratingDelta: number;
    activeDays: number;
    topicProgression: Record<string, { solves: number }>;
  };
  summary: string;
  adaptationGuidance: string;
}
