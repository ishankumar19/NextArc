export default function ProgressLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-2">
          <div className="h-3 w-32 bg-white/[0.06] rounded"></div>
          <div className="h-6 w-64 bg-white/[0.06] rounded-md"></div>
          <div className="h-4 w-96 bg-white/[0.04] rounded"></div>
        </div>
        <div className="h-10 w-44 bg-[#0C1017] border border-white/[0.08] rounded-lg"></div>
      </div>

      {/* KPI Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-4 space-y-2"
          >
            <div className="h-3 w-24 bg-white/[0.06] rounded"></div>
            <div className="h-6 w-16 bg-white/[0.06] rounded-md"></div>
            <div className="h-3 w-28 bg-white/[0.04] rounded"></div>
          </div>
        ))}
      </div>

      {/* Activity Heatmap Skeleton */}
      <div className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-6 space-y-4">
        <div className="h-4 w-48 bg-white/[0.06] rounded-md"></div>
        <div className="h-36 bg-white/[0.03] rounded-lg"></div>
      </div>

      {/* Rating Trajectory Skeleton */}
      <div className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-6 space-y-4">
        <div className="h-4 w-56 bg-white/[0.06] rounded-md"></div>
        <div className="h-44 bg-white/[0.03] rounded-lg"></div>
      </div>
    </div>
  );
}
