import { UnifiedActivityItem } from "@/analytics/activity-feed.service";
import { CheckCircle2, XCircle, Trophy, ArrowRight, ExternalLink } from "lucide-react";
import clsx from "clsx";

interface ActivityFeedProps {
  items: UnifiedActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-10 text-center space-y-3">
        <div className="text-base font-semibold text-slate-200">
          No practice activity recorded yet
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          Connect your Codeforces or LeetCode handle in Platforms and sync to ingest recent verified activity.
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
    <div className="space-y-7">
      {Object.entries(groups).map(([groupName, groupItems]) => (
        <div key={groupName} className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 pl-1 font-semibold">
            {groupName}
          </div>

          <div className="space-y-3">
            {groupItems.map((item) => {
              if (item.type === "contest") {
                const delta = item.ratingChange ?? 0;
                const isPositive = delta >= 0;

                return (
                  <div
                    key={item.id}
                    className="bg-[#0C1017] border border-amber-500/20 hover:border-amber-500/35 rounded-xl p-4 sm:p-5 flex items-center justify-between transition shadow-subtle gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <div className="font-semibold text-white text-sm truncate">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-400 capitalize flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-medium">
                            {item.platform}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span>Official Rated Contest Round</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 pl-3 space-y-0.5">
                      <div className="text-sm font-mono font-bold text-slate-100">
                        {item.oldRating} → {item.newRating}
                      </div>
                      <div
                        className={clsx(
                          "text-xs font-mono font-bold",
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
                  className="bg-[#0C1017] border border-white/[0.08] hover:border-white/[0.16] rounded-xl p-4 sm:p-4.5 flex items-center justify-between transition shadow-sm gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="shrink-0">
                      {item.accepted ? (
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400">
                          <XCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="text-sm font-semibold text-white truncate">
                        {item.title}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
                        <span className="capitalize font-mono text-xs px-2 py-0.5 rounded bg-white/[0.05] text-slate-300 border border-white/[0.08] font-medium">
                          {item.platform}
                        </span>
                        {item.difficulty && (
                          <span className="font-mono text-xs font-semibold text-indigo-300">
                            {item.difficulty}
                          </span>
                        )}
                        {item.topics && item.topics.length > 0 && (
                          <span className="text-slate-400 truncate max-w-[200px]">
                            • {item.topics.slice(0, 2).join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <span
                      className={clsx(
                        "text-xs font-mono font-semibold px-2.5 py-1 rounded-md border",
                        item.accepted
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/25"
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
