"use client";
import { useJobberStore } from "@/store";
import { JobsProps } from "@/types";
import { useEffect } from "react";
import Job from "./Job";
import PaginationWrapper from "./Pagination";
import { JobSearch } from "./Search";

const Jobs = ({
  isLoading,
  isSuccess,
  data,
  params,
  setParams,
  refetch,
}: JobsProps) => {
  const { updateData, setIsLoading } = useJobberStore();

  // useEffect(() => {
  //   if (isNaN(page)) removeParam(SEARCHPARAMS_QUERIES.page);
  //   if (limit === 0 || isNaN(limit)) removeParam(SEARCHPARAMS_QUERIES.limit);
  //   if (job_mode === "null" || !job_mode)
  //     removeParam(SEARCHPARAMS_QUERIES.job_mode);
  //   if (searchQuery === null) removeParam(SEARCHPARAMS_QUERIES.search);
  // }, []);

  useEffect(() => {
    if (isSuccess) {
      updateData(data?.jobs ?? []);
      setIsLoading(isLoading);
    }
  }, [isSuccess, isLoading, data?.jobs]);

  const onNext = () => {
    return setParams((prev) => ({ ...prev, page: params?.page + 1 }));
  };
  const onPrev = () => {
    return setParams((prev) => ({ ...prev, page: params?.page - 1 }));
  };

  return (
    <div className="flex flex-col gap-3 overflow-y-scroll">
      <div className="bg-lightGray bg-transparent z-10">
        <JobSearch setParams={setParams} params={params} />
      </div>

      <div className="pt-6">
        <div className="flex items-center justify-end pb-3">
          {data?.jobs && data?.jobs?.length > 0 && (
            <PaginationWrapper
              total={data?.total ?? 0}
              resultsPerPage={data?.limit ?? 4}
              totalResults={data?.total ?? 0}
              page={data?.page ?? 1}
              totalPages={data?.totalPages ?? 0}
              onNext={onNext}
              onPrev={onPrev}
            />
          )}
        </div>

        <div className="overflow-y-scroll">
          <Job data={data?.jobs} isLoading={isLoading} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
