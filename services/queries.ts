import { useApiQuery } from "@/hooks/useApi";
import { Endpoints } from "./endpoints";
import { JobParams, JobResponse } from "./types";

export const useGetJobs = (params: JobParams) => {
  return useApiQuery<JobResponse>(
    ["get-jobs", params],
    Endpoints.jobs,
    {},
    params
  );
};
