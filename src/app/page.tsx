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
    GoalService.getUserGoals(userId),
    PlatformService.getUserConnections(userId),
    ActivityFeedService.getUnifiedActivity(userId, 8),
    AnalyticsService.getUserAnalytics(userId),
  ]);

  const primaryGoal = goals[0];

  // First-Time Onboarding Experience
  if (!primaryGoal) {
    return (
      <main className="max-w-3xl mx-auto py-10 sm:py-16 text-center space-y-8 animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center shadow-subtle">
          <Compass className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            COMPETITIVE PROGRAMMING INTELLIGENCE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome to Progress
          </h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            An evidence-first skill progression engine. Declare your target rating goal, connect your practice handles, and let real performance facts guide your daily practice.
          </p>
        </div>

        <div className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-6 sm:p-8 max-w-lg mx-auto text-left space-y-6 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              3-Step Skill Horizon Setup
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Takes ~60s</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3.5">
              <span className="w-6 h-6 rounded-md bg-indigo-600/90 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <div className="text-xs font-semibold text-white">Define your Rating Goal</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Set your target rating (e.g. Codeforces 1400) and deadline.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="w-6 h-6 rounded-md bg-white/[0.06] text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <div className="text-xs font-semibold text-white">Link Codeforces &amp; LeetCode</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Connect public handles to feed genuine submission and contest evidence.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="w-6 h-6 rounded-md bg-white/[0.06] text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <div className="text-xs font-semibold text-white">Receive Daily Targeted Challenges</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Get adaptive problem assignments that rotate daily to break current bottlenecks.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex justify-center">
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
    <main className="space-y-7 animate-in fade-in duration-200">
      {/* 1. Dominant Section: YOUR GOAL */}
      <GoalHero goal={primaryGoal} />

      {/* 2. Core Adaptive Planning Section: YOUR PLAN with Daily Rotating Challenge */}
      <PlanCard initialPlan={initialPlan as any} goalId={primaryGoal.id} />

      {/* 3. Supporting Section: THIS WEEK'S EVIDENCE */}
      <EvidenceCard evidence={evidence} />

      {/* 4. Two-Column Layout: RECENT ACTIVITY & PRACTICE SNAPSHOT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
        {/* Left 2 Cols: Unified Activity Feed */}
        <div className="lg:col-span-2 space-y-3.5">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Recent Verified Activity
            </h2>
            <Link
              href="/progress"
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition font-medium"
            >
              <span>Full Analytics &amp; Skills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ActivityFeed items={activityFeed} />
        </div>

        {/* Right 1 Col: Practice Distribution & Platform Health */}
        <div className="space-y-6">
          {/* Practice Snapshot */}
          <section className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-5 space-y-4 shadow-subtle">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Practice Snapshot</span>
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">Facts</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-[#080A0F] p-3 rounded-lg border border-white/[0.06] space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase font-medium">Total Solved</div>
                <div className="text-2xl font-extrabold font-mono text-white">
                  {fullAnalytics.activity.totalProblemsSolved}
                </div>
              </div>
              <div className="bg-[#080A0F] p-3 rounded-lg border border-white/[0.06] space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase font-medium">Streak</div>
                <div className="text-2xl font-extrabold font-mono text-amber-400">
                  {fullAnalytics.activity.currentStreak}
                  <span className="text-xs font-normal text-slate-500 ml-0.5">d</span>
                </div>
              </div>
            </div>

            {/* Top Practice Focus Topics */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                Active Topic Distribution
              </div>
              <div className="space-y-2">
                {Object.values(fullAnalytics.topics)
                  .filter((t) => t.attempted > 0)
                  .sort((a, b) => b.solved - a.solved)
                  .slice(0, 4)
                  .map((t) => (
                    <div key={t.topic} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 capitalize font-medium">
                          {t.topic.replace(/-/g, " ")}
                        </span>
                        <span className="font-mono text-slate-400 text-[11px]">
                          {t.solved} / {t.attempted} ({t.acceptanceRate}%)
                        </span>
                      </div>
                      <div className="w-full bg-[#121721] rounded-full h-1 overflow-hidden">
                        <div
                          className="bg-indigo-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, t.acceptanceRate)}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <Link
              href="/progress"
              className="block w-full text-center text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 py-2 rounded-lg border border-white/[0.08] transition cursor-pointer"
            >
              Explore Topic Intelligence →
            </Link>
          </section>

          {/* Connected Platforms Quick Status */}
          <section className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-5 space-y-3.5 shadow-subtle">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
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
              <div className="text-center py-4 space-y-2">
                <p className="text-xs text-slate-400">No platforms connected yet.</p>
                <Link
                  href="/platforms"
                  className="inline-block text-xs text-indigo-400 hover:underline"
                >
                  Connect Codeforces or LeetCode →
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {connections.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between text-xs bg-[#080A0F] p-2.5 rounded-lg border border-white/[0.06]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="capitalize font-semibold text-white">
                        {c.platform}
                      </span>
                      <span className="font-mono text-slate-400 text-[11px]">@{c.username}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
