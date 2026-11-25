import { UnifiedActivityItem } from "@/analytics/activity-feed.service";
import { CheckCircle2, XCircle, Trophy, ArrowRight, ExternalLink } from "lucide-react";
import clsx from "clsx";

interface ActivityFeedProps {
  items: UnifiedActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-8 text-center space-y-2">
        <div className="text-sm font-semibold text-slate-300">
          No practice activity recorded yet
        </div>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Connect your Codeforces or LeetCode handle in Platforms and sync to ingest recent activity facts.
        </p>
      </div>
    );
  }

  // Group items by dateGroup
  const groups: Record<string, UnifiedActivityItem[]> = {};
  for (const item of items) {
    if (!groups[item.dateGroup]) {
      groups[item.dateGroup] = [];
    }
    groups[item.dateGroup].push(item);
  }

  return (
    <div className="space-y-6">
      {Object.entries(groups).map(([groupName, groupItems]) => (
        <div key={groupName} className="space-y-2.5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 pl-1 font-semibold">
            {groupName}
          </div>

          <div className="space-y-2">
            {groupItems.map((item) => {
              if (item.type === "contest") {
                const delta = item.ratingChange ?? 0;
                const isPositive = delta >= 0;

                return (
                  <div
                    key={item.id}
                    className="bg-[#0C1017] border border-amber-500/20 hover:border-amber-500/35 rounded-lg p-3.5 flex items-center justify-between transition shadow-subtle"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                        <Trophy className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white text-xs truncate">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 capitalize flex items-center gap-1.5">
                          <span className="font-mono text-slate-300">{item.platform}</span>
                          <span className="text-slate-600">•</span>
                          <span>Official Rated Round</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 pl-3">
                      <div className="text-xs font-mono font-bold text-slate-200">
                        {item.oldRating} → {item.newRating}
                      </div>
                      <div
                        className={clsx(
                          "text-[11px] font-mono font-semibold mt-0.5",
                          isPositive ? "text-emerald-400" : "text-rose-400"
                        )}
                      >
                        {isPositive ? `+${delta}` : delta}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={item.id}
                  className="bg-[#0C1017] border border-white/[0.08] hover:border-white/[0.14] rounded-lg p-3 flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0">
                      {item.accepted ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                          <XCircle className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="text-xs font-medium text-white truncate flex items-center gap-2">
                        <span className="truncate">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 flex-wrap">
                        <span className="capitalize font-mono text-[10px] px-1.5 py-0.2 rounded bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                          {item.platform}
                        </span>
                        {item.difficulty && (
                          <span className="font-mono text-[10px] text-indigo-300">
                            {item.difficulty}
                          </span>
                        )}
                        {item.topics && item.topics.length > 0 && (
                          <span className="text-slate-500 truncate max-w-[150px]">
                            {item.topics.slice(0, 2).join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        item.accepted
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/20"
                      )}
                    >
                      {item.verdict || (item.accepted ? "AC" : "WA")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
