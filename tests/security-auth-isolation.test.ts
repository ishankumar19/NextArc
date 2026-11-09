import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { PrismaClient } from "../src/generated/client";
import { NextRequest } from "next/server";
import { POST as registerUser } from "../src/app/api/auth/register/route";
import { POST as loginUser } from "../src/app/api/auth/login/route";
import { POST as logoutUser } from "../src/app/api/auth/logout/route";
import { GET as getSession } from "../src/app/api/auth/session/route";
import { GET as getGoals, POST as createGoal } from "../src/app/api/goals/route";
import { GET as getGoalById, DELETE as deleteGoal } from "../src/app/api/goals/[id]/route";
import { GET as getProgressContext } from "../src/app/api/goals/[id]/progress-context/route";
import { POST as generatePlan } from "../src/app/api/plans/generate/route";
import { POST as evaluatePlan } from "../src/app/api/plans/evaluate/route";
import { POST as adaptPlan } from "../src/app/api/plans/adapt/route";
import { POST as syncPlatform } from "../src/app/api/platforms/[platform]/sync/route";
import { GET as getDashboard } from "../src/app/api/dashboard/route";
import { createSession } from "../src/lib/session";
import { resolveSession } from "../src/lib/auth";
import { addDays } from "date-fns";

const prisma = new PrismaClient();

