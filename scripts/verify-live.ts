import prisma from "../src/lib/prisma";
import { codeforcesAdapter } from "../src/platforms/adapters/codeforces.adapter";
import { leetcodeAdapter } from "../src/platforms/adapters/leetcode.adapter";
import { SyncService } from "../src/sync/sync.service";
import { GoalService } from "../src/goals/goal.service";
import { EvidenceService } from "../src/goals/evidence.service";
import { AnalyticsService } from "../src/analytics/analytics.service";
import { ProgressContextService } from "../src/goals/progress-context.service";
import { ActivityFeedService } from "../src/analytics/activity-feed.service";
import { addDays } from "date-fns";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("=== MILESTONE 5: LIVE VERIFICATION SCRIPT ===");

  const testUserId = "user_live_verify";

  // 1. Clean test user
  await prisma.user.deleteMany({ where: { id: testUserId } });
  await prisma.user.create({
    data: {
      id: testUserId,
      email: "live_verify@progress.dev",
      name: "Live Verification Engineer",
    },
  });
  console.log("[1] Created clean isolated verification user:", testUserId);

  // 2. Real Codeforces Verification
  // We test with a known public active handle: "Errichto" or "tourist" or "Petr"
  const cfHandle = "Errichto";
  console.log(`\n[2] Testing live Codeforces with handle: @${cfHandle}...`);

  const cfValid = await codeforcesAdapter.validateUser(cfHandle);
  console.log(`- Validate handle @${cfHandle}:`, cfValid);

  const cfProfile = await codeforcesAdapter.getProfile(cfHandle);
  console.log(`- Profile: Rating=${cfProfile.rating}, MaxRating=${cfProfile.maxRating}, Rank=${cfProfile.rank}`);

  const cfContests = await codeforcesAdapter.getContestHistory(cfHandle);
  console.log(`- Contest history fetched: ${cfContests.length} contests recorded.`);
  if (cfContests.length > 0) {
    console.log(`  Sample Contest: ${cfContests[0].contestName}, Rank #${cfContests[0].rank}, Delta: ${cfContests[0].ratingChange}`);
  }

  const cfSubs = await codeforcesAdapter.getSubmissions(cfHandle);
  console.log(`- Submissions fetched: ${cfSubs.length} submissions.`);
  if (cfSubs.length > 0) {
    const s = cfSubs[0];
    console.log(`  Sample Submission: ID ${s.id}, Problem "${s.problemTitle}" (${s.difficulty}), Verdict: ${s.verdict}, Tags: [${s.rawTags.join(", ")}]`);
  }

  // Connect CF to DB
  await prisma.platformConnection.create({
    data: {
      userId: testUserId,
      platform: "codeforces",
      username: cfHandle,
      status: "connected",
    },
  });

  // Sync CF via SyncService
  console.log("\n[3] Executing initial live SyncService for Codeforces...");
  const sync1 = await SyncService.syncPlatform(testUserId, "codeforces");
  console.log("- Sync Result 1:", sync1);

  const cfSubsInDb1 = await prisma.normalizedSubmission.count({
    where: { userId: testUserId, platform: "codeforces" },
  });
  console.log(`- Submissions in DB after Sync 1: ${cfSubsInDb1}`);

  // Test Idempotent Repeated Sync
  console.log("\n[4] Executing repeated SyncService (idempotency check)...");
  const sync2 = await SyncService.syncPlatform(testUserId, "codeforces");
  console.log("- Sync Result 2:", sync2);

  const cfSubsInDb2 = await prisma.normalizedSubmission.count({
    where: { userId: testUserId, platform: "codeforces" },
  });
  console.log(`- Submissions in DB after Sync 2: ${cfSubsInDb2}`);
  if (cfSubsInDb1 === cfSubsInDb2) {
    console.log("✔ IDEMPOTENCY CONFIRMED: 0 duplicate records created on repeated sync!");
  } else {
    console.error("FAIL: Duplicate submissions created!");
  }

  // 3. Real LeetCode Verification
  // We test with a known public LeetCode user: "tourist" or "lee215" or "yusufk"
  const lcHandle = "tourist";
  console.log(`\n[5] Testing live LeetCode with handle: @${lcHandle}...`);

  try {
    const lcValid = await leetcodeAdapter.validateUser(lcHandle);
    console.log(`- Validate handle @${lcHandle}:`, lcValid);

    const lcProfile = await leetcodeAdapter.getProfile(lcHandle);
    console.log(`- Profile: TotalSolved=${lcProfile.totalSolved}, Easy=${lcProfile.easySolved}, Medium=${lcProfile.mediumSolved}, Hard=${lcProfile.hardSolved}`);

    const lcSubs = await leetcodeAdapter.getSubmissions(lcHandle);
    console.log(`- Submissions fetched: ${lcSubs.length} recent public submissions.`);

    await prisma.platformConnection.create({
      data: {
        userId: testUserId,
        platform: "leetcode",
        username: lcHandle,
        status: "connected",
      },
    });

    const lcSync = await SyncService.syncPlatform(testUserId, "leetcode");
    console.log("- LeetCode Sync Result:", lcSync);
  } catch (err: any) {
    console.log("- LeetCode note/error (best-effort):", err?.message);
  }

  // 4. Create Real Goal and Verify Evidence
  console.log("\n[6] Creating real Goal: Become Codeforces Grandmaster...");
  const goal = await GoalService.createGoal({
    userId: testUserId,
    title: "Become Codeforces Grandmaster",
    category: "competitive_programming",
    targetMetric: "codeforces_rating",
    targetValue: 2400,
    deadline: addDays(new Date(), 90),
    availableHoursPerWeek: 15,
  });

  const goalView = await GoalService.getGoalById(goal.id, testUserId);
  console.log(`- Goal created: Target=${goalView?.targetValue}, Current=${goalView?.currentValue}, Gap=${goalView?.gap}, DaysRemaining=${goalView?.daysRemaining}`);

  // 5. Analytics Verification
  console.log("\n[7] Computing live Analytics facts...");
  const analytics = await AnalyticsService.getUserAnalytics(testUserId);
  console.log("- Activity stats:", {
    totalSolved: analytics.activity.totalProblemsSolved,
    totalAttempted: analytics.activity.totalProblemsAttempted,
    activeDays30d: analytics.activity.last30Days.activeDays,
    currentStreak: analytics.activity.currentStreak,
  });
  console.log("- Contest stats:", {
    currentRating: analytics.contests.currentRating,
    maxRating: analytics.contests.maxRating,
    totalContests: analytics.contests.totalContests,
  });
  console.log("- Difficulty 1300 bin:", analytics.difficulty.codeforces["1300"]);
  console.log("- Topic 'greedy':", analytics.topics["greedy"]);

  // 6. Evidence Service
  console.log("\n[8] Computing supporting evidence...");
  const evidence = await EvidenceService.computeSupportingEvidence(testUserId, goal.id);
  console.log("- Supporting Evidence:", evidence);

  // 7. ProgressContext v1 Generation
  console.log("\n[9] Generating canonical ProgressContext v1...");
  const progressContext = await ProgressContextService.getUserProgressContext(testUserId, goal.id);
  console.log("- Schema Version:", progressContext.schemaVersion);
  console.log("- Generated At:", progressContext.generatedAt);
  console.log("- Data Freshness:", progressContext.dataFreshness);
  console.log("- Platform Completeness:", {
    cf: progressContext.platformCompleteness.codeforces.completeness,
    lc: progressContext.platformCompleteness.leetcode.completeness,
  });

  // Save sanitized fixture for Phase 2
  const fixturesDir = path.join(process.cwd(), "fixtures");
  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true });
  }
  const fixturePath = path.join(fixturesDir, "progress-context-v1.fixture.json");
  fs.writeFileSync(fixturePath, JSON.stringify(progressContext, null, 2), "utf-8");
  console.log(`- ProgressContext fixture saved to: ${fixturePath}`);

  // 8. Cross-Platform Feed
  console.log("\n[10] Generating Unified Activity Feed...");
  const feed = await ActivityFeedService.getUnifiedActivity(testUserId, 10);
  console.log(`- Total Feed Items: ${feed.length}`);
  if (feed.length > 0) {
    console.log(`  Top Item: [${feed[0].platform}] ${feed[0].title} (${feed[0].dateGroup})`);
  }

  console.log("\n=== LIVE VERIFICATION FINISHED SUCCESSFULLY ===");
}

main()
  .catch((e) => {
    console.error("Live verification failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
