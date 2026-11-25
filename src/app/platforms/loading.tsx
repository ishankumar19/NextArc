export default function PlatformsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2E8E3]">
        <div className="space-y-2">
          <div className="h-3 w-32 bg-[#EBEFEA] rounded"></div>
          <div className="h-6 w-64 bg-[#EBEFEA] rounded-md"></div>
          <div className="h-4 w-96 bg-[#EBEFEA] rounded"></div>
        </div>
        <div className="h-10 w-36 bg-white border border-[#E2E8E3] rounded-lg shadow-subtle"></div>
      </div>

      {/* Philosophy banner skeleton */}
      <div className="bg-white border border-[#E2E8E3] rounded-xl p-5 h-16 shadow-subtle"></div>

      {/* Platform Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white border border-[#E2E8E3] rounded-2xl p-6 shadow-subtle space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EBEFEA]"></div>
                <div className="space-y-1">
                  <div className="h-4 w-28 bg-[#EBEFEA] rounded"></div>
                  <div className="h-3 w-16 bg-[#EBEFEA] rounded"></div>
                </div>
              </div>
              <div className="h-5 w-20 bg-[#EBEFEA] rounded-full"></div>
            </div>
            <div className="h-24 bg-[#F8FAF7] border border-[#E2E8E3] rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
