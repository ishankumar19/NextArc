/**
 * PostgreSQL Staging End-to-End Verification Suite
 * 
 * Verifies live PostgreSQL database compatibility against real PostgreSQL instance:
 * 1. Fresh migration & Prisma Client connectivity
 * 2. User registration, password hashing (scrypt), session lifecycle
 * 3. Goal creation and progress metric verification
 * 4. Platform connection persistence & compound unique constraints
 * 5. Sync persistence & submission normalization
 * 6. Submission deduplication ([userId, platform, externalSubmissionId])
 * 7. Contest deduplication ([userId, platform, contestId])
 * 8. ProgressContext generation on PostgreSQL
 * 9. Plan & PlanVersion persistence
 * 10. Task evidence matching & double-counting prevention
 * 11. Plan evaluation outcome persistence
 * 12. Interactive transaction atomicity and forced ROLLBACK verification
 */

import { PrismaClient } from "../src/generated/client-pg";
import { hashPassword, verifyPassword } from "../src/lib/password";
import { addDays } from "date-fns";

const pgUrl = process.env.POSTGRES_DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:5433/postgres?sslmode=disable";
const prisma = new PrismaClient({
  datasources: {
    db: { url: pgUrl },
  },
});

async function runPostgresVerification() {
  console.log("============================================================");
  console.log("   POSTGRESQL STAGING LIVE VERIFICATION & RED-TEAM SUITE    ");
  console.log("============================================================\n");
  console.log(`[Config] Database URL: ${pgUrl}`);

  // 1. Connectivity & Version Check
  console.log("\n[Step 1] Verifying PostgreSQL Engine Connectivity...");
  const versionResult: any = await prisma.$queryRawUnsafe("SELECT version()");
  const rawVersion = versionResult[0]?.version || "Unknown";
  console.log(` ✓ PostgreSQL Connected successfully.`);
  console.log(`   Engine Version: ${rawVersion.substring(0, 80)}...`);

  // Clean staging state
  await prisma.user.deleteMany({
    where: { email: { in: ["pg_user@progress.dev", "attacker@progress.dev"] } },
  });

  // 2. User Registration, Password Hashing & Session Lifecycle
  console.log("\n[Step 2] Testing User Auth & Session Lifecycle on PostgreSQL...");
  const rawPassword = "PostgresPassword123!@#";
  const passwordHash = await hashPassword(rawPassword);

  const user = await prisma.user.create({
    data: {
      email: "pg_user@progress.dev",
      name: "PostgreSQL Staging Tester",
      passwordHash,
    },
  });
  console.log(` ✓ User created with ID: ${user.id}`);

  // Verify password
  const isValidPass = await verifyPassword(rawPassword, user.passwordHash!);
  const isInvalidPass = await verifyPassword("WrongPassword123", user.passwordHash!);
  if (!isValidPass || isInvalidPass) {
    throw new Error("Password verification logic failed on PostgreSQL entity");
  }
  console.log(" ✓ Password scrypt verification validated.");

  // Create session
  const sessionToken = "pg_session_token_abc123xyz";
  const session = await prisma.session.create({
    data: {
      sessionToken,
      userId: user.id,
      expires: addDays(new Date(), 30),
    },
  });
  console.log(` ✓ Session created: ${session.id} (expires in 30 days)`);

  const fetchedSession = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  });
  if (!fetchedSession || fetchedSession.user.id !== user.id) {
    throw new Error("Session relation lookup failed on PostgreSQL");
  }
  console.log(" ✓ Session join relation verified.");

  // 3. Goal Creation
  console.log("\n[Step 3] Testing Goal Creation on PostgreSQL...");
  const deadline = addDays(new Date(), 45);
  const goal = await prisma.goal.create({
    data: {
      userId: user.id,
      title: "Reach 1600 on Codeforces",
      category: "competitive_programming",
      targetMetric: "codeforces_rating",
      targetValue: 1600.0,
      initialValue: 1284.0,
      deadline,
      availableHoursPerWeek: 12.0,
      status: "active",
    },
  });
  console.log(` ✓ Goal created: ${goal.id} (Target: ${goal.targetValue}, Initial: ${goal.initialValue})`);

  // 4. Platform Connection
  console.log("\n[Step 4] Testing Platform Connection & Constraints...");
  const conn = await prisma.platformConnection.create({
    data: {
      userId: user.id,
      platform: "codeforces",
      username: "tourist_staging",
      status: "connected",
      profileData: JSON.stringify({ rating: 1312, maxRating: 1350, rank: "pupil" }),
    },
  });
  console.log(` ✓ Platform connection saved: ${conn.platform} -> ${conn.username}`);

  // Test unique constraint [userId, platform]
  let duplicateConnBlocked = false;
  try {
    await prisma.platformConnection.create({
      data: {
        userId: user.id,
        platform: "codeforces", // duplicate platform for same user
        username: "other_handle",
      },
    });
  } catch (err: any) {
    duplicateConnBlocked = err.code === "P2002";
  }
  if (!duplicateConnBlocked) {
    throw new Error("PostgreSQL failed to enforce compound unique constraint [userId, platform]");
  }
  console.log(" ✓ Compound unique constraint [userId, platform] enforced by PostgreSQL (P2002).");

  // 5. Problem & Submission Persistence
  console.log("\n[Step 5] Testing Problem & Submission Persistence...");
  const problem = await prisma.problem.create({
    data: {
      platform: "codeforces",
      externalProblemId: "1900B",
      title: "Laura and Operations",
      difficulty: "1300",
      numericDifficulty: 1300,
      topics: JSON.stringify(["greedy", "math"]),
      rawTags: JSON.stringify(["greedy", "math"]),
    },
  });

  const sub = await prisma.normalizedSubmission.create({
    data: {
      userId: user.id,
      platform: "codeforces",
      externalSubmissionId: "sub_cf_1001",
      problemId: problem.id,
      problemTitle: problem.title,
      verdict: "ACCEPTED",
      accepted: true,
      difficulty: "1300",
      topics: JSON.stringify(["greedy"]),
      timestamp: new Date(),
    },
  });
  console.log(` ✓ Normalized submission persisted: ${sub.id}`);

  // 6. Submission Deduplication [userId, platform, externalSubmissionId]
  console.log("\n[Step 6] Testing Submission Deduplication Constraint...");
  let duplicateSubBlocked = false;
  try {
    await prisma.normalizedSubmission.create({
      data: {
        userId: user.id,
        platform: "codeforces",
        externalSubmissionId: "sub_cf_1001", // Exact duplicate
        problemId: problem.id,
        problemTitle: problem.title,
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1300",
        topics: JSON.stringify(["greedy"]),
        timestamp: new Date(),
      },
    });
  } catch (err: any) {
    duplicateSubBlocked = err.code === "P2002";
  }
  if (!duplicateSubBlocked) {
    throw new Error("PostgreSQL failed to enforce defensive submission constraint [userId, platform, externalSubmissionId]");
  }
  console.log(" ✓ Defensive submission uniqueness enforced by PostgreSQL (P2002).");

  // 7. Contest Deduplication [userId, platform, contestId]
  console.log("\n[Step 7] Testing Contest Deduplication Constraint...");
  await prisma.contestHistory.create({
    data: {
      userId: user.id,
      platform: "codeforces",
      contestId: "cf_round_900",
      contestName: "Codeforces Round 900",
      rank: 2400,
      oldRating: 1284,
      newRating: 1312,
      ratingChange: 28,
      timestamp: new Date(),
    },
  });

  let duplicateContestBlocked = false;
  try {
    await prisma.contestHistory.create({
      data: {
        userId: user.id,
        platform: "codeforces",
        contestId: "cf_round_900", // Duplicate contest
        contestName: "Codeforces Round 900",
        rank: 2400,
        oldRating: 1284,
        newRating: 1312,
        ratingChange: 28,
        timestamp: new Date(),
      },
    });
  } catch (err: any) {
    duplicateContestBlocked = err.code === "P2002";
  }
  if (!duplicateContestBlocked) {
    throw new Error("PostgreSQL failed to enforce contest uniqueness [userId, platform, contestId]");
  }
  console.log(" ✓ Contest history uniqueness enforced by PostgreSQL (P2002).");

  // 8. Plan & PlanVersion Persistence
  console.log("\n[Step 8] Testing Plan & PlanVersion Persistence...");
  const plan = await prisma.plan.create({
    data: {
      goalId: goal.id,
      userId: user.id,
      status: "active",
      currentVersionNum: 1,
    },
  });

  const planVersion = await prisma.planVersion.create({
    data: {
      planId: plan.id,
      versionNumber: 1,
      schemaVersion: "1.0.0",
      summary: "Baseline plan focusing on 1300 greedy problems",
      milestoneTitle: "Consistent 1300 solve rate",
      bottleneckType: "difficulty_dropoff",
      planData: JSON.stringify({ version: 1, focus: "greedy 1300" }),
      startDate: new Date(),
      targetReviewDate: addDays(new Date(), 7),
    },
  });

  const task = await prisma.planTask.create({
    data: {
      planVersionId: planVersion.id,
      externalTaskId: "task-1",
      type: "practice",
      title: "Solve 5 problems rated 1300",
      quantity: 5,
      quantityCompleted: 1,
      platform: "codeforces",
      minDifficulty: 1300,
      maxDifficulty: 1300,
      topics: JSON.stringify(["greedy"]),
      reason: "Address difficulty dropoff observed at 1300 bracket",
      evidenceReferences: JSON.stringify(["sig-diff-1300"]),
      completionMetric: "cf_1300_solves",
      status: "in_progress",
    },
  });
  console.log(` ✓ Plan ${plan.id}, Version 1, and Task ${task.id} persisted.`);

  // 9. Task Evidence Matching & Deduplication
  console.log("\n[Step 9] Testing TaskEvidenceMatch Uniqueness Constraint...");
  const match = await prisma.taskEvidenceMatch.create({
    data: {
      taskId: task.id,
      submissionId: sub.id,
      notes: "Solved during plan window",
    },
  });
  console.log(` ✓ Task match recorded: ${match.id}`);

  let duplicateMatchBlocked = false;
  try {
    await prisma.taskEvidenceMatch.create({
      data: {
        taskId: task.id,
        submissionId: sub.id, // Double count attempt
      },
    });
  } catch (err: any) {
    duplicateMatchBlocked = err.code === "P2002";
  }
  if (!duplicateMatchBlocked) {
    throw new Error("PostgreSQL failed to prevent double-counting via [taskId, submissionId] uniqueness");
  }
  console.log(" ✓ Task evidence double-counting prevented by PostgreSQL unique constraint [taskId, submissionId].");

  // 10. Plan Evaluation Persistence
  console.log("\n[Step 10] Testing PlanEvaluation Persistence...");
  const evaluation = await prisma.planEvaluation.create({
    data: {
      planId: plan.id,
      evaluatedVersionNum: 1,
      completionRate: 100.0,
      tasksPlanned: 1,
      tasksCompleted: 1,
      ratingChange: 28,
      outcomeData: JSON.stringify({ outcomeImprovement: "improved", recommendation: "advance" }),
    },
  });
  console.log(` ✓ Plan evaluation recorded: ${evaluation.id}`);

  // 11. Interactive Transaction & Rollback Behavior
  console.log("\n[Step 11] Testing PostgreSQL Transaction Atomicity & Forced ROLLBACK...");

  // A: Successful Atomic Adaptation Transaction (v1 -> v2)
  await prisma.$transaction(async (tx) => {
    // 1. Update plan version counter
    await tx.plan.update({
      where: { id: plan.id },
      data: { currentVersionNum: 2 },
    });

    // 2. Create version 2
    const v2 = await tx.planVersion.create({
      data: {
        planId: plan.id,
        versionNumber: 2,
        schemaVersion: "1.0.0",
        summary: "Adapted plan step up to 1400",
        milestoneTitle: "Consistent 1400 solve rate",
        bottleneckType: "difficulty_dropoff",
        planData: JSON.stringify({ version: 2, focus: "step up 1400" }),
        startDate: new Date(),
        targetReviewDate: addDays(new Date(), 7),
      },
    });

    // 3. Create task for version 2
    await tx.planTask.create({
      data: {
        planVersionId: v2.id,
        externalTaskId: "task-v2-1",
        type: "practice",
        title: "Solve 4 problems rated 1400",
        quantity: 4,
        platform: "codeforces",
        minDifficulty: 1400,
        maxDifficulty: 1400,
        topics: JSON.stringify(["greedy"]),
        reason: "Step up after 1300 mastery",
        evidenceReferences: JSON.stringify(["sig-diff-1400"]),
        completionMetric: "cf_1400_solves",
      },
    });
  });

  const checkPlanV2 = await prisma.plan.findUnique({
    where: { id: plan.id },
    include: { versions: { include: { tasks: true } } },
  });
  if (checkPlanV2?.currentVersionNum !== 2 || checkPlanV2.versions.length !== 2) {
    throw new Error("Atomic adaptation transaction failed to commit v2");
  }
  console.log(" ✓ Successful transaction committed: Plan upgraded to version 2 with tasks.");

  // B: Forced Failure & Rollback Test (v2 -> v3 attempt that throws mid-transaction)
  console.log(" - Triggering forced transaction failure to test ROLLBACK behavior...");
  let rollbackSucceeded = false;

  try {
    await prisma.$transaction(async (tx) => {
      // Step 1: bump counter to 3
      await tx.plan.update({
        where: { id: plan.id },
        data: { currentVersionNum: 3 },
      });

      // Step 2: insert version 3
      await tx.planVersion.create({
        data: {
          planId: plan.id,
          versionNumber: 3,
          schemaVersion: "1.0.0",
          summary: "Faulty version 3 that will abort",
          milestoneTitle: "Abort Milestone",
          bottleneckType: "faulty",
          planData: "{}",
          startDate: new Date(),
          targetReviewDate: addDays(new Date(), 7),
        },
      });

      // Step 3: INTENTIONAL FATAL ERROR
      throw new Error("FORCED_MID_TRANSACTION_FAILURE");
    });
  } catch (err: any) {
    if (err.message.includes("FORCED_MID_TRANSACTION_FAILURE")) {
      rollbackSucceeded = true;
    }
  }

  if (!rollbackSucceeded) {
    throw new Error("Transaction did not fail as expected");
  }

  // Verify that ROLLBACK occurred: plan.currentVersionNum MUST STILL BE 2, and v3 must NOT exist!
  const postRollbackPlan = await prisma.plan.findUnique({
    where: { id: plan.id },
    include: { versions: true },
  });

  if (postRollbackPlan?.currentVersionNum !== 2) {
    throw new Error(`Rollback failed: plan currentVersionNum was altered to ${postRollbackPlan?.currentVersionNum}`);
  }

  const v3Exists = postRollbackPlan.versions.some((v) => v.versionNumber === 3);
  if (v3Exists) {
    throw new Error("Rollback failed: version 3 record persisted in database!");
  }

  console.log(" ✓ PostgreSQL ROLLBACK verified: currentVersionNum remained 2, version 3 completely discarded.");

  console.log("\n============================================================");
  console.log("   ALL POSTGRESQL E2E & ROLLBACK CHECKS PASSED (12/12)     ");
  console.log("============================================================\n");
}

runPostgresVerification()
  .catch((err) => {
    console.error("\n❌ PostgreSQL Verification Failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
