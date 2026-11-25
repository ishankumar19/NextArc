export default function DashboardLoading() {
  return (
    <div className="space-y-10 sm:space-y-12 animate-pulse">
      {/* Goal Hero Skeleton */}
      <div className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-7 sm:p-9 space-y-5">
        <div className="flex items-center justify-between">
          <div className="h-5 w-48 bg-white/[0.06] rounded"></div>
          <div className="h-5 w-28 bg-white/[0.06] rounded-full"></div>
        </div>
        <div className="h-6 w-80 bg-white/[0.05] rounded"></div>
        <div className="h-32 bg-[#080A0F] border border-white/[0.08] rounded-xl p-6 mt-4"></div>
      </div>

      {/* Plan Card Skeleton */}
      <div className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-7 sm:p-9 space-y-6">
        <div className="h-6 w-56 bg-white/[0.06] rounded"></div>
        <div className="h-16 bg-[#080A0F] rounded-xl"></div>
        <div className="space-y-3">
          <div className="h-24 bg-[#080A0F] rounded-xl"></div>
          <div className="h-24 bg-[#080A0F] rounded-xl"></div>
        </div>
      </div>

      {/* Evidence Skeleton */}
      <div className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-7 sm:p-9 space-y-6">
        <div className="h-5 w-44 bg-white/[0.06] rounded"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-[#080A0F] border border-white/[0.06] rounded-xl"></div>
          ))}
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="h-5 w-40 bg-white/[0.06] rounded"></div>
          <div className="space-y-3">
            <div className="h-20 bg-[#0C1017] border border-white/[0.08] rounded-xl"></div>
            <div className="h-20 bg-[#0C1017] border border-white/[0.08] rounded-xl"></div>
            <div className="h-20 bg-[#0C1017] border border-white/[0.08] rounded-xl"></div>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 space-y-7">
          <div className="h-64 bg-[#0C1017] border border-white/[0.08] rounded-2xl p-6"></div>
          <div className="h-44 bg-[#0C1017] border border-white/[0.08] rounded-2xl p-6"></div>
        </div>
      </div>
    </div>
  );
}
