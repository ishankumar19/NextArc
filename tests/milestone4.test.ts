import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { PrismaClient } from "../src/generated/client";
import { NextRequest } from "next/server";
import { GET as getGoals, POST as createGoal } from "../src/app/api/goals/route";
import { GET as getGoalById, DELETE as deleteGoal } from "../src/app/api/goals/[id]/route";
import { GET as getPlatforms } from "../src/app/api/platforms/route";
import { POST as connectPlatform } from "../src/app/api/platforms/connect/route";
import { DELETE as disconnectPlatform } from "../src/app/api/platforms/[platform]/route";
import { GET as getDashboard } from "../src/app/api/dashboard/route";
import { GET as getActivity } from "../src/app/api/activity/route";
import { GET as getActivityAnalytics } from "../src/app/api/analytics/activity/route";
import { GET as getDifficultyAnalytics } from "../src/app/api/analytics/difficulty/route";
import { GET as getTopicAnalytics } from "../src/app/api/analytics/topics/route";
import { GET as getProgressContext } from "../src/app/api/goals/[id]/progress-context/route";
import { addDays } from "date-fns";

const prisma = new PrismaClient();

describe("Milestone 4: API Routes & UI Aggregation", () => {
  let createdGoalId: string;

  beforeAll(async () => {
    // Ensure demo user exists
    await prisma.user.upsert({
      where: { email: "demo@progress.dev" },
      update: {},
      create: {
        id: "user_demo_1",
        email: "demo@progress.dev",
        name: "Demo Engineer",
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("Goals API", () => {
    it("POST /api/goals should validate required fields", async () => {
      const req = new NextRequest("http://localhost:3000/api/goals", {
        method: "POST",
        body: JSON.stringify({
          title: "Incomplete Goal",
          // missing targetMetric, targetValue, deadline
        }),
      });

      const res = await createGoal(req);
      expect(res.status).toBe(400);

      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.error.message).toContain("Missing required fields");
    });

    it("POST /api/goals should create goal and calculate initial gap", async () => {
      const deadline = addDays(new Date(), 45).toISOString();
      const req = new NextRequest("http://localhost:3000/api/goals", {
        method: "POST",
        body: JSON.stringify({
          title: "Reach 1600 on Codeforces",
          category: "competitive_programming",
          targetMetric: "codeforces_rating",
          targetValue: 1600,
          initialValue: 1284,
          deadline,
          availableHoursPerWeek: 12,
        }),
      });

      const res = await createGoal(req);
      expect(res.status).toBe(201);

      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data.id).toBeDefined();
      expect(json.data.title).toBe("Reach 1600 on Codeforces");
      expect(json.data.targetValue).toBe(1600);

      createdGoalId = json.data.id;
    });

    it("GET /api/goals should return goals with honest gap and remaining days", async () => {
      const req = new NextRequest("http://localhost:3000/api/goals");
      const res = await getGoals(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.success).toBe(true);
      expect(Array.isArray(json.data)).toBe(true);
      expect(json.data.length).toBeGreaterThanOrEqual(1);

      const goal = json.data.find((g: any) => g.id === createdGoalId);
      expect(goal).toBeDefined();
      expect(goal.gap).toBe(316); // 1600 - 1284 = +316
      expect(goal.daysRemaining).toBe(45);
    });

    it("GET /api/goals/:id should return single goal details", async () => {
      const req = new NextRequest(`http://localhost:3000/api/goals/${createdGoalId}`);
      const res = await getGoalById(req, { params: Promise.resolve({ id: createdGoalId }) });
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data.id).toBe(createdGoalId);
      expect(json.data.gap).toBe(316);
    });
  });

  describe("Platforms API", () => {
    it("POST /api/platforms/connect should validate unsupported platforms", async () => {
      const req = new NextRequest("http://localhost:3000/api/platforms/connect", {
        method: "POST",
        body: JSON.stringify({
          platform: "unsupported_platform",
          username: "test",
        }),
      });

      const res = await connectPlatform(req);
      expect(res.status).toBe(400);

      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.error.code).toBe("UNSUPPORTED_PLATFORM");
    });

    it("GET /api/platforms should list connections with quality reports", async () => {
      const req = new NextRequest("http://localhost:3000/api/platforms");
      const res = await getPlatforms(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.success).toBe(true);
      expect(Array.isArray(json.data)).toBe(true);

      const cf = json.data.find((p: any) => p.platform === "codeforces");
      if (cf) {
        expect(cf.qualityReport.reliabilityTier).toBe("authoritative");
        expect(cf.qualityReport.completeness).toBe("complete");
      }
    });
  });

  describe("Dashboard & Activity Feed API", () => {
    it("GET /api/dashboard should return aggregated goal-first payload", async () => {
      const req = new NextRequest("http://localhost:3000/api/dashboard");
      const res = await getDashboard(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data.primaryGoal).toBeDefined();
      expect(json.data.practiceSummary).toBeDefined();
      expect(json.data.recentActivity).toBeDefined();
    });

    it("GET /api/activity should return sorted chronological activity items", async () => {
      const req = new NextRequest("http://localhost:3000/api/activity?limit=20");
      const res = await getActivity(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.success).toBe(true);
      expect(Array.isArray(json.data)).toBe(true);

      if (json.data.length >= 2) {
        const time0 = new Date(json.data[0].timestamp).getTime();
        const time1 = new Date(json.data[1].timestamp).getTime();
        expect(time0).toBeGreaterThanOrEqual(time1); // Chronological descending
      }
    });
  });

  describe("Analytics Endpoints", () => {
    it("GET /api/analytics/activity should return 7d/30d and streak facts", async () => {
      const req = new NextRequest("http://localhost:3000/api/analytics/activity");
      const res = await getActivityAnalytics(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data.last7Days).toBeDefined();
      expect(json.data.last30Days).toBeDefined();
      expect(typeof json.data.currentStreak).toBe("number");
    });

    it("GET /api/analytics/difficulty should return distinct CF and LC coordinates", async () => {
      const req = new NextRequest("http://localhost:3000/api/analytics/difficulty");
      const res = await getDifficultyAnalytics(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data.codeforces).toBeDefined();
      expect(json.data.leetcode).toBeDefined();
      expect(json.data.codeforces["1300"]).toBeDefined();
      expect(json.data.leetcode.Medium).toBeDefined();
    });

    it("GET /api/analytics/topics should return canonical topic facts", async () => {
      const req = new NextRequest("http://localhost:3000/api/analytics/topics");
      const res = await getTopicAnalytics(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data["greedy"]).toBeDefined();
      expect(json.data["two-pointers"]).toBeDefined();
    });
  });

  describe("ProgressContext v1 Endpoint", () => {
    it("GET /api/goals/:id/progress-context should return complete versioned ProgressContext", async () => {
      const req = new NextRequest(`http://localhost:3000/api/goals/${createdGoalId}/progress-context`);
      const res = await getProgressContext(req, {
        params: Promise.resolve({ id: createdGoalId }),
      });
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data.schemaVersion).toBe("1.0.0");
      expect(json.data.generatedAt).toBeDefined();
      expect(json.data.goal.id).toBe(createdGoalId);
      expect(json.data.goal.gap).toBe(316);
      expect(json.data.dataFreshness).toBeDefined();
      expect(json.data.platformCompleteness).toBeDefined();
    });
  });

  describe("Cleanup Verification", () => {
    it("DELETE /api/goals/:id should delete goal", async () => {
      const req = new NextRequest(`http://localhost:3000/api/goals/${createdGoalId}`);
      const res = await deleteGoal(req, { params: Promise.resolve({ id: createdGoalId }) });
      expect(res.status).toBe(200);

      const checkReq = new NextRequest(`http://localhost:3000/api/goals/${createdGoalId}`);
      const checkRes = await getGoalById(checkReq, { params: Promise.resolve({ id: createdGoalId }) });
      expect(checkRes.status).toBe(404);
    });
  });
});
