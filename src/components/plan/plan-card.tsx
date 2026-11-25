"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Clock,
  RotateCcw,
  Target,
  AlertCircle,
  MessageSquare,
  Send,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Flame,
} from "lucide-react";
import { getDailyBadgeLabel, getDailyProblemForCriteria } from "@/planning/problems/problem-catalog";

interface TaskMatch {
  id: string;
  matchedAt: string;
  notes?: string | null;
}

interface PlanTaskView {
  id: string;
  externalTaskId: string;
  type: string;
  title: string;
  quantity: number;
  quantityCompleted: number;
  platform?: string | null;
  minDifficulty?: number | null;
  maxDifficulty?: number | null;
  difficultyTier?: string | null;
  topics: string;
  reason: string;
  evidenceReferences: string;
  status: string;
  matches?: TaskMatch[];
  problemId?: string | null;
  problemName?: string | null;
  problemUrl?: string | null;
  problemRating?: number | null;
  dailyDate?: string | null;
}

interface PlanVersionView {
  id: string;
  versionNumber: number;
  summary: string;
  milestoneTitle: string;
  bottleneckType: string;
  startDate: string;
  targetReviewDate: string;
  tasks: PlanTaskView[];
}

interface PlanView {
  id: string;
  goalId: string;
  status: string;
  currentVersionNum: number;
  versions: PlanVersionView[];
}

interface PlanCardProps {
  initialPlan: PlanView | null;
  goalId: string;
}

