import { resolveSession } from "@/lib/auth";
import { LandingPage } from "@/components/landing-page";
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
    return <LandingPage />;
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
        <div className="w-16 h-16 rounded-2xl bg-[#E5F1EB] border border-[#BCE0D4] text-[#176B5B] mx-auto flex items-center justify-center shadow-subtle">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5F1EB] border border-[#BCE0D4] text-xs font-mono text-[#145B4D] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#176B5B]"></span>
            COMPETITIVE PROGRAMMING INTELLIGENCE
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172923] tracking-tight">
            Welcome to nextARC
          </h1>
          <p className="text-sm sm:text-base text-[#52665D] max-w-xl mx-auto leading-relaxed">
            An evidence-first skill progression engine. Declare your target rating goal, connect your practice handles, and let real performance facts guide your daily practice.
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E2E8E3] rounded-2xl p-7 sm:p-10 max-w-xl mx-auto text-left space-y-7 shadow-elevated">
          <div className="flex items-center justify-between pb-4 border-b border-[#EBEFEA]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#52665D] font-semibold">
              3-Step Skill Horizon Setup
            </span>
            <span className="text-xs text-[#8E9F97] font-mono">Takes ~60s</span>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-[#176B5B] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-[#176B5B]/20">
                1
              </span>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-[#172923]">Define your Rating Goal</div>
                <div className="text-xs text-[#52665D] leading-relaxed">
                  Set your target rating (e.g. Codeforces 1400) and milestone deadline.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-[#F0F4F1] border border-[#E2E8E3] text-[#52665D] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-[#172923]">Link Codeforces &amp; LeetCode</div>
                <div className="text-xs text-[#52665D] leading-relaxed">
                  Connect public handles to feed genuine submission and contest evidence.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-[#F0F4F1] border border-[#E2E8E3] text-[#52665D] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-[#172923]">Receive Daily Targeted Challenges</div>
                <div className="text-xs text-[#52665D] leading-relaxed">
                  Get adaptive problem assignments that rotate daily to break current bottlenecks.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-[#EBEFEA] flex justify-center">
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
            <h2 className="text-xs font-mono font-semibold text-[#52665D] uppercase tracking-wider flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#176B5B]"></span>
              Recent Verified Activity
            </h2>
            <Link
              href="/progress"
              className="text-xs text-[#176B5B] hover:text-[#115246] flex items-center gap-1.5 transition font-semibold"
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
          <section className="bg-[#FFFFFF] border border-[#E2E8E3] rounded-2xl p-6 sm:p-7 space-y-6 shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-[#EBEFEA]">
              <h3 className="text-xs font-mono font-semibold text-[#172923] uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#176B5B]" />
                <span>Practice Snapshot</span>
              </h3>
              <span className="text-xs text-[#8E9F97] font-mono">Facts</span>
            </div>

            {fullAnalytics && (
              <>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-[#F8FAF7] p-4 rounded-xl border border-[#E2E8E3] space-y-1">
                    <div className="text-xs text-[#52665D] uppercase font-semibold">Total Solved</div>
                    <div className="text-3xl font-extrabold font-mono text-[#172923]">
                      {fullAnalytics.activity.totalProblemsSolved}
                    </div>
                  </div>
                  <div className="bg-[#F8FAF7] p-4 rounded-xl border border-[#E2E8E3] space-y-1">
                    <div className="text-xs text-[#52665D] uppercase font-semibold">Streak</div>
                    <div className="text-3xl font-extrabold font-mono text-[#C58A36]">
                      {fullAnalytics.activity.currentStreak}
                      <span className="text-sm font-normal text-[#8E9F97] ml-1">d</span>
                    </div>
                  </div>
                </div>

                {/* Top Practice Focus Topics */}
                <div className="space-y-3 pt-1">
                  <div className="text-xs font-mono text-[#52665D] uppercase font-semibold">
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
                            <span className="text-[#172923] capitalize font-medium">
                              {t.topic.replace(/-/g, " ")}
                            </span>
                            <span className="font-mono text-[#52665D] text-xs">
                              {t.solved} / {t.attempted} ({t.acceptanceRate}%)
                            </span>
                          </div>
                          <div className="w-full bg-[#EBEFEA] rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-[#176B5B] h-1.5 rounded-full transition-all duration-300"
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
              className="block w-full text-center text-xs font-semibold bg-[#F8FAF7] hover:bg-[#F0F4F1] text-[#172923] py-2.5 px-4 rounded-lg border border-[#E2E8E3] transition cursor-pointer shadow-subtle"
            >
              Explore Topic Intelligence →
            </Link>
          </section>

          {/* Connected Platforms Quick Status */}
          <section className="bg-[#FFFFFF] border border-[#E2E8E3] rounded-2xl p-6 sm:p-7 space-y-5 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBEFEA]">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#172923] uppercase tracking-wider">
                <Layers className="w-4 h-4 text-[#176B5B]" />
                <span>Evidence Sources</span>
              </div>
              <Link
                href="/platforms"
                className="text-xs text-[#176B5B] hover:text-[#115246] transition font-semibold"
              >
                Manage
              </Link>
            </div>

            {connections.length === 0 ? (
              <div className="text-center py-5 space-y-2.5">
                <p className="text-xs text-[#52665D]">No platforms connected yet.</p>
                <Link
                  href="/platforms"
                  className="inline-block text-xs font-semibold text-[#176B5B] hover:text-[#115246] transition"
                >
                  Connect Codeforces or LeetCode →
                </Link>
              </div>
            ) : (
              <div className="space-y-2.5">
                {connections.map((c) => (
                  <div
                    key={c.id || c.platform}
                    className="flex items-center justify-between text-xs bg-[#F8FAF7] p-3 rounded-xl border border-[#E2E8E3]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="capitalize font-semibold text-[#172923]">
                        {c.platform}
                      </span>
                      <span className="font-mono text-[#52665D] text-xs">@{c.username}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[#EDF7F2] text-[#176B5B] border border-[#C2E5D4]">
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
