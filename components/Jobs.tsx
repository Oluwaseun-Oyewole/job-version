"use client";
import { useJobberStore } from "@/store";
import { SEARCHPARAMS_QUERIES } from "@/utils/constants";
import { useUrlSearchParams } from "@/utils/hooks/useUrlQuery";
import { JobsProps } from "@/utils/types";
import { useEffect } from "react";
import Job from "./Job";
import PaginationWrapper from "./Pagination";
import { JobSearch } from "./Search";

const Jobs = ({ isLoading, isSuccess, data, params, setParams }: JobsProps) => {
  const { setParam } = useUrlSearchParams();
  const { updateData, setIsLoading } = useJobberStore();
  useEffect(() => {
    if (isSuccess) {
      updateData(data?.jobs ?? []);
      setIsLoading(isLoading);
    }
  }, [isSuccess, isLoading, data?.jobs]);

  const onNext = () => {
    setParam(SEARCHPARAMS_QUERIES.page, params.page + 1);
    setParams((prev) => ({ ...prev, page: Number(params?.page) + 1 }));
  };
  const onPrev = () => {
    setParam(SEARCHPARAMS_QUERIES.page, params.page - 1);
    setParams((prev) => ({ ...prev, page: Number(params?.page) - 1 }));
  };

  return (
    <div className="flex flex-col gap-3 overflow-y-scroll h-[90vh]">
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
          {!data && !isLoading ? (
            <div className="h-[40vh] flex items-center justify-center bg-white shadow-lg">
              Oops, service currently unavailable, please try again
            </div>
          ) : (
            <Job data={data?.jobs} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
