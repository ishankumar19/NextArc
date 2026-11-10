-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goals" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "targetMetric" TEXT NOT NULL,
    "targetValue" DOUBLE PRECISION NOT NULL,
    "initialValue" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,
    "availableHoursPerWeek" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_connections" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'connected',
    "lastError" TEXT,
    "lastSyncedAt" TIMESTAMP(3),
    "profileData" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problems" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "externalProblemId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "numericDifficulty" INTEGER,
    "topics" TEXT NOT NULL,
    "rawTags" TEXT NOT NULL,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "normalized_submissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "externalSubmissionId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "problemTitle" TEXT NOT NULL,
    "verdict" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL,
    "language" TEXT,
    "difficulty" TEXT NOT NULL,
    "topics" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "contestId" TEXT,
    "rawData" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "normalized_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contest_history" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "contestName" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "oldRating" INTEGER NOT NULL,
    "newRating" INTEGER NOT NULL,
    "ratingChange" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contest_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "currentVersionNum" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_versions" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "schemaVersion" TEXT NOT NULL DEFAULT '1.0.0',
    "summary" TEXT NOT NULL,
    "milestoneTitle" TEXT NOT NULL,
    "bottleneckType" TEXT NOT NULL,
    "planData" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "targetReviewDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_tasks" (
    "id" TEXT NOT NULL,
    "planVersionId" TEXT NOT NULL,
    "externalTaskId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "quantityCompleted" INTEGER NOT NULL DEFAULT 0,
    "platform" TEXT,
    "minDifficulty" INTEGER,
    "maxDifficulty" INTEGER,
    "difficultyTier" TEXT,
    "topics" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "evidenceReferences" TEXT NOT NULL,
    "completionMetric" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_evidence_matches" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "submissionId" TEXT,
    "contestHistoryId" TEXT,
    "matchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "task_evidence_matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_evaluations" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "evaluatedVersionNum" INTEGER NOT NULL,
    "completionRate" DOUBLE PRECISION NOT NULL,
    "tasksPlanned" INTEGER NOT NULL,
    "tasksCompleted" INTEGER NOT NULL,
    "ratingChange" INTEGER,
    "outcomeData" TEXT NOT NULL,
    "evaluatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "goals_userId_status_idx" ON "goals"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "platform_connections_userId_platform_key" ON "platform_connections"("userId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "problems_platform_externalProblemId_key" ON "problems"("platform", "externalProblemId");

-- CreateIndex
CREATE INDEX "normalized_submissions_userId_timestamp_idx" ON "normalized_submissions"("userId", "timestamp");

-- CreateIndex
CREATE INDEX "normalized_submissions_userId_platform_timestamp_idx" ON "normalized_submissions"("userId", "platform", "timestamp");

-- CreateIndex
CREATE INDEX "normalized_submissions_userId_accepted_idx" ON "normalized_submissions"("userId", "accepted");

-- CreateIndex
CREATE INDEX "normalized_submissions_problemId_idx" ON "normalized_submissions"("problemId");

-- CreateIndex
CREATE UNIQUE INDEX "normalized_submissions_userId_platform_externalSubmissionId_key" ON "normalized_submissions"("userId", "platform", "externalSubmissionId");

-- CreateIndex
CREATE INDEX "contest_history_userId_timestamp_idx" ON "contest_history"("userId", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "contest_history_userId_platform_contestId_key" ON "contest_history"("userId", "platform", "contestId");

-- CreateIndex
CREATE INDEX "plans_goalId_status_idx" ON "plans"("goalId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "plan_versions_planId_versionNumber_key" ON "plan_versions"("planId", "versionNumber");

-- CreateIndex
CREATE INDEX "plan_tasks_planVersionId_status_idx" ON "plan_tasks"("planVersionId", "status");

-- CreateIndex
CREATE INDEX "task_evidence_matches_submissionId_idx" ON "task_evidence_matches"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "task_evidence_matches_taskId_submissionId_key" ON "task_evidence_matches"("taskId", "submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "task_evidence_matches_taskId_contestHistoryId_key" ON "task_evidence_matches"("taskId", "contestHistoryId");

-- CreateIndex
CREATE INDEX "plan_evaluations_planId_idx" ON "plan_evaluations"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "sessions_expires_idx" ON "sessions"("expires");

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platform_connections" ADD CONSTRAINT "platform_connections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "normalized_submissions" ADD CONSTRAINT "normalized_submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "normalized_submissions" ADD CONSTRAINT "normalized_submissions_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contest_history" ADD CONSTRAINT "contest_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_versions" ADD CONSTRAINT "plan_versions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_tasks" ADD CONSTRAINT "plan_tasks_planVersionId_fkey" FOREIGN KEY ("planVersionId") REFERENCES "plan_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_evidence_matches" ADD CONSTRAINT "task_evidence_matches_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "plan_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_evidence_matches" ADD CONSTRAINT "task_evidence_matches_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "normalized_submissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_evidence_matches" ADD CONSTRAINT "task_evidence_matches_contestHistoryId_fkey" FOREIGN KEY ("contestHistoryId") REFERENCES "contest_history"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_evaluations" ADD CONSTRAINT "plan_evaluations_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
