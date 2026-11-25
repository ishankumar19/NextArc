export default function PlatformsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-2">
          <div className="h-3 w-32 bg-white/[0.06] rounded"></div>
          <div className="h-6 w-64 bg-white/[0.06] rounded-md"></div>
          <div className="h-4 w-96 bg-white/[0.04] rounded"></div>
        </div>
        <div className="h-9 w-36 bg-[#0C1017] border border-white/[0.08] rounded-lg"></div>
      </div>

      {/* Philosophy banner skeleton */}
      <div className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-4 h-16"></div>

      {/* Platform Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/[0.06]"></div>
                <div className="space-y-1">
                  <div className="h-4 w-28 bg-white/[0.06] rounded"></div>
                  <div className="h-3 w-16 bg-white/[0.04] rounded"></div>
                </div>
              </div>
              <div className="h-5 w-20 bg-white/[0.06] rounded-full"></div>
            </div>
            <div className="h-24 bg-white/[0.03] rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
