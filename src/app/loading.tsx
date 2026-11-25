export default function DashboardLoading() {
  return (
    <div className="space-y-8 sm:space-y-10 animate-pulse">
      {/* Goal Hero Skeleton */}
      <div className="bg-white border border-[#E2E8E3] rounded-2xl p-7 sm:p-9 shadow-subtle space-y-5">
        <div className="flex items-center justify-between">
          <div className="h-5 w-48 bg-[#EBEFEA] rounded"></div>
          <div className="h-5 w-28 bg-[#EBEFEA] rounded-full"></div>
        </div>
        <div className="h-6 w-80 bg-[#EBEFEA] rounded"></div>
        <div className="h-28 bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl p-6 mt-4"></div>
      </div>

      {/* Plan Card Skeleton */}
      <div className="bg-white border border-[#E2E8E3] rounded-2xl p-7 sm:p-9 shadow-subtle space-y-6">
        <div className="h-6 w-56 bg-[#EBEFEA] rounded"></div>
        <div className="h-16 bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl"></div>
        <div className="space-y-3">
          <div className="h-24 bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl"></div>
          <div className="h-24 bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl"></div>
        </div>
      </div>

      {/* Evidence Skeleton */}
      <div className="bg-white border border-[#E2E8E3] rounded-2xl p-7 sm:p-9 shadow-subtle space-y-6">
        <div className="h-5 w-44 bg-[#EBEFEA] rounded"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl"></div>
          ))}
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="h-5 w-40 bg-[#EBEFEA] rounded"></div>
          <div className="space-y-3">
            <div className="h-20 bg-white border border-[#E2E8E3] rounded-xl shadow-subtle"></div>
            <div className="h-20 bg-white border border-[#E2E8E3] rounded-xl shadow-subtle"></div>
            <div className="h-20 bg-white border border-[#E2E8E3] rounded-xl shadow-subtle"></div>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <div className="h-64 bg-white border border-[#E2E8E3] rounded-2xl p-6 shadow-subtle"></div>
          <div className="h-44 bg-white border border-[#E2E8E3] rounded-2xl p-6 shadow-subtle"></div>
        </div>
      </div>
    </div>
  );
}
