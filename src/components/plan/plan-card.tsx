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
  topics: string; // JSON string
  reason: string;
  evidenceReferences: string; // JSON string
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

  // Empty state when no plan has been generated yet
  if (!activeVersion) {
    return (
      <section className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-6 sm:p-7 shadow-subtle relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                Evidence-Based Planner
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-mono border border-indigo-500/20">
                ACTIVE REASONER
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Adaptive Practice Plan</h2>
            <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
              Generate an adaptive practice plan grounded directly in your verified platform facts. Identifies performance drop-offs and prescribes targeted daily problems.
            </p>
          </div>

          <button
            onClick={handleGeneratePlan}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shrink-0 disabled:opacity-50 shadow-sm shadow-indigo-600/30 cursor-pointer"
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
    <section className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-6 sm:p-7 space-y-6 shadow-subtle relative overflow-hidden">
      {/* 1. Header with Version and Timeframe */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-semibold">
              Active Practice Plan
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              v{activeVersion.versionNumber}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-medium">
              Window: {startDateFormatted} – {reviewDateFormatted}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{activeVersion.summary}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowCoach(!showCoach)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold border border-white/[0.08] transition cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>Goal Coach</span>
          </button>

          <button
            onClick={handleAdaptPlan}
            disabled={adapting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition disabled:opacity-50 cursor-pointer"
            title="Evaluate observed evidence and generate adapted Plan v(N+1)"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${adapting ? "animate-spin" : ""}`} />
            <span>{adapting ? "Adapting..." : "Adapt Plan"}</span>
          </button>
        </div>
      </div>

      {/* 2. Next Milestone Box */}
      <div className="bg-[#080A0F] border border-white/[0.06] rounded-lg p-4 flex items-start gap-3.5">
        <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
          <Target className="w-4 h-4" />
        </div>
        <div className="space-y-0.5 min-w-0">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Next Milestone Objective
          </div>
          <div className="text-sm font-semibold text-white truncate">
            {activeVersion.milestoneTitle}
          </div>
          <div className="text-xs text-slate-400">
            Identified Bottleneck:{" "}
            <span className="text-amber-300 font-medium font-mono">
              {activeVersion.bottleneckType.replace(/_/g, " ")}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Task Progress List with Daily Rotating Problems */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Target Tasks &amp; Daily Problems
          </div>
          <span className="text-[11px] text-slate-500">
            Rotates daily at 00:00 UTC
          </span>
        </div>

        <div className="space-y-3">
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
                className="bg-[#080A0F] border border-white/[0.08] hover:border-white/[0.14] rounded-lg p-4 space-y-3 transition"
              >
                {/* Title & Completion Status */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-white font-mono tracking-tight">
                        {displayTitle}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.05] text-slate-300 font-mono uppercase border border-white/[0.06]">
                        {task.type}
                      </span>
                      {task.platform && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.04] text-slate-400 font-mono">
                          {task.platform}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 flex items-start gap-1.5 leading-relaxed">
                      <span className="text-slate-500 shrink-0 font-medium">Why:</span>
                      <span>
                        {resolvedProblem && (!task.problemName || task.reason.includes("limited recent exposure"))
                          ? `Today's targeted problem at rating ${resolvedProblem.rating} focusing on '${parsedTopics[0] || "practice"}'. Rotates daily to establish consistency.`
                          : task.reason}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold font-mono text-white">
                      {task.quantityCompleted} / {task.quantity}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {isDone ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1 justify-end">
                          <CheckCircle2 className="w-3 h-3" /> Done
                        </span>
                      ) : (
                        `${pct}% verified`
                      )}
                    </div>
                  </div>
                </div>

                {/* Deterministic Evidence Progress Bar */}
                <div className="w-full bg-[#121721] rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDone ? "bg-emerald-400" : "bg-indigo-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Daily Problem Action Bar with Direct Link */}
                {resolvedProblem && (
                  <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 font-semibold border border-indigo-500/20">
                        <Sparkles className="w-2.5 h-2.5" />
                        Today's Pick • {getDailyBadgeLabel()}
                      </span>
                      {resolvedProblem.rating && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-amber-300 font-mono border border-white/[0.06]">
                          Rating {resolvedProblem.rating}
                        </span>
                      )}
                    </div>

                    <a
                      href={resolvedProblem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm shadow-indigo-600/30 transition cursor-pointer shrink-0"
                    >
                      <span>Solve on {task.platform === "leetcode" ? "LeetCode" : "Codeforces"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {task.matches && task.matches.length > 0 && (
                  <div className="text-[11px] text-emerald-400/90 flex items-center gap-1.5 pt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {task.matches.length} matched external {task.type === "contest" ? "contest" : "submission"}
                      {task.matches.length === 1 ? "" : "s"} verified against goal
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Footer with 'Why this plan?' & Grounding Note */}
      <div className="pt-2 flex items-center justify-between border-t border-white/[0.06]">
        <button
          onClick={() => setShowWhyModal(!showWhyModal)}
          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition font-semibold cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Why this plan?</span>
          {showWhyModal ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        <span className="text-[11px] text-slate-500">
          Deterministic matching via synced platform telemetry
        </span>
      </div>

      {/* 5. Expanded 'Why this plan?' Explanation Drawer */}
      {showWhyModal && (
        <div className="bg-[#080A0F] p-4 rounded-lg border border-white/[0.08] text-xs space-y-3 mt-2 animate-in fade-in duration-200">
          <div className="font-mono text-slate-300 uppercase tracking-wider text-[11px] font-semibold">
            Evidence-Backed Rationale
          </div>
          <div className="text-slate-300 leading-relaxed">
            <span className="font-semibold text-indigo-300">Identified Bottleneck: </span>
            {activeVersion.summary}
          </div>
          <div className="space-y-1.5">
            <div className="font-semibold text-slate-400">Task Justifications:</div>
            {activeVersion.tasks.map((t) => (
              <div key={t.id} className="bg-[#0C1017] p-2.5 rounded border border-white/[0.06]">
                <div className="font-semibold text-white font-mono text-[11px]">{t.title}</div>
                <div className="text-slate-400 mt-0.5">{t.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Goal Coach Drawer */}
      {showCoach && (
        <div className="bg-[#080A0F] p-4 sm:p-5 rounded-lg border border-indigo-500/20 text-xs space-y-3.5 mt-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
                Goal Coach (Evidence-Constrained)
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Answers grounded in verified facts</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 text-[11px]">Quick Prompts:</span>
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
                className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-indigo-300 border border-white/[0.08] text-[11px] transition cursor-pointer"
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
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={coachQuestion}
              onChange={(e) => setCoachQuestion(e.target.value)}
              placeholder="Ask a question about your plan, goal, or evidence..."
              className="flex-1 bg-[#0C1017] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={coachLoading || !coachQuestion.trim()}
              className="px-3.5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 disabled:opacity-50 transition shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>

          {coachLoading && (
            <div className="text-xs text-indigo-400 animate-pulse py-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
              <span>Goal Coach is reviewing your goal evidence and current plan...</span>
            </div>
          )}

          {coachAnswer && (
            <div className="bg-[#0C1017] border border-white/[0.08] p-3.5 rounded-lg text-slate-200 leading-relaxed text-xs">
              <span className="font-semibold text-indigo-400 font-mono">Coach: </span>
              {coachAnswer}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
