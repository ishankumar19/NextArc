export default function ProgressLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2E8E3]">
        <div className="space-y-2">
          <div className="h-3 w-32 bg-[#EBEFEA] rounded"></div>
          <div className="h-6 w-64 bg-[#EBEFEA] rounded-md"></div>
          <div className="h-4 w-96 bg-[#EBEFEA] rounded"></div>
        </div>
        <div className="h-10 w-44 bg-white border border-[#E2E8E3] rounded-lg shadow-subtle"></div>
      </div>

      {/* KPI Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white border border-[#E2E8E3] rounded-xl p-5 shadow-subtle space-y-2"
          >
            <div className="h-3 w-24 bg-[#EBEFEA] rounded"></div>
            <div className="h-7 w-16 bg-[#EBEFEA] rounded-md"></div>
            <div className="h-3 w-28 bg-[#EBEFEA] rounded"></div>
          </div>
        ))}
      </div>

      {/* Activity Heatmap Skeleton */}
      <div className="bg-white border border-[#E2E8E3] rounded-2xl p-6 shadow-subtle space-y-4">
        <div className="h-4 w-48 bg-[#EBEFEA] rounded-md"></div>
        <div className="h-36 bg-[#F8FAF7] border border-[#E2E8E3] rounded-lg"></div>
      </div>

      {/* Rating Trajectory Skeleton */}
      <div className="bg-white border border-[#E2E8E3] rounded-2xl p-6 shadow-subtle space-y-4">
        <div className="h-4 w-56 bg-[#EBEFEA] rounded-md"></div>
        <div className="h-44 bg-[#F8FAF7] border border-[#E2E8E3] rounded-lg"></div>
      </div>
    </div>
  );
}
