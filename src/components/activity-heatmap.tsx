"use client";

import { useMemo } from "react";
import { format, subDays, startOfWeek, addDays } from "date-fns";
import { Flame, Calendar } from "lucide-react";

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
    if (isFuture) return "bg-[#F0F4F1]/30 border-transparent opacity-20 pointer-events-none";
    if (hasContest) return "bg-[#C58A36] border-[#A36D22] shadow-sm shadow-[#C58A36]/30";
    if (count >= 5) return "bg-[#176B5B] border-[#0D3A31]";
    if (count >= 3) return "bg-[#4D9A7C] border-[#176B5B]";
    if (count >= 1) return "bg-[#CCE4D8] border-[#99C9B1]";
    return "bg-[#F0F4F1] border-[#E2E8E3]";
  }

  return (
    <div className="bg-[#FFFFFF] border border-[#E2E8E3] rounded-2xl p-7 sm:p-9 shadow-card space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EBEFEA]">
        <div className="space-y-1">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#172923] font-semibold flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-[#176B5B]" />
            <span>Practice &amp; Contest Activity Radar</span>
          </h3>
          <p className="text-xs text-[#52665D]">
            16-week trailing submission frequency and official contest participation
          </p>
        </div>

        <div className="flex items-center gap-5 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#52665D]">
            <span>Active Days:</span>
            <strong className="text-[#172923] font-bold text-sm">{totalActiveDays}</strong>
          </div>
          <div className="flex items-center gap-2 text-[#52665D]">
            <Flame className="w-4 h-4 text-[#C58A36]" />
            <span>Streak:</span>
            <strong className="text-[#C58A36] font-bold text-sm">{currentStreak}d</strong>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          {/* Month Header */}
          <div className="flex text-xs text-[#52665D] font-mono mb-2 pl-7">
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
            <div className="flex flex-col gap-1.5 text-[10px] text-[#8E9F97] font-mono pr-1 pt-0.5 select-none font-medium">
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#52665D] font-mono pt-3 border-t border-[#EBEFEA]">
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-3.5 h-3.5 rounded-[3px] bg-[#F0F4F1] border border-[#E2E8E3]" />
            <div className="w-3.5 h-3.5 rounded-[3px] bg-[#CCE4D8] border border-[#99C9B1]" />
            <div className="w-3.5 h-3.5 rounded-[3px] bg-[#4D9A7C] border border-[#176B5B]" />
            <div className="w-3.5 h-3.5 rounded-[3px] bg-[#176B5B] border border-[#0D3A31]" />
          </div>
          <span>More</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-[3px] bg-[#C58A36] border border-[#A36D22] shadow-sm shadow-[#C58A36]/30" />
          <span className="text-[#172923] font-medium">Official Codeforces Rated Contest</span>
        </div>
      </div>
    </div>
  );
}
