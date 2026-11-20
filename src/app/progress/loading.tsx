export default function ProgressLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-slate-800/60 rounded"></div>
          <div className="h-7 w-64 bg-slate-800 rounded-md"></div>
          <div className="h-4 w-96 bg-slate-800/50 rounded"></div>
        </div>
        <div className="h-12 w-48 bg-slate-900 border border-slate-800 rounded-lg"></div>
      </div>

      {/* KPI Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2"
          >
            <div className="h-3 w-24 bg-slate-800/60 rounded"></div>
            <div className="h-7 w-16 bg-slate-800 rounded-md"></div>
            <div className="h-3 w-28 bg-slate-800/40 rounded"></div>
          </div>
        ))}
      </div>

      {/* Activity Heatmap Skeleton */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="h-5 w-48 bg-slate-800 rounded-md"></div>
        <div className="h-36 bg-slate-800/30 rounded-lg"></div>
      </div>

      {/* Rating Trajectory Skeleton */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="h-5 w-56 bg-slate-800 rounded-md"></div>
        <div className="h-44 bg-slate-800/30 rounded-lg"></div>
      </div>
    </div>
  );
}