export function PlanCard({ initialPlan, goalId }: PlanCardProps) {
  const [plan, setPlan] = useState<PlanView | null>(initialPlan);
  const [loading, setLoading] = useState(false);
  const [adapting, setAdapting] = useState(false);
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [showCoach, setShowCoach] = useState(false);
  const [coachQuestion, setCoachQuestion] = useState("");
  const [coachAnswer, setCoachAnswer] = useState<string | null>(null);
  const [coachLoading, setCoachLoading] = useState(false);

  const activeVersion = plan?.versions?.[0];

  async function handleGeneratePlan() {
    setLoading(true);
    try {
      const res = await fetch("/api/plans/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goalId }),
      });
      const data = await res.json();
      const planPayload = data.data?.plan ?? data.plan;
      if (data.success && planPayload) {
        setPlan(planPayload);
      }
    } catch (e) {
      console.error("Failed to generate plan", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdaptPlan() {
    setAdapting(true);
    try {
      const res = await fetch("/api/plans/adapt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goalId }),
      });
      const data = await res.json();
      const planPayload = data.data?.plan ?? data.plan;
      if (data.success && planPayload) {
        setPlan(planPayload);
      }
    } catch (e) {
      console.error("Failed to adapt plan", e);
    } finally {
      setAdapting(false);
    }
  }

  async function handleAskCoach(q: string) {
    if (!q.trim()) return;
    setCoachLoading(true);
    setCoachAnswer(null);
    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goalId, question: q }),
      });
      const data = await res.json();
      const answer = data.data?.answer ?? data.answer;
      if (data.success && answer) {
        setCoachAnswer(answer);
      } else {
        setCoachAnswer("Could not retrieve answer: " + (data.error?.message || data.error || "Unknown error"));
      }
    } catch (e: any) {
      setCoachAnswer("Network error contacting Goal Coach.");
    } finally {
      setCoachLoading(false);
    }
  }

  if (!activeVersion) {
    return (
      <section className="bg-[#FFFFFF] border border-[#E2E8E3] rounded-2xl p-7 sm:p-9 lg:p-10 shadow-card relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#145B4D] font-semibold">
                Evidence-Based Planner
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#E5F1EB] text-[#145B4D] font-mono border border-[#BCE0D4] font-medium">
                ACTIVE REASONER
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#172923] tracking-tight">Adaptive Practice Plan</h2>
            <p className="text-xs sm:text-sm text-[#52665D] max-w-xl leading-relaxed">
              Generate an adaptive practice plan grounded directly in your verified platform facts. Identifies performance drop-offs and prescribes targeted daily problems.
            </p>
          </div>

          <button
            onClick={handleGeneratePlan}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#176B5B] hover:bg-[#115246] text-white font-semibold text-xs sm:text-sm transition shrink-0 disabled:opacity-50 shadow-sm shadow-[#176B5B]/20 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? "Reasoning over Evidence..." : "Generate Adaptive Plan"}</span>
          </button>
        </div>
      </section>
    );
  }

  const startDateFormatted = format(new Date(activeVersion.startDate), "MMM d");
  const reviewDateFormatted = format(new Date(activeVersion.targetReviewDate), "MMM d");

  return (
    <section className="bg-[#FFFFFF] border border-[#E2E8E3] rounded-2xl p-7 sm:p-9 lg:p-10 space-y-7 shadow-card relative overflow-hidden">
      {/* 1. Header with Version and Timeframe */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#EBEFEA]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-wider text-[#176B5B] font-semibold">
              Active Practice Plan
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-mono font-semibold bg-[#E5F1EB] text-[#145B4D] border border-[#BCE0D4]">
              v{activeVersion.versionNumber}
            </span>
            <span className="text-[#CBD5CD]">•</span>
            <span className="text-xs text-[#52665D] font-medium">
              Window: {startDateFormatted} – {reviewDateFormatted}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#52665D] leading-relaxed max-w-2xl">{activeVersion.summary}</p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setShowCoach(!showCoach)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#F8FAF7] hover:bg-[#F0F4F1] text-[#172923] text-xs font-semibold border border-[#E2E8E3] transition cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#176B5B]" />
            <span>Goal Coach</span>
          </button>

          <button
            onClick={handleAdaptPlan}
            disabled={adapting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E5F1EB] hover:bg-[#CCE4D8] text-[#145B4D] text-xs font-semibold border border-[#BCE0D4] transition disabled:opacity-50 cursor-pointer shadow-subtle"
            title="Evaluate observed evidence and generate adapted Plan v(N+1)"
          >
            <RotateCcw className={`w-4 h-4 ${adapting ? "animate-spin" : ""}`} />
            <span>{adapting ? "Adapting..." : "Adapt Plan"}</span>
          </button>
        </div>
      </div>

      {/* 2. Next Milestone Box */}
      <div className="bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl p-5 sm:p-6 flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-[#E5F1EB] border border-[#BCE0D4] text-[#176B5B] flex items-center justify-center shrink-0 mt-0.5">
          <Target className="w-4 h-4" />
        </div>
        <div className="space-y-1 min-w-0">
          <div className="text-xs font-mono uppercase tracking-wider text-[#52665D] font-semibold">
            Next Milestone Objective
          </div>
          <div className="text-base font-bold text-[#172923] truncate">
            {activeVersion.milestoneTitle}
          </div>
          <div className="text-xs text-[#52665D]">
            Identified Bottleneck:{" "}
            <span className="text-[#C58A36] font-semibold font-mono">
              {activeVersion.bottleneckType.replace(/_/g, " ")}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Task Progress List with Daily Rotating Problems */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-1">
          <div className="text-xs font-mono uppercase tracking-wider text-[#52665D] font-semibold">
            Target Tasks &amp; Daily Problems
          </div>
          <span className="text-xs text-[#8E9F97] font-mono">
            Rotates daily at 00:00 UTC
          </span>
        </div>

        <div className="space-y-4">
          {activeVersion.tasks.map((task) => {
            const pct = Math.min(100, Math.round((task.quantityCompleted / task.quantity) * 100));
            const isDone = task.quantityCompleted >= task.quantity;

            let parsedTopics: string[] = [];
            try {
              parsedTopics = JSON.parse(task.topics || "[]");
            } catch {}

            // Dynamically resolve today's rotating daily problem
            const resolvedProblem = task.problemUrl
              ? {
                  id: task.problemId || "",
                  name: task.problemName || "",
                  url: task.problemUrl,
                  rating: task.problemRating || task.minDifficulty || 800,
                  topics: parsedTopics,
                  platform: task.platform || "codeforces",
                }
              : (task.type === "practice" || task.type === "review" || task.type === "upsolve")
              ? getDailyProblemForCriteria(
                  task.platform || "codeforces",
                  task.minDifficulty ?? undefined,
                  task.maxDifficulty ?? undefined,
                  parsedTopics
                )
              : null;

            const displayTitle = resolvedProblem && (!task.problemName || task.title.includes("problems rated") || task.title.includes("problems focusing"))
              ? `Solve: ${resolvedProblem.id} - ${resolvedProblem.name} (${resolvedProblem.platform === "leetcode" ? "LeetCode" : "CF"} ${resolvedProblem.rating} • ${parsedTopics[0] || resolvedProblem.topics[0] || "practice"})`
              : task.title;

            return (
              <div
                key={task.id}
                className="bg-[#F8FAF7] border border-[#E2E8E3] hover:border-[#CBD5CD] rounded-xl p-5 sm:p-6 space-y-4 transition shadow-subtle"
              >
                {/* Title & Completion Status */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-sm font-semibold text-[#172923] font-mono tracking-tight">
                        {displayTitle}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#FFFFFF] text-[#52665D] font-mono uppercase border border-[#E2E8E3] font-medium">
                        {task.type}
                      </span>
                      {task.platform && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-[#FFFFFF] text-[#52665D] font-mono border border-[#E2E8E3]">
                          {task.platform}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#52665D] flex items-start gap-1.5 leading-relaxed">
                      <span className="text-[#8E9F97] shrink-0 font-medium">Why:</span>
                      <span>
                        {resolvedProblem && (!task.problemName || task.reason.includes("limited recent exposure"))
                          ? `Today's targeted problem at rating ${resolvedProblem.rating} focusing on '${parsedTopics[0] || "practice"}'. Rotates daily to establish consistency.`
                          : task.reason}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <div className="text-sm font-bold font-mono text-[#172923]">
                      {task.quantityCompleted} / {task.quantity}
                    </div>
                    <div className="text-xs text-[#8E9F97] font-mono mt-0.5">
                      {isDone ? (
                        <span className="text-[#176B5B] font-semibold flex items-center gap-1 justify-end">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Done
                        </span>
                      ) : (
                        `${pct}% verified`
                      )}
                    </div>
                  </div>
                </div>

                {/* Deterministic Evidence Progress Bar */}
                <div className="w-full bg-[#EBEFEA] rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDone ? "bg-[#176B5B]" : "bg-[#176B5B]"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Daily Problem Action Bar with Direct Link */}
                {resolvedProblem && (
                  <div className="pt-3 border-t border-[#E2E8E3] flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-[#E5F1EB] text-[#145B4D] font-semibold border border-[#BCE0D4]">
                        <Sparkles className="w-3 h-3 text-[#176B5B]" />
                        Today's Pick • {getDailyBadgeLabel()}
                      </span>
                      {resolvedProblem.rating && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-[#FFFFFF] text-[#C58A36] font-mono border border-[#E2E8E3] font-semibold">
                          Rating {resolvedProblem.rating}
                        </span>
                      )}
                    </div>

                    <a
                      href={resolvedProblem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#176B5B] hover:bg-[#115246] text-white font-semibold text-xs px-4 py-2 rounded-lg transition shadow-sm shadow-[#176B5B]/20 cursor-pointer"
                    >
                      <span>Solve Problem</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Plan Rationale Accordion */}
      <div className="pt-2 border-t border-[#EBEFEA] flex items-center justify-between text-xs text-[#52665D]">
        <button
          onClick={() => setShowWhyModal(!showWhyModal)}
          className="flex items-center gap-1.5 text-[#52665D] hover:text-[#172923] transition font-medium cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#176B5B]" />
          <span>Why this plan? Rationale &amp; Evidence</span>
          {showWhyModal ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
        </button>
        <span className="font-mono text-xs text-[#8E9F97]">Deterministic matching via synced activity</span>
      </div>

      {/* 5. Detailed Rationale Panel */}
      {showWhyModal && (
        <div className="bg-[#F8FAF7] p-5 sm:p-6 rounded-xl border border-[#E2E8E3] text-xs space-y-4 animate-in fade-in duration-200">
          <div className="font-semibold text-[#172923] text-xs uppercase tracking-wider font-mono">
            Plan Reasoning &amp; Constraint Logic
          </div>
          <p className="text-[#52665D] leading-relaxed text-xs">
            This plan was deterministically synthesized from your connected platform submissions, contest history, and goal deadline. Tasks focus strictly on identified difficulty drop-offs and weak topic clusters to maximize rating progression velocity.
          </p>
          <div className="space-y-2.5 pt-1">
            {activeVersion.tasks.map((t) => (
              <div key={t.id} className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E2E8E3] space-y-1">
                <div className="font-semibold text-[#172923] font-mono text-xs">{t.title}</div>
                <div className="text-[#52665D] text-xs leading-relaxed">{t.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Goal Coach Drawer */}
      {showCoach && (
        <div className="bg-[#F8FAF7] p-5 sm:p-6 rounded-xl border border-[#BCE0D4] text-xs space-y-4 mt-3 animate-in fade-in duration-200 shadow-elevated">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8E3]">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#176B5B]" />
              <span className="font-mono font-bold text-[#172923] uppercase tracking-wider text-xs">
                Goal Coach (Evidence-Constrained)
              </span>
            </div>
            <span className="text-xs text-[#8E9F97] font-mono">Answers grounded in verified facts</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#52665D] text-xs">Quick Prompts:</span>
            {[
              "Why this plan?",
              "Why am I practicing this difficulty?",
              "Am I improving?",
              "Can I reduce this week's workload?",
            ].map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  setCoachQuestion(prompt);
                  handleAskCoach(prompt);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F0F4F1] text-[#145B4D] border border-[#BCE0D4] text-xs transition cursor-pointer font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskCoach(coachQuestion);
            }}
            className="flex items-center gap-2.5 pt-1"
          >
            <input
              type="text"
              value={coachQuestion}
              onChange={(e) => setCoachQuestion(e.target.value)}
              placeholder="Ask a question about your plan, goal, or evidence..."
              className="flex-1 bg-[#FFFFFF] border border-[#E2E8E3] rounded-lg px-4 py-2.5 text-xs text-[#172923] placeholder-[#8E9F97] focus:outline-none focus:border-[#176B5B] font-sans"
            />
            <button
              type="submit"
              disabled={coachLoading || !coachQuestion.trim()}
              className="px-4 py-2.5 rounded-lg bg-[#176B5B] hover:bg-[#115246] text-white font-semibold text-xs flex items-center gap-2 disabled:opacity-50 transition shrink-0 cursor-pointer shadow-sm shadow-[#176B5B]/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>

          {coachLoading && (
            <div className="text-xs text-[#176B5B] animate-pulse py-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#176B5B] animate-ping"></span>
              <span>Goal Coach is reviewing your goal evidence and current plan...</span>
            </div>
          )}

          {coachAnswer && (
            <div className="bg-[#FFFFFF] border border-[#E2E8E3] p-4 rounded-xl text-[#172923] leading-relaxed text-xs">
              <span className="font-semibold text-[#176B5B] font-mono">Coach: </span>
              {coachAnswer}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
