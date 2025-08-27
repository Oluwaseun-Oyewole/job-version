"use client";
import { useGetJobs } from "@/services/queries";
import { JobParams } from "@/services/types";
import { SEARCHPARAMS_QUERIES } from "@/utils/constants";
import { useUrlSearchParams } from "@/utils/hooks/useUrlQuery";
import { useState } from "react";
import JobDetails from "./JobDescription";
import Jobs from "./Jobs";
import { JobsFilter } from "./JobsFilter";

const AllJobs = () => {
  const { getParam } = useUrlSearchParams();
  const searchQuery = getParam(SEARCHPARAMS_QUERIES.search);
  const job_mode = getParam(SEARCHPARAMS_QUERIES.job_mode);
  const page = Number(getParam(SEARCHPARAMS_QUERIES.page));

  const limit = Number(getParam(SEARCHPARAMS_QUERIES.limit));
  const [params, setParams] = useState<JobParams>({
    page: page > 0 ? page : 1,
    limit: limit > 0 ? limit : 5,
    searchQuery: searchQuery ? searchQuery : undefined,
    job_mode: job_mode ? job_mode : undefined,
    experience_level:
      getParam(SEARCHPARAMS_QUERIES.experience_level) ?? undefined,
    job_type: getParam(SEARCHPARAMS_QUERIES.job_type)?.split(",") || [],
  });
  const { data, isLoading, refetch, isSuccess } = useGetJobs(params);

  return (
    <div className="flex items-center mt-7 justify-center px-4 lg:px-12">
      <div className="w-[95%] grid grid-items-center lg:justify-center xl:grid-flow-col md:grid-cols-[35%_65%] xl:grid-cols-[25%_55%_25%] gap-4">
        <JobsFilter
          params={params}
          setParams={setParams}
          isLoading={isLoading}
        />
        <Jobs
          isLoading={isLoading}
          isSuccess={isSuccess}
          params={params}
          setParams={setParams}
          refetch={refetch}
          data={data}
        />
        <JobDetails />
      </div>
    </div>
  );
};

export default AllJobs;