describe("Security, Authentication & Multi-Tenant Isolation Suite", () => {
  let userAliceId: string;
  let userBobId: string;
  let aliceSessionToken: string;
  let bobSessionToken: string;
  let aliceGoalId: string;
  let originalAllowDevDemo: string | undefined;

  beforeAll(async () => {
    originalAllowDevDemo = process.env.ALLOW_DEV_DEMO_USER;
    process.env.ALLOW_DEV_DEMO_USER = "false";

    // Clean up test users
    await prisma.session.deleteMany({
      where: {
        user: {
          email: {
            in: [
              "alice@security-test.dev",
              "bob@security-test.dev",
              "charlie@security-test.dev",
            ],
          },
        },
      },
    });

    await prisma.user.deleteMany({
      where: {
        email: {
          in: [
            "alice@security-test.dev",
            "bob@security-test.dev",
            "charlie@security-test.dev",
          ],
        },
      },
    });

    // Create Alice via register API
    const aliceReq = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: "alice@security-test.dev",
        password: "AliceSecurePassword123!",
        name: "Alice Security",
      }),
    });
    const aliceRes = await registerUser(aliceReq);
    expect(aliceRes.status).toBe(201);
    const aliceData = await aliceRes.json();
    userAliceId = aliceData.data.user.id;
    aliceSessionToken = aliceData.data.sessionToken;

    // Create Bob via register API
    const bobReq = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: "bob@security-test.dev",
        password: "BobSecurePassword456!",
        name: "Bob Security",
      }),
    });
    const bobRes = await registerUser(bobReq);
    expect(bobRes.status).toBe(201);
    const bobData = await bobRes.json();
    userBobId = bobData.data.user.id;
    bobSessionToken = bobData.data.sessionToken;

    // Create a Goal for Alice
    const goalReq = new NextRequest("http://localhost:3000/api/goals", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${aliceSessionToken}`,
      },
      body: JSON.stringify({
        title: "Alice Target 1800",
        category: "competitive_programming",
        targetMetric: "codeforces_rating",
        targetValue: 1800,
        initialValue: 1500,
        deadline: addDays(new Date(), 60).toISOString(),
        availableHoursPerWeek: 15,
      }),
    });
    const goalRes = await createGoal(goalReq);
    expect(goalRes.status).toBe(201);
    const goalData = await goalRes.json();
    aliceGoalId = goalData.data.id;
  });

  afterAll(async () => {
    // Cleanup
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [
            "alice@security-test.dev",
            "bob@security-test.dev",
            "charlie@security-test.dev",
          ],
        },
      },
    });
    await prisma.$disconnect();
    process.env.ALLOW_DEV_DEMO_USER = originalAllowDevDemo;
  });

  describe("1. Unauthenticated Access Protection (Fail-Closed)", () => {
    it("rejects unauthenticated GET /api/dashboard with 401", async () => {
      const req = new NextRequest("http://localhost:3000/api/dashboard");
      const res = await getDashboard(req);
      expect(res.status).toBe(401);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.error.code).toBe("UNAUTHENTICATED");
    });

    it("rejects unauthenticated GET /api/goals with 401", async () => {
      const req = new NextRequest("http://localhost:3000/api/goals");
      const res = await getGoals(req);
      expect(res.status).toBe(401);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.error.code).toBe("UNAUTHENTICATED");
    });

    it("rejects unauthenticated GET /api/auth/session with 401", async () => {
      const req = new NextRequest("http://localhost:3000/api/auth/session");
      const res = await getSession(req);
      expect(res.status).toBe(401);
    });
  });

  describe("2. Spoofed/Forged Parameter Rejection", () => {
    it("ignores forged x-user-id header and rejects without valid session", async () => {
      const req = new NextRequest("http://localhost:3000/api/goals", {
        headers: {
          "x-user-id": userAliceId,
        },
      });
      const res = await getGoals(req);
      expect(res.status).toBe(401);
    });

    it("ignores forged ?userId= query parameter and rejects without valid session", async () => {
      const req = new NextRequest(`http://localhost:3000/api/dashboard?userId=${userAliceId}`);
      const res = await getDashboard(req);
      expect(res.status).toBe(401);
    });

    it("derives user ID strictly from verified session even if attacker sends another x-user-id", async () => {
      // Bob is authenticated, but sets x-user-id header pretending to be Alice
      const req = new NextRequest("http://localhost:3000/api/goals", {
        headers: {
          Authorization: `Bearer ${bobSessionToken}`,
          "x-user-id": userAliceId, // Attacker spoof attempt
        },
      });
      const res = await getGoals(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      // Should return Bob's goals (empty), NOT Alice's goals!
      expect(json.data.some((g: any) => g.id === aliceGoalId)).toBe(false);
    });
  });

  describe("3. Cross-Tenant Resource Isolation", () => {
    it("prevents Bob from viewing Alice's goal details (returns 404)", async () => {
      const req = new NextRequest(`http://localhost:3000/api/goals/${aliceGoalId}`, {
        headers: {
          Authorization: `Bearer ${bobSessionToken}`,
        },
      });
      const res = await getGoalById(req, {
        params: Promise.resolve({ id: aliceGoalId }),
      });
      expect(res.status).toBe(404);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.error.code).toBe("NOT_FOUND");
    });

    it("prevents Bob from deleting Alice's goal", async () => {
      const req = new NextRequest(`http://localhost:3000/api/goals/${aliceGoalId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${bobSessionToken}`,
        },
      });
      const res = await deleteGoal(req, {
        params: Promise.resolve({ id: aliceGoalId }),
      });
      // Alice's goal must still exist in DB
      const check = await prisma.goal.findUnique({ where: { id: aliceGoalId } });
      expect(check).not.toBeNull();
    });

    it("prevents Bob from accessing Alice's ProgressContext (returns 404)", async () => {
      const req = new NextRequest(`http://localhost:3000/api/goals/${aliceGoalId}/progress-context`, {
        headers: {
          Authorization: `Bearer ${bobSessionToken}`,
        },
      });
      const res = await getProgressContext(req, {
        params: Promise.resolve({ id: aliceGoalId }),
      });
      expect(res.status).toBe(404);
    });

    it("prevents Bob from generating a plan targeting Alice's goal (returns 404)", async () => {
      const req = new NextRequest("http://localhost:3000/api/plans/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bobSessionToken}`,
        },
        body: JSON.stringify({
          goalId: aliceGoalId,
        }),
      });
      const res = await generatePlan(req);
      expect(res.status).toBe(404);
    });

    it("prevents Bob from evaluating Alice's plan (returns 404)", async () => {
      const req = new NextRequest("http://localhost:3000/api/plans/evaluate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bobSessionToken}`,
        },
        body: JSON.stringify({
          goalId: aliceGoalId,
        }),
      });
      const res = await evaluatePlan(req);
      expect(res.status).toBe(404);
    });

    it("prevents Bob from adapting Alice's plan (returns 404)", async () => {
      const req = new NextRequest("http://localhost:3000/api/plans/adapt", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bobSessionToken}`,
        },
        body: JSON.stringify({
          goalId: aliceGoalId,
        }),
      });
      const res = await adaptPlan(req);
      expect(res.status).toBe(404);
    });

    it("prevents Bob from syncing a platform connected only by Alice", async () => {
      // Connect Codeforces for Alice only
      await prisma.platformConnection.upsert({
        where: {
          userId_platform: {
            userId: userAliceId,
            platform: "codeforces",
          },
        },
        update: {},
        create: {
          userId: userAliceId,
          platform: "codeforces",
          username: "tourist",
          status: "connected",
        },
      });

      // Bob tries to trigger sync for Codeforces
      const req = new NextRequest("http://localhost:3000/api/platforms/codeforces/sync", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bobSessionToken}`,
        },
      });
      const res = await syncPlatform(req, {
        params: Promise.resolve({ platform: "codeforces" }),
      });
      expect(res.status).toBe(404);
    });
  });

  describe("4. Session Lifecycle & Expiration", () => {
    it("authenticates via login with correct password", async () => {
      const req = new NextRequest("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: "alice@security-test.dev",
          password: "AliceSecurePassword123!",
        }),
      });
      const res = await loginUser(req);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data.user.email).toBe("alice@security-test.dev");
      expect(json.data.sessionToken).toBeDefined();
    });

    it("rejects login with incorrect password with 401", async () => {
      const req = new NextRequest("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: "alice@security-test.dev",
          password: "WrongPassword999!",
        }),
      });
      const res = await loginUser(req);
      expect(res.status).toBe(401);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.error.code).toBe("INVALID_CREDENTIALS");
    });

    it("rejects expired sessions with 401", async () => {
      // Create manually expired session for Alice
      const expiredSession = await prisma.session.create({
        data: {
          sessionToken: "expired_token_12345",
          userId: userAliceId,
          expires: new Date(Date.now() - 60000), // Expired 1 min ago
        },
      });

      const req = new NextRequest("http://localhost:3000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${expiredSession.sessionToken}`,
        },
      });
      const res = await getDashboard(req);
      expect(res.status).toBe(401);

      // Verify that expired session was pruned from DB
      const found = await prisma.session.findUnique({
        where: { sessionToken: "expired_token_12345" },
      });
      expect(found).toBeNull();
    });

    it("destroys session on logout and invalidates subsequent requests", async () => {
      // 1. Create temporary session
      const temp = await createSession(userAliceId);

      // Verify working
      const workingReq = new NextRequest("http://localhost:3000/api/auth/session", {
        headers: {
          Authorization: `Bearer ${temp.sessionToken}`,
        },
      });
      const workingRes = await getSession(workingReq);
      expect(workingRes.status).toBe(200);

      // 2. Logout
      const logoutReq = new NextRequest("http://localhost:3000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${temp.sessionToken}`,
        },
      });
      const logoutRes = await logoutUser(logoutReq);
      expect(logoutRes.status).toBe(200);

      // 3. Subsequent request with invalidated token must fail with 401
      const afterLogoutReq = new NextRequest("http://localhost:3000/api/auth/session", {
        headers: {
          Authorization: `Bearer ${temp.sessionToken}`,
        },
      });
      const afterLogoutRes = await getSession(afterLogoutReq);
      expect(afterLogoutRes.status).toBe(401);
    });
  });

  describe("5. Fail-Closed Demo Mode Verification", () => {
    it("never permits demo user fallback in NODE_ENV=production even if ALLOW_DEV_DEMO_USER=true", async () => {
      const origEnv = process.env.NODE_ENV;
      const origAllow = process.env.ALLOW_DEV_DEMO_USER;

      try {
        (process.env as any).NODE_ENV = "production";
        process.env.ALLOW_DEV_DEMO_USER = "true";

        const req = new NextRequest("http://localhost:3000/api/dashboard");
        const resolved = await resolveSession(req);
        expect(resolved).toBeNull();
      } finally {
        (process.env as any).NODE_ENV = origEnv;
        process.env.ALLOW_DEV_DEMO_USER = origAllow;
      }
    });
  });
});
