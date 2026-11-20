export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Goal Hero Skeleton */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 bg-slate-800 rounded-md"></div>
          <div className="h-6 w-24 bg-slate-800 rounded-full"></div>
        </div>
        <div className="h-4 w-72 bg-slate-800/60 rounded"></div>
        <div className="h-3 w-full bg-slate-800 rounded-full mt-4"></div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
          <div className="h-10 bg-slate-800/50 rounded-lg"></div>
          <div className="h-10 bg-slate-800/50 rounded-lg"></div>
          <div className="h-10 bg-slate-800/50 rounded-lg"></div>
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* AI Plan Card Skeleton */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="h-6 w-56 bg-slate-800 rounded-md"></div>
            <div className="h-4 w-full bg-slate-800/50 rounded"></div>
            <div className="h-24 bg-slate-800/30 rounded-lg"></div>
          </div>
          {/* Evidence Card Skeleton */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="h-5 w-40 bg-slate-800 rounded-md"></div>
            <div className="space-y-2">
              <div className="h-12 bg-slate-800/40 rounded-lg"></div>
              <div className="h-12 bg-slate-800/40 rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Activity Feed Skeleton */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="h-5 w-32 bg-slate-800 rounded-md"></div>
            <div className="space-y-3 pt-2">
              <div className="h-14 bg-slate-800/40 rounded-lg"></div>
              <div className="h-14 bg-slate-800/40 rounded-lg"></div>
              <div className="h-14 bg-slate-800/40 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
