export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Goal Hero Skeleton */}
      <div className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-44 bg-white/[0.06] rounded"></div>
          <div className="h-5 w-24 bg-white/[0.06] rounded-full"></div>
        </div>
        <div className="h-4 w-72 bg-white/[0.04] rounded"></div>
        <div className="h-2 w-full bg-white/[0.04] rounded-full mt-4"></div>
        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/[0.06]">
          <div className="h-10 bg-white/[0.03] rounded-lg"></div>
          <div className="h-10 bg-white/[0.03] rounded-lg"></div>
          <div className="h-10 bg-white/[0.03] rounded-lg"></div>
          <div className="h-10 bg-white/[0.03] rounded-lg"></div>
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-6 space-y-4">
            <div className="h-5 w-52 bg-white/[0.06] rounded"></div>
            <div className="h-4 w-full bg-white/[0.04] rounded"></div>
            <div className="h-24 bg-white/[0.03] rounded-lg"></div>
          </div>
          <div className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-6 space-y-3">
            <div className="h-4 w-36 bg-white/[0.06] rounded"></div>
            <div className="space-y-2">
              <div className="h-12 bg-white/[0.03] rounded-lg"></div>
              <div className="h-12 bg-white/[0.03] rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-6 space-y-3">
            <div className="h-4 w-32 bg-white/[0.06] rounded"></div>
            <div className="space-y-3 pt-2">
              <div className="h-14 bg-white/[0.03] rounded-lg"></div>
              <div className="h-14 bg-white/[0.03] rounded-lg"></div>
              <div className="h-14 bg-white/[0.03] rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
