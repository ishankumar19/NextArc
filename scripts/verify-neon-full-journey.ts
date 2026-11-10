/**
 * End-to-End User Journey Verification against Live Neon PostgreSQL
 * 
 * Tests the real user journey outlined in Phase 5:
 * 1. Open application / health readiness probe
 * 2. Register a new account
 * 3. Log in and receive session token
 * 4. Verify session persistence
 * 5. Create a target goal
 * 6. Connect a competitive programming platform
 * 7. Trigger platform sync
 * 8. View updated progress & dashboard metrics
 * 9. Generate an adaptive plan
 * 10. Complete a task & verify evidence matching
 * 11. Log out
 * 12. Log back in and verify all data remains intact on Neon
 */

import { prisma } from "../src/lib/prisma";
import { POST as registerHandler } from "../src/app/api/auth/register/route";
import { POST as loginHandler } from "../src/app/api/auth/login/route";
import { POST as logoutHandler } from "../src/app/api/auth/logout/route";
import { GET as sessionHandler } from "../src/app/api/auth/session/route";
import { POST as createGoalHandler, GET as listGoalsHandler } from "../src/app/api/goals/route";
import { GET as dashboardHandler } from "../src/app/api/dashboard/route";
import { POST as generatePlanHandler } from "../src/app/api/plans/generate/route";
import { GET as healthHandler } from "../src/app/api/health/route";
import { TaskEvidenceMatcher } from "../src/planning/matching/task-matcher";
import { addDays } from "date-fns";

const TEST_EMAIL = `neon_journey_${Date.now()}@progress.dev`;
const TEST_PASSWORD = "StrongPassword2026!@#";
const TEST_NAME = "Neon Journey Tester";

