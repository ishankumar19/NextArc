import { PrismaClient } from "../src/generated/client";
import { addDays, subDays } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database for Milestone 1...");

  // Upsert demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@progress.dev" },
    update: {},
    create: {
      id: "user_demo_1",
      email: "demo@progress.dev",
      name: "Demo Engineer",
    },
  });

  console.log(`User created/verified: ${user.name} (${user.id})`);

  // Clear existing demo goals to ensure fresh seed
  await prisma.goal.deleteMany({
    where: { userId: user.id },
  });

  // Seed primary goal: Become Codeforces Specialist
  const primaryGoal = await prisma.goal.create({
    data: {
      userId: user.id,
      title: "Become Codeforces Specialist",
      category: "competitive_programming",
      targetMetric: "codeforces_rating",
      targetValue: 1400,
      initialValue: 1284,
      startDate: subDays(new Date(), 20),
      deadline: addDays(new Date(), 37),
      availableHoursPerWeek: 10,
      status: "active",
    },
  });

  console.log(
    `Primary Goal seeded: ${primaryGoal.title} (Target: ${primaryGoal.targetValue}, Initial: ${primaryGoal.initialValue})`
  );

  // Seed secondary goal: 150 LeetCode Mediums
  const secondaryGoal = await prisma.goal.create({
    data: {
      userId: user.id,
      title: "Solve 150 LeetCode Mediums",
      category: "dsa",
      targetMetric: "leetcode_solved_medium",
      targetValue: 150,
      initialValue: 120,
      startDate: subDays(new Date(), 15),
      deadline: addDays(new Date(), 45),
      availableHoursPerWeek: 8,
      status: "active",
    },
  });

  console.log(`Secondary Goal seeded: ${secondaryGoal.title}`);

  // Seed Platform Connections
  await prisma.platformConnection.upsert({
    where: {
      userId_platform: {
        userId: user.id,
        platform: "codeforces",
      },
    },
    update: {
      username: "tourist_fan",
      status: "connected",
      profileData: JSON.stringify({
        rating: 1284,
        maxRating: 1284,
        rank: "pupil",
        maxRank: "pupil",
      }),
      lastSyncedAt: new Date(),
    },
    create: {
      userId: user.id,
      platform: "codeforces",
      username: "tourist_fan",
      status: "connected",
      profileData: JSON.stringify({
        rating: 1284,
        maxRating: 1284,
        rank: "pupil",
        maxRank: "pupil",
      }),
      lastSyncedAt: new Date(),
    },
  });

  await prisma.platformConnection.upsert({
    where: {
      userId_platform: {
        userId: user.id,
        platform: "leetcode",
      },
    },
    update: {
      username: "algo_coder",
      status: "connected",
      profileData: JSON.stringify({
        totalSolved: 240,
        easySolved: 100,
        mediumSolved: 120,
        hardSolved: 20,
      }),
      lastSyncedAt: new Date(),
    },
    create: {
      userId: user.id,
      platform: "leetcode",
      username: "algo_coder",
      status: "connected",
      profileData: JSON.stringify({
        totalSolved: 240,
        easySolved: 100,
        mediumSolved: 120,
        hardSolved: 20,
      }),
      lastSyncedAt: new Date(),
    },
  });

  console.log("Platform connections seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
