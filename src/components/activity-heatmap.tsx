"use client";

import { useMemo } from "react";
import { format, subDays, startOfWeek, addDays, isSameDay } from "date-fns";

interface ActivityHeatmapProps {
  dailyCounts?: Record<string, number>;
  totalActiveDays?: number;
  currentStreak?: number;
  contestDates?: string[];
}

export function ActivityHeatmap({
  dailyCounts = {},
  totalActiveDays = 0,
  currentStreak = 0,
  contestDates = [],
}: ActivityHeatmapProps) {
  // Generate last 16 weeks (112 days) grid
  const { weeks, monthLabels } = useMemo(() => {
    const today = new Date();
    // Start 15 weeks ago on Monday
    const startDate = startOfWeek(subDays(today, 15 * 7), { weekStartsOn: 1 });
    
    const weeksArr: Array<Array<{ date: Date; dateStr: string; count: number; hasContest: boolean; isFuture: boolean }>> = [];
    const months: Array<{ label: string; colIndex: number }> = [];
    let lastMonth = "";

    for (let w = 0; w < 16; w++) {
      const weekDays = [];
      const colStartDate = addDays(startDate, w * 7);
      const currentMonthStr = format(colStartDate, "MMM");
      if (currentMonthStr !== lastMonth) {
        months.push({ label: currentMonthStr, colIndex: w });
        lastMonth = currentMonthStr;
      }

      for (let d = 0; d < 7; d++) {
        const date = addDays(colStartDate, d);
        const dateStr = format(date, "yyyy-MM-dd");
        const count = dailyCounts[dateStr] || 0;
        const hasContest = contestDates.some((cd) => cd.startsWith(dateStr));
        const isFuture = date.getTime() > today.getTime();

        weekDays.push({
          date,
          dateStr,
          count,
          hasContest,
          isFuture,
        });
      }
      weeksArr.push(weekDays);
    }

    return { weeks: weeksArr, monthLabels: months };
  }, [dailyCounts, contestDates]);

  function getColor(count: number, hasContest: boolean, isFuture: boolean) {
    if (isFuture) return "bg-slate-900/30 border-transparent opacity-30";
    if (hasContest) return "bg-amber-500 border-amber-400 shadow-sm shadow-amber-500/50";
    if (count >= 5) return "bg-indigo-500 border-indigo-400";
    if (count >= 3) return "bg-indigo-600/90 border-indigo-500/50";
    if (count >= 1) return "bg-indigo-900/80 border-indigo-800/40";
    return "bg-slate-950 border-slate-800/60";
  }

  const daysOfWeek = ["Mon", "Wed", "Fri", "Sun"];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Practice &amp; Contest Activity Heatmap
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            16-week trailing submission frequency and contest participation
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-slate-400">
            Active Days: <strong className="text-white">{totalActiveDays}</strong>
          </span>
          <span className="text-slate-400">
            Current Streak: <strong className="text-amber-400">{currentStreak}d</strong>
          </span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-1">
        <div className="inline-block min-w-full">
          {/* Month Header */}
          <div className="flex text-[10px] text-slate-500 font-mono mb-1.5 pl-7">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                style={{ marginLeft: idx === 0 ? `${m.colIndex * 15}px` : undefined }}
                className="inline-block w-12 text-left"
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex gap-1.5 items-start">
            {/* Day Labels */}
            <div className="flex flex-col gap-1 text-[9px] text-slate-500 font-mono pr-1 pt-0.5 select-none">
              <span className="h-3 leading-3">M</span>
              <span className="h-3 leading-3 opacity-0">T</span>
              <span className="h-3 leading-3">W</span>
              <span className="h-3 leading-3 opacity-0">T</span>
              <span className="h-3 leading-3">F</span>
              <span className="h-3 leading-3 opacity-0">S</span>
              <span className="h-3 leading-3">S</span>
            </div>

            {/* Weeks Columns */}
            <div className="flex gap-1">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      title={`${format(day.date, "MMM d, yyyy")}: ${day.count} submission${day.count === 1 ? "" : "s"}${day.hasContest ? " (Contest Participated)" : ""}`}
                      className={`w-3 h-3 rounded-[2.5px] border transition-all duration-150 cursor-pointer hover:scale-125 hover:z-10 ${getColor(
                        day.count,
                        day.hasContest,
                        day.isFuture
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-amber-500 border border-amber-400 inline-block" />
          <span>Contest Event</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-950 border border-slate-800/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-indigo-900/80 border border-indigo-800/40 inline-block" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-indigo-600/90 border border-indigo-500/50 inline-block" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-indigo-500 border border-indigo-400 inline-block" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