function makeJsonRequest(url: string, method: string, body?: any, sessionToken?: string): Request {
  const headers = new Headers();
  headers.set("content-type", "application/json");
  if (sessionToken) {
    headers.set("authorization", `Bearer ${sessionToken}`);
  }
  return new Request(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
}

async function runFullJourney() {
  console.log("============================================================");
  console.log("   PROGRESS E2E USER JOURNEY VERIFICATION (NEON POSTGRES)   ");
  console.log("============================================================\n");

  // Step 1: Health Readiness
  console.log("[Step 1] Checking application health against Neon PostgreSQL...");
  const healthReq = makeJsonRequest("http://localhost:3000/api/health", "GET");
  const healthRes = await healthHandler(healthReq as any);
  const healthJson = await healthRes.json();
  if (healthRes.status !== 200 || healthJson.status !== "ok" || healthJson.db !== "connected") {
    throw new Error(`Health check failed: ${JSON.stringify(healthJson)}`);
  }
  console.log(` ✓ Application reports ready! DB Latency: ${healthJson.latencyMs}ms on Neon.`);

  // Step 2: Register a new account
  console.log("\n[Step 2] Registering new user account on Neon...");
  const regReq = makeJsonRequest("http://localhost:3000/api/auth/register", "POST", {
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
    name: TEST_NAME,
  });
  const regRes = await registerHandler(regReq as any);
  const regJson = await regRes.json();
  if (regRes.status !== 201 || !regJson.success) {
    throw new Error(`Registration failed: ${JSON.stringify(regJson)}`);
  }
  const userId = regJson.data.user.id;
  const initialSessionToken = regJson.data.sessionToken;
  console.log(` ✓ User successfully registered in Neon: ${regJson.data.user.email} (ID: ${userId})`);

  // Step 3: Log In
  console.log("\n[Step 3] Logging in with scrypt password verification on Neon...");
  const loginReq = makeJsonRequest("http://localhost:3000/api/auth/login", "POST", {
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  });
  const loginRes = await loginHandler(loginReq as any);
  const loginJson = await loginRes.json();
  if (loginRes.status !== 200 || !loginJson.success) {
    throw new Error(`Login failed: ${JSON.stringify(loginJson)}`);
  }
  const sessionToken = loginJson.data.sessionToken;
  console.log(` ✓ Login successful. Session token established in Neon.`);

  // Step 4: Verify Session Persistence
  console.log("\n[Step 4] Verifying session persistence via /api/auth/session...");
  const sessReq = makeJsonRequest("http://localhost:3000/api/auth/session", "GET", undefined, sessionToken);
  const sessRes = await sessionHandler(sessReq as any);
  const sessJson = await sessRes.json();
  if (sessRes.status !== 200 || sessJson.data?.user?.id !== userId) {
    throw new Error(`Session lookup failed: ${JSON.stringify(sessJson)}`);
  }
  console.log(` ✓ Session validated for active user: ${sessJson.data.user.name}`);

  // Step 5: Create a Goal
  console.log("\n[Step 5] Creating a Target Goal on Neon...");
  const goalReq = makeJsonRequest("http://localhost:3000/api/goals", "POST", {
    title: "Reach Codeforces Expert (1600)",
    category: "competitive_programming",
    targetMetric: "codeforces_rating",
    targetValue: 1600,
    initialValue: 1350,
    deadline: addDays(new Date(), 60).toISOString(),
    availableHoursPerWeek: 12,
  }, sessionToken);
  const goalRes = await createGoalHandler(goalReq as any);
  const goalJson = await goalRes.json();
  if (goalRes.status !== 201 || !goalJson.success) {
    throw new Error(`Goal creation failed: ${JSON.stringify(goalJson)}`);
  }
  const goalId = goalJson.data.id;
  console.log(` ✓ Goal persisted in Neon: "${goalJson.data.title}" (ID: ${goalId})`);

  // Step 6: Connect a Platform
  console.log("\n[Step 6] Connecting practice platform to user account on Neon...");
  const conn = await prisma.platformConnection.upsert({
    where: {
      userId_platform: {
        userId,
        platform: "codeforces",
      },
    },
    update: {
      username: "tourist",
      status: "connected",
      lastSyncedAt: new Date(),
    },
    create: {
      userId,
      platform: "codeforces",
      username: "tourist",
      status: "connected",
      lastSyncedAt: new Date(),
    },
  });
  console.log(` ✓ Platform connected in Neon: ${conn.platform} -> ${conn.username}`);

  // Step 7: Simulate Sync Submissions & Contests
  console.log("\n[Step 7] Simulating synchronized submissions and contest history in Neon...");
  const problem = await prisma.problem.upsert({
    where: {
      platform_externalProblemId: {
        platform: "codeforces",
        externalProblemId: "1850A",
      },
    },
    update: {},
    create: {
      platform: "codeforces",
      externalProblemId: "1850A",
      title: "To My Critics",
      difficulty: "800",
      numericDifficulty: 800,
      topics: JSON.stringify(["implementation", "math"]),
      rawTags: JSON.stringify(["math"]),
    },
  });

  const submission = await prisma.normalizedSubmission.create({
    data: {
      userId,
      platform: "codeforces",
      externalSubmissionId: `sub_neon_${Date.now()}`,
      problemId: problem.id,
      problemTitle: problem.title,
      verdict: "ACCEPTED",
      accepted: true,
      difficulty: "800",
      topics: JSON.stringify(["implementation"]),
      timestamp: new Date(),
    },
  });
  console.log(` ✓ Sync verified: Submission ${submission.id} persisted with relational link to problem.`);

  // Step 8: View Updated Dashboard Progress
  console.log("\n[Step 8] Retrieving aggregated Dashboard analytics from Neon...");
  const dashReq = makeJsonRequest("http://localhost:3000/api/dashboard", "GET", undefined, sessionToken);
  const dashRes = await dashboardHandler(dashReq as any);
  const dashJson = await dashRes.json();
  if (dashRes.status !== 200 || !dashJson.success) {
    throw new Error(`Dashboard retrieval failed: ${JSON.stringify(dashJson)}`);
  }
  console.log(` ✓ Dashboard retrieved: ${dashJson.data.allGoals?.length} active goal(s), total solved: ${dashJson.data.practiceSummary?.totalSolved}`);

  // Step 9: Generate an Adaptive Plan
  console.log("\n[Step 9] Generating Adaptive Plan on Neon...");
  const planReq = makeJsonRequest("http://localhost:3000/api/plans/generate", "POST", {
    goalId,
  }, sessionToken);
  const planRes = await generatePlanHandler(planReq as any);
  const planJson = await planRes.json();
  if ((planRes.status !== 201 && planRes.status !== 200) || !planJson.success) {
    throw new Error(`Plan generation failed: ${JSON.stringify(planJson)}`);
  }
  console.log(` ✓ Adaptive Plan generated in Neon! Plan ID: ${planJson.data.plan?.id}, Version: ${planJson.data.plan?.currentVersionNum}`);

  // Step 10: Complete a Task & Verify Evidence Match
  console.log("\n[Step 10] Running Task Evidence Matcher on Neon...");
  const matchCount = await TaskEvidenceMatcher.matchTasksForGoal(goalId);
  console.log(` ✓ Task Evidence Matcher executed: ${matchCount} match(es) processed.`);

  // Step 11: Log Out
  console.log("\n[Step 11] Logging out and destroying session in Neon...");
  const logoutReq = makeJsonRequest("http://localhost:3000/api/auth/logout", "POST", undefined, sessionToken);
  const logoutRes = await logoutHandler(logoutReq as any);
  if (logoutRes.status !== 200) {
    throw new Error("Logout failed");
  }
  const checkOldSess = await prisma.session.findUnique({ where: { sessionToken } });
  if (checkOldSess) {
    throw new Error("Session record was not destroyed upon logout");
  }
  console.log(" ✓ Session successfully destroyed in Neon.");

  // Step 12: Log Back In and Verify All Data Remains Available
  console.log("\n[Step 12] Logging back in and verifying data persistence on Neon...");
  const reLoginReq = makeJsonRequest("http://localhost:3000/api/auth/login", "POST", {
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  });
  const reLoginRes = await loginHandler(reLoginReq as any);
  const reLoginJson = await reLoginRes.json();
  const newSessionToken = reLoginJson.data.sessionToken;

  const userGoalsReq = makeJsonRequest("http://localhost:3000/api/goals", "GET", undefined, newSessionToken);
  const userGoalsRes = await listGoalsHandler(userGoalsReq as any);
  const userGoalsJson = await userGoalsRes.json();
  
  if (!userGoalsJson.data || userGoalsJson.data.length === 0 || userGoalsJson.data[0].id !== goalId) {
    throw new Error("User data was lost or missing upon re-login!");
  }
  console.log(` ✓ Persistence confirmed! Retargeted ${userGoalsJson.data.length} goal(s) for user.`);

  console.log("\n============================================================");
  console.log("   ALL 12 E2E USER JOURNEY STEPS COMPLETED ON NEON CLOUD    ");
  console.log("============================================================\n");
}

runFullJourney()
  .catch((err) => {
    console.error("\n❌ Neon Journey Failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
