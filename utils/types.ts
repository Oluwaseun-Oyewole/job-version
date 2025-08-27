import { JobType } from "@/services/types";

enum EnumJobType {
  fulltime = "fulltime",
  parttime = "parttime",
  contract = "contract",
  internship = "internship",
  volunteer = "volunteer",
}

export type Job = {
  id: number;
  label: string;
  value: EnumJobType;
  checked: boolean;
};

export enum Experience {
  JUNIOR,
  MID_LEVEL,
  SENIOR,
}

export enum JobMode {
  FULL_TIME,
  PART_TIME,
  CONTRACT,
}

export enum Job_type {
  Contract,
  FullTime,
  PartTime,
}

export interface Jobs {
  id: string;
  title: string;
  company: string;
  location: string;
  job_mode: string;
  description: string;
}

export interface JobParams {
  page: number;
  limit: number;
  searchQuery?: string;
  job_mode?: string;
  sort_by?: string;
  min_salary?: number;
  max_salary?: number;
  job_type: string[];
  experience_level: string | undefined;
}

export interface JobsData {
  jobs: JobType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JobsFilterProps {
  params: JobParams;
  setParams: React.Dispatch<React.SetStateAction<JobParams>>;
  refetch: () => void;
}

export interface JobsProps {
  data?: JobsData;
  isLoading: boolean;
  isSuccess?: boolean;
  params: JobParams;
  setParams: React.Dispatch<React.SetStateAction<JobParams>>;
  refetch?: () => void;
}

export interface JobDetailsProps {
  selectedJob?: Job;
  isLoading: boolean;
  isSuccess: boolean;
}
