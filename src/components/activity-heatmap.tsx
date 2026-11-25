"use client";

import { useMemo } from "react";
import { format, subDays, startOfWeek, addDays } from "date-fns";
import { Flame, Calendar, Trophy } from "lucide-react";

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

    const weeksArr: Array<
      Array<{ date: Date; dateStr: string; count: number; hasContest: boolean; isFuture: boolean }>
    > = [];
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
    if (isFuture) return "bg-[#080A0F]/30 border-transparent opacity-20 pointer-events-none";
    if (hasContest) return "bg-amber-400 border-amber-300 shadow-sm shadow-amber-500/30";
    if (count >= 5) return "bg-indigo-500 border-indigo-400";
    if (count >= 3) return "bg-indigo-600/90 border-indigo-500/40";
    if (count >= 1) return "bg-indigo-950/90 border-indigo-800/40";
    return "bg-[#080A0F] border-white/[0.04]";
  }

  return (
    <div className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-5 sm:p-6 shadow-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>Practice &amp; Contest Activity Radar</span>
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            16-week trailing submission frequency and official contest participation
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Active Days:</span>
            <strong className="text-white font-bold">{totalActiveDays}</strong>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Streak:</span>
            <strong className="text-amber-400 font-bold">{currentStreak}d</strong>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-1">
        <div className="inline-block min-w-full">
          {/* Month Header */}
          <div className="flex text-[10px] text-slate-500 font-mono mb-1.5 pl-6">
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
                      title={`${format(day.date, "MMM d, yyyy")}: ${day.count} submission${
                        day.count === 1 ? "" : "s"
                      }${day.hasContest ? " (Official Contest Participated)" : ""}`}
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
      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/[0.04] flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-amber-400 border border-amber-300"></span>
          <span className="font-mono text-slate-400">Contest Day</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500">Less</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#080A0F] border border-white/[0.04]"></span>
            <span className="w-2.5 h-2.5 rounded-[2px] bg-indigo-950 border border-indigo-800/40"></span>
            <span className="w-2.5 h-2.5 rounded-[2px] bg-indigo-600 border border-indigo-500"></span>
            <span className="w-2.5 h-2.5 rounded-[2px] bg-indigo-500 border border-indigo-400"></span>
          </div>
          <span className="text-[10px] text-slate-500">More</span>
        </div>
      </div>
    </div>
  );
}
