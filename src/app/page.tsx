import { getActiveUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { EvidenceService } from "@/goals/evidence.service";
import { ActivityFeedService } from "@/analytics/activity-feed.service";
import { AnalyticsService } from "@/analytics/analytics.service";
import prisma from "@/lib/prisma";
import { GoalHero } from "@/components/goal-hero";
import { EvidenceCard } from "@/components/evidence-card";
import { ActivityFeed } from "@/components/activity-feed";
import { CreateGoalModal } from "@/components/create-goal-modal";
import { PlanCard } from "@/components/plan/plan-card";
import { PlanRepository } from "@/planning/plan.repository";
import { TaskEvidenceMatcher } from "@/planning/matching/task-matcher";
import Link from "next/link";
import { Target, ArrowRight, BarChart3, Layers, Compass } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const userId = await getActiveUserId();

  const [goals, connections, activityFeed, fullAnalytics] = await Promise.all([
    GoalService.getUserGoals(userId),
    prisma.platformConnection.findMany({ where: { userId } }),
    ActivityFeedService.getUnifiedActivity(userId, 8),
    AnalyticsService.getUserAnalytics(userId),
  ]);

  const primaryGoal = goals[0];

  // First-Time Onboarding Experience
  if (!primaryGoal) {
    return (
      <main className="max-w-3xl mx-auto py-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome to Progress
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
            An evidence-first skill progression platform. Declare your target goal and connect your practice platforms to start tracking genuine evidence.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 max-w-lg mx-auto text-left space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            3-Step Quick Start
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
              <div>
                <div className="text-sm font-semibold text-white">Create your Goal</div>
                <div className="text-xs text-slate-400">Specify your target rating (e.g. CF 1400) and deadline.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">2</span>
              <div>
                <div className="text-sm font-semibold text-white">Connect Codeforces & LeetCode</div>
                <div className="text-xs text-slate-400">Link your public handles as evidence sources.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">3</span>
              <div>
                <div className="text-sm font-semibold text-white">Sync & Track Genuine Evidence</div>
                <div className="text-xs text-slate-400">See honest gap progress and supporting practice momentum.</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-center">
            <CreateGoalModal />
          </div>
        </div>
      </main>
    );
  }

  // Supporting Evidence for primary goal
  const evidence = await EvidenceService.computeSupportingEvidence(
    userId,
    primaryGoal.id
  );

  // Sync latest matches and load active plan
  await TaskEvidenceMatcher.matchTasksForGoal(primaryGoal.id);
  const activePlanRaw = await PlanRepository.getActivePlan(primaryGoal.id);

  // Safely serialize dates to strings for client component
  const initialPlan = activePlanRaw
    ? JSON.parse(JSON.stringify(activePlanRaw))
    : null;

  return (
    <main className="space-y-8">
      {/* 1. Dominant Section: YOUR GOAL */}
      <GoalHero goal={primaryGoal} />

      {/* 2. Core Adaptive Planning Section: YOUR PLAN */}
      <PlanCard initialPlan={initialPlan as any} goalId={primaryGoal.id} />

      {/* 3. Supporting Section: THIS WEEK'S EVIDENCE */}
      <EvidenceCard evidence={evidence} />

      {/* 3. Two-Column Layout: RECENT ACTIVITY & PRACTICE SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Unified Activity Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Activity
            </h2>
            <Link
              href="/progress"
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
            >
              <span>View full progress analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ActivityFeed items={activityFeed} />
        </div>

        {/* Right 1 Col: Practice Distribution Summary */}
        <div className="space-y-6">
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Practice Snapshot
              </h3>
              <BarChart3 className="w-4 h-4 text-slate-500" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400">Total Solved</div>
                <div className="text-xl font-bold text-white mt-1">
                  {fullAnalytics.activity.totalProblemsSolved}
                </div>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400">Current Streak</div>
                <div className="text-xl font-bold text-amber-400 mt-1">
                  {fullAnalytics.activity.currentStreak} d
                </div>
              </div>
            </div>

            {/* Top Practice Topics */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-400">Top Focus Topics</div>
              <div className="space-y-1.5">
                {Object.values(fullAnalytics.topics)
                  .filter((t) => t.attempted > 0)
                  .sort((a, b) => b.solved - a.solved)
                  .slice(0, 4)
                  .map((t) => (
                    <div
                      key={t.topic}
                      className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60"
                    >
                      <span className="text-slate-300 capitalize">{t.topic}</span>
                      <span className="font-mono text-slate-400">
                        {t.solved} / {t.attempted} ({t.acceptanceRate}%)
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <Link
              href="/progress"
              className="block w-full text-center text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg transition"
            >
              Open Progress Page
            </Link>
          </section>

          {/* Connected Platforms Quick Status */}
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Connected Platforms</span>
              </div>
              <Link
                href="/platforms"
                className="text-xs text-indigo-400 hover:underline"
              >
                Manage
              </Link>
            </div>

            <div className="space-y-2">
              {connections.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between text-xs bg-slate-950/60 p-2.5 rounded border border-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <span className="capitalize font-semibold text-white">
                      {c.platform}
                    </span>
                    <span className="text-slate-400">@{c.username}</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
