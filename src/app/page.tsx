import { resolveSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GoalService } from "@/goals/goal.service";
import { EvidenceService } from "@/goals/evidence.service";
import { ActivityFeedService } from "@/analytics/activity-feed.service";
import { AnalyticsService } from "@/analytics/analytics.service";
import { PlatformService } from "@/platforms/platform.service";
import prisma from "@/lib/prisma";
import { GoalHero } from "@/components/goal-hero";
import { EvidenceCard } from "@/components/evidence-card";
import { ActivityFeed } from "@/components/activity-feed";
import { CreateGoalModal } from "@/components/create-goal-modal";
import { PlanCard } from "@/components/plan/plan-card";
import { PlanRepository } from "@/planning/plan.repository";
import Link from "next/link";
import {
  Target,
  ArrowRight,
  BarChart3,
  Layers,
  Compass,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await resolveSession();
  if (!session) {
    redirect("/login");
  }
  const userId = session.userId;

  const [goals, connections, activityFeed, fullAnalytics] = await Promise.all([
    GoalService.getUserGoals(userId).catch(() => []),
    PlatformService.getUserConnections(userId).catch(() => []),
    ActivityFeedService.getUnifiedActivity(userId, 8).catch(() => []),
    AnalyticsService.getUserAnalytics(userId).catch(() => null),
  ]);

  const primaryGoal = goals[0];

  // First-Time Onboarding Experience
  if (!primaryGoal) {
    return (
      <main className="max-w-3xl mx-auto py-12 sm:py-20 text-center space-y-10 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center shadow-subtle">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            COMPETITIVE PROGRAMMING INTELLIGENCE
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Welcome to Progress
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            An evidence-first skill progression engine. Declare your target rating goal, connect your practice handles, and let real performance facts guide your daily practice.
          </p>
        </div>

        <div className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-7 sm:p-10 max-w-xl mx-auto text-left space-y-7 shadow-elevated">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              3-Step Skill Horizon Setup
            </span>
            <span className="text-xs text-slate-500 font-mono">Takes ~60s</span>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-indigo-600/30">
                1
              </span>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white">Define your Rating Goal</div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  Set your target rating (e.g. Codeforces 1400) and milestone deadline.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white">Link Codeforces &amp; LeetCode</div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  Connect public handles to feed genuine submission and contest evidence.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white">Receive Daily Targeted Challenges</div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  Get adaptive problem assignments that rotate daily to break current bottlenecks.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-white/[0.06] flex justify-center">
            <CreateGoalModal />
          </div>
        </div>
      </main>
    );
  }

  // Parallel load of supporting evidence and active plan for instant SSR response
  const [evidence, activePlanRaw] = await Promise.all([
    EvidenceService.computeSupportingEvidence(userId, primaryGoal.id),
    PlanRepository.getActivePlan(primaryGoal.id),
  ]);

  // Safely serialize dates to strings for client component
  const initialPlan = activePlanRaw
    ? JSON.parse(JSON.stringify(activePlanRaw))
    : null;

  return (
    <main className="space-y-10 sm:space-y-12 animate-in fade-in duration-200">
      {/* 1. Dominant Section: YOUR GOAL */}
      <GoalHero goal={primaryGoal} />

      {/* 2. Core Adaptive Planning Section: YOUR PLAN with Daily Rotating Challenge */}
      <PlanCard initialPlan={initialPlan as any} goalId={primaryGoal.id} />

      {/* 3. Supporting Section: THIS WEEK'S EVIDENCE */}
      <EvidenceCard evidence={evidence} />

      {/* 4. Two-Column Layout: RECENT ACTIVITY & PRACTICE SNAPSHOT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Columns (7 of 12 / 8 of 12 on XL): Unified Activity Feed */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-5">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Recent Verified Activity
            </h2>
            <Link
              href="/progress"
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition font-medium"
            >
              <span>Full Analytics &amp; Skills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ActivityFeed items={activityFeed} />
        </div>

        {/* Right Columns (5 of 12 / 4 of 12 on XL): Practice Distribution & Platform Health */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-7">
          {/* Practice Snapshot */}
          <section className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-6 shadow-subtle">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <h3 className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                <span>Practice Snapshot</span>
              </h3>
              <span className="text-xs text-slate-500 font-mono">Facts</span>
            </div>

            {fullAnalytics && (
              <>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-[#080A0F] p-4 rounded-xl border border-white/[0.06] space-y-1">
                    <div className="text-xs text-slate-400 uppercase font-semibold">Total Solved</div>
                    <div className="text-3xl font-extrabold font-mono text-white">
                      {fullAnalytics.activity.totalProblemsSolved}
                    </div>
                  </div>
                  <div className="bg-[#080A0F] p-4 rounded-xl border border-white/[0.06] space-y-1">
                    <div className="text-xs text-slate-400 uppercase font-semibold">Streak</div>
                    <div className="text-3xl font-extrabold font-mono text-amber-400">
                      {fullAnalytics.activity.currentStreak}
                      <span className="text-sm font-normal text-slate-500 ml-1">d</span>
                    </div>
                  </div>
                </div>

                {/* Top Practice Focus Topics */}
                <div className="space-y-3 pt-1">
                  <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
                    Active Topic Distribution
                  </div>
                  <div className="space-y-3">
                    {Object.values(fullAnalytics.topics)
                      .filter((t) => t.attempted > 0)
                      .sort((a, b) => b.solved - a.solved)
                      .slice(0, 4)
                      .map((t) => (
                        <div key={t.topic} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-300 capitalize font-medium">
                              {t.topic.replace(/-/g, " ")}
                            </span>
                            <span className="font-mono text-slate-400 text-xs">
                              {t.solved} / {t.attempted} ({t.acceptanceRate}%)
                            </span>
                          </div>
                          <div className="w-full bg-[#121721] rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, t.acceptanceRate)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}

            <Link
              href="/progress"
              className="block w-full text-center text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 py-2.5 px-4 rounded-lg border border-white/[0.08] transition cursor-pointer shadow-sm"
            >
              Explore Topic Intelligence →
            </Link>
          </section>

          {/* Connected Platforms Quick Status */}
          <section className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-5 shadow-subtle">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Evidence Sources</span>
              </div>
              <Link
                href="/platforms"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition font-medium"
              >
                Manage
              </Link>
            </div>

            {connections.length === 0 ? (
              <div className="text-center py-5 space-y-2.5">
                <p className="text-xs text-slate-400">No platforms connected yet.</p>
                <Link
                  href="/platforms"
                  className="inline-block text-xs font-medium text-indigo-400 hover:text-indigo-300 transition"
                >
                  Connect Codeforces or LeetCode →
                </Link>
              </div>
            ) : (
              <div className="space-y-2.5">
                {connections.map((c) => (
                  <div
                    key={c.id || c.platform}
                    className="flex items-center justify-between text-xs bg-[#080A0F] p-3 rounded-xl border border-white/[0.06]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="capitalize font-semibold text-white">
                        {c.platform}
                      </span>
                      <span className="font-mono text-slate-400 text-xs">@{c.username}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
