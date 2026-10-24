import { UnifiedActivityItem } from "@/analytics/activity-feed.service";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import clsx from "clsx";

interface ActivityFeedProps {
  items: UnifiedActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
        No recent practice activity recorded. Connect your platforms and click Sync to ingest recent submissions.
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
        <div key={groupName} className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1">
            {groupName}
          </div>

          <div className="space-y-2">
            {groupItems.map((item) => {
              if (item.type === "contest") {
                return (
                  <div
                    key={item.id}
                    className="bg-slate-900/90 border border-amber-500/20 rounded-lg p-4 flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 capitalize">
                          {item.platform} • Rating adjustment
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold text-white">
                        {item.oldRating} → {item.newRating}
                      </div>
                      <div
                        className={clsx(
                          "text-xs font-semibold mt-0.5",
                          (item.ratingChange ?? 0) >= 0
                            ? "text-emerald-400"
                            : "text-rose-400"
                        )}
                      >
                        {(item.ratingChange ?? 0) >= 0
                          ? `+${item.ratingChange}`
                          : item.ratingChange}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="shrink-0">
                      {item.accepted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                    </div>

                    <div>
                      <div className="text-sm font-medium text-white flex items-center gap-2">
                        <span>{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <span className="capitalize font-medium text-slate-300">
                          {item.platform}
                        </span>
                        <span>•</span>
                        <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono text-[11px]">
                          {item.difficulty || "Unrated"}
                        </span>
                        {item.topics.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-slate-400">
                              {item.topics.slice(0, 2).join(", ")}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={clsx(
                        "text-xs font-semibold px-2 py-0.5 rounded",
                        item.accepted
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      )}
                    >
                      {item.verdict === "ACCEPTED" ? "AC" : item.verdict}
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
