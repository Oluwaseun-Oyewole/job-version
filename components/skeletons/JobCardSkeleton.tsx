export const JobCardSkeleton = () => {
  return (
    <div className="grid grid-flow-row gap-4 pb-7">
      <div className="grid grid-cols-[100%] gap-4 lg:gap-3 lg:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex justify-between flex-col">
            <div className="mb-5 min-h-[200px] bg-white rounded-lg shadow-md cursor-pointer xl:flex flex-col gap-4 px-5 py-5 font-[400] justify-between animate-pulse">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>

                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                  </div>

                  <div className="h-3 bg-gray-300 rounded w-24"></div>
                </div>

                <div className="flex items-center gap-2 justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-300 rounded w-4/6"></div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm mt-4">
                <div className="flex gap-2 items-center">
                  <div className="h-3 bg-gray-300 rounded w-20"></div>
                </div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
