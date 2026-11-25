import { UnifiedActivityItem } from "@/analytics/activity-feed.service";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import clsx from "clsx";

interface ActivityFeedProps {
  items: UnifiedActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-[#FFFFFF] border border-[#E2E8E3] rounded-2xl p-10 text-center space-y-3 shadow-card">
        <div className="text-base font-semibold text-[#172923]">
          No practice activity recorded yet
        </div>
        <p className="text-xs sm:text-sm text-[#52665D] max-w-sm mx-auto leading-relaxed">
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
          <div className="text-xs font-mono uppercase tracking-wider text-[#52665D] pl-1 font-semibold">
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
                    className="bg-[#FFFDF9] border border-[#F3DCB1] hover:border-[#E4C78B] rounded-xl p-4 sm:p-5 flex items-center justify-between transition shadow-subtle gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#FDF8EE] border border-[#F3DCB1] flex items-center justify-center text-[#C58A36] shrink-0">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <div className="font-semibold text-[#172923] text-sm truncate">
                          {item.title}
                        </div>
                        <div className="text-xs text-[#52665D] capitalize flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#FDF8EE] text-[#96601A] font-medium border border-[#F3DCB1]">
                            {item.platform}
                          </span>
                          <span className="text-[#CBD5CD]">•</span>
                          <span>Official Rated Contest Round</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 pl-3 space-y-0.5">
                      <div className="text-sm font-mono font-bold text-[#172923]">
                        {item.oldRating} → {item.newRating}
                      </div>
                      <div
                        className={clsx(
                          "text-xs font-mono font-bold",
                          isPositive ? "text-[#176B5B]" : "text-[#C65D5D]"
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
                  className="bg-[#FFFFFF] border border-[#E2E8E3] hover:border-[#CBD5CD] rounded-xl p-4 sm:p-4.5 flex items-center justify-between transition shadow-subtle gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="shrink-0">
                      {item.accepted ? (
                        <div className="w-7 h-7 rounded-lg bg-[#EDF7F2] border border-[#C2E5D4] flex items-center justify-center text-[#176B5B]">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-[#FDF2F2] border border-[#F5C6C6] flex items-center justify-center text-[#C65D5D]">
                          <XCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="text-sm font-semibold text-[#172923] truncate">
                        {item.title}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#52665D] flex-wrap">
                        <span className="capitalize font-mono text-xs px-2 py-0.5 rounded bg-[#F0F4F1] text-[#52665D] border border-[#E2E8E3] font-medium">
                          {item.platform}
                        </span>
                        {item.difficulty && (
                          <span className="font-mono text-xs font-semibold text-[#176B5B]">
                            {item.difficulty}
                          </span>
                        )}
                        {item.topics && item.topics.length > 0 && (
                          <span className="text-[#64746C] truncate max-w-[200px]">
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
                          ? "bg-[#EDF7F2] text-[#145B4D] border-[#C2E5D4]"
                          : "bg-[#FDF2F2] text-[#9C3939] border-[#F5C6C6]"
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
