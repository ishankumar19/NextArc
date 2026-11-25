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
    return "bg-[#080A0F] border-white/[0.05]";
  }

  return (
    <div className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-7 sm:p-9 shadow-subtle space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div className="space-y-1">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>Practice &amp; Contest Activity Radar</span>
          </h3>
          <p className="text-xs text-slate-400">
            16-week trailing submission frequency and official contest participation
          </p>
        </div>

        <div className="flex items-center gap-5 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <span>Active Days:</span>
            <strong className="text-white font-bold text-sm">{totalActiveDays}</strong>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Streak:</span>
            <strong className="text-amber-400 font-bold text-sm">{currentStreak}d</strong>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          {/* Month Header */}
          <div className="flex text-xs text-slate-400 font-mono mb-2 pl-7">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                style={{ marginLeft: idx === 0 ? `${m.colIndex * 18}px` : undefined }}
                className="inline-block w-14 text-left font-medium"
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex gap-2 items-start">
            {/* Day Labels */}
            <div className="flex flex-col gap-1.5 text-[10px] text-slate-400 font-mono pr-1 pt-0.5 select-none font-medium">
              <span className="h-4 leading-4">M</span>
              <span className="h-4 leading-4 opacity-0">T</span>
              <span className="h-4 leading-4">W</span>
              <span className="h-4 leading-4 opacity-0">T</span>
              <span className="h-4 leading-4">F</span>
              <span className="h-4 leading-4 opacity-0">S</span>
              <span className="h-4 leading-4 opacity-0">S</span>
            </div>

            {/* Weeks */}
            <div className="flex gap-1.5">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((day) => {
                    const colorClass = getColor(day.count, day.hasContest, day.isFuture);
                    return (
                      <div
                        key={day.dateStr}
                        title={`${day.dateStr}: ${day.count} solves${day.hasContest ? " (Official Contest)" : ""}`}
                        className={`w-4 h-4 rounded-[3px] border transition-transform duration-150 hover:scale-125 cursor-pointer ${colorClass}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 font-mono pt-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-3.5 h-3.5 rounded-[3px] bg-[#080A0F] border border-white/[0.06]" />
            <div className="w-3.5 h-3.5 rounded-[3px] bg-indigo-950/90 border border-indigo-800/40" />
            <div className="w-3.5 h-3.5 rounded-[3px] bg-indigo-600/90 border border-indigo-500/40" />
            <div className="w-3.5 h-3.5 rounded-[3px] bg-indigo-500 border border-indigo-400" />
          </div>
          <span>More</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-[3px] bg-amber-400 border border-amber-300 shadow-sm shadow-amber-500/30" />
          <span className="text-slate-300">Official Codeforces Rated Contest</span>
        </div>
      </div>
    </div>
  );
}
