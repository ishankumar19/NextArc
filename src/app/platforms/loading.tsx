export default function PlatformsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-slate-800/60 rounded"></div>
          <div className="h-7 w-64 bg-slate-800 rounded-md"></div>
          <div className="h-4 w-96 bg-slate-800/50 rounded"></div>
        </div>
        <div className="h-10 w-36 bg-slate-800 rounded-lg"></div>
      </div>

      {/* Philosophy banner skeleton */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 h-16"></div>

      {/* Platform Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800"></div>
                <div className="space-y-1">
                  <div className="h-4 w-28 bg-slate-800 rounded"></div>
                  <div className="h-3 w-16 bg-slate-800/50 rounded"></div>
                </div>
              </div>
              <div className="h-6 w-20 bg-slate-800 rounded-full"></div>
            </div>
            <div className="h-24 bg-slate-800/30 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
