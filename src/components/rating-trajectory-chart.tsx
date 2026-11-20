"use client";

import { useMemo } from "react";
import { ContestHistoryItem } from "@/analytics/contest.analytics";

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
      <div className="py-10 text-center space-y-2">
        <div className="text-sm font-semibold text-slate-400">
          No rated contest history recorded yet.
        </div>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
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
      <div className="relative w-full h-[190px] overflow-hidden rounded-lg bg-slate-950/60 border border-slate-800/80 p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="cfGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="#1e293b"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="#1e293b"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="#334155"
          />

          {/* Fill Area */}
          <polygon points={areaPath} fill="url(#cfGradient)" />

          {/* Trajectory Line */}
          <polyline
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polylinePath}
          />

          {/* Data Points */}
          {chartPoints.map((p, idx) => (
            <g key={idx} className="cursor-pointer group">
              <circle
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill="#0f172a"
                stroke="#06b6d4"
                strokeWidth="2.5"
                className="transition-all duration-200 group-hover:r-6 group-hover:fill-cyan-400"
              />
              {/* Tooltip text above point on hover */}
              <text
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                fill="#e2e8f0"
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
      </div>

      {/* Trajectory Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase font-medium">
              <th className="py-2.5 px-3">Contest</th>
              <th className="py-2.5 px-3">Rank</th>
              <th className="py-2.5 px-3">Rating Change</th>
              <th className="py-2.5 px-3">New Rating</th>
              <th className="py-2.5 px-3 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {contests.map((c) => (
              <tr key={c.contestId} className="hover:bg-slate-950/40 transition">
                <td className="py-2.5 px-3 font-medium text-white">{c.contestName}</td>
                <td className="py-2.5 px-3 text-slate-300 font-mono">#{c.rank}</td>
                <td className="py-2.5 px-3">
                  <span
                    className={`font-semibold font-mono ${
                      c.ratingChange >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {c.ratingChange >= 0 ? `+${c.ratingChange}` : c.ratingChange}
                  </span>
                </td>
                <td className="py-2.5 px-3 font-bold font-mono text-white">{c.newRating}</td>
                <td className="py-2.5 px-3 text-slate-400 text-right">
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
