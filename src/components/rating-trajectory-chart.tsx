"use client";

import { useMemo, useState } from "react";
import { ContestHistoryItem } from "@/analytics/contest.analytics";
import { Trophy, TrendingUp, Calendar } from "lucide-react";

interface RatingTrajectoryChartProps {
  contests: ContestHistoryItem[];
  currentRating: number;
  maxRating: number;
}

export function RatingTrajectoryChart({
  contests,
  currentRating,
  maxRating,
}: RatingTrajectoryChartProps) {
  const [activePoint, setActivePoint] = useState<any | null>(null);

  // Sort contests chronologically for plotting
  const points = useMemo(() => {
    if (!contests || contests.length === 0) return [];
    const sorted = [...contests].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    return sorted;
  }, [contests]);

  if (points.length === 0) {
    return (
      <div className="py-12 text-center space-y-2.5 bg-[#080A0F] border border-white/[0.06] rounded-lg">
        <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 mx-auto">
          <Trophy className="w-4 h-4 text-slate-400" />
        </div>
        <div className="text-xs font-semibold text-slate-300">
          No rated contest history recorded yet
        </div>
        <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
          Participate in Codeforces rounds or connect an active handle with rated contests to view your rating curve.
        </p>
      </div>
    );
  }

  // Calculate SVG coordinates
  const ratings = points.map((p) => p.newRating);
  const minR = Math.max(0, Math.min(...ratings, currentRating) - 100);
  const maxR = Math.max(...ratings, maxRating) + 100;
  const range = maxR - minR || 1;

  const width = 800;
  const height = 180;
  const paddingX = 40;
  const paddingY = 25;

  const chartPoints = points.map((p, idx) => {
    const x =
      points.length === 1
        ? width / 2
        : paddingX + (idx / (points.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((p.newRating - minR) / range) * (height - paddingY * 2);
    return { ...p, x, y };
  });

  const polylinePath = chartPoints.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPath = `${chartPoints[0].x},${height - paddingY} ${polylinePath} ${
    chartPoints[chartPoints.length - 1].x
  },${height - paddingY}`;

  return (
    <div className="space-y-4">
      {/* SVG Trajectory Chart */}
      <div className="relative w-full h-[190px] overflow-hidden rounded-lg bg-[#080A0F] border border-white/[0.06] p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="cfTrajectoryGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="rgba(255,255,255,0.08)"
          />

          {/* Fill Area */}
          <polygon points={areaPath} fill="url(#cfTrajectoryGradient)" />

          {/* Trajectory Line */}
          <polyline
            fill="none"
            stroke="#6366F1"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polylinePath}
          />

          {/* Data Points */}
          {chartPoints.map((p, idx) => (
            <g
              key={idx}
              className="cursor-pointer group"
              onMouseEnter={() => setActivePoint(p)}
              onMouseLeave={() => setActivePoint(null)}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill="#080A0F"
                stroke="#6366F1"
                strokeWidth="2"
                className="transition-all duration-150 group-hover:r-6 group-hover:fill-indigo-400"
              />
              <text
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                fill="#f8fafc"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
              >
                {p.newRating} ({p.ratingChange >= 0 ? `+${p.ratingChange}` : p.ratingChange})
              </text>
            </g>
          ))}
        </svg>

        {activePoint && (
          <div className="absolute top-2 right-3 bg-[#0C1017] border border-white/[0.08] px-3 py-1.5 rounded-md text-[11px] font-mono text-slate-300 shadow-card flex items-center gap-2">
            <span className="text-white font-semibold">{activePoint.contestName}</span>
            <span className="text-slate-500">•</span>
            <span className="text-indigo-400 font-bold">{activePoint.newRating}</span>
            <span className={activePoint.ratingChange >= 0 ? "text-emerald-400" : "text-rose-400"}>
              ({activePoint.ratingChange >= 0 ? `+${activePoint.ratingChange}` : activePoint.ratingChange})
            </span>
          </div>
        )}
      </div>

      {/* Trajectory Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/[0.06] text-slate-400 text-[11px] font-mono uppercase font-semibold">
              <th className="py-2.5 px-3">Contest Round</th>
              <th className="py-2.5 px-3">Rank</th>
              <th className="py-2.5 px-3">Rating Delta</th>
              <th className="py-2.5 px-3">Post-Round Rating</th>
              <th className="py-2.5 px-3 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {contests.map((c) => (
              <tr key={c.contestId} className="hover:bg-white/[0.02] transition">
                <td className="py-2.5 px-3 font-medium text-white truncate max-w-[260px]">
                  {c.contestName}
                </td>
                <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">#{c.rank}</td>
                <td className="py-2.5 px-3 font-mono text-[11px]">
                  <span
                    className={`font-semibold ${
                      c.ratingChange >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {c.ratingChange >= 0 ? `+${c.ratingChange}` : c.ratingChange}
                  </span>
                </td>
                <td className="py-2.5 px-3 font-bold font-mono text-slate-100">{c.newRating}</td>
                <td className="py-2.5 px-3 text-slate-500 text-right font-mono text-[11px]">
                  {new Date(c.timestamp).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
