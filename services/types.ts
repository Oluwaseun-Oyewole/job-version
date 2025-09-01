import { Experience, JobMode, Job_type } from "@/utils/types";

export type JobParams = {
  page: number;
  limit: number;
  searchQuery?: string | undefined;
  job_mode?: string | undefined;
  job_type: string | undefined;
  experience_level: string | undefined;
  min_salary?: number;
  max_salary?: number;
  sort_by?: string;
};

export type JobType = {
  id: string;
  job_title: string;
  company_name: string;
  company_info: string;
  created_at: Date;
  salary: number;
  job_description: string;
  skills: string;
  benefits?: string;
  location?: string;
  experience_level?: Experience;
  job_mode?: JobMode;
  job_type?: Job_type;
  mode_of_submission?: string;
  user_id?: string;
  no_of_hires?: string;
  slug: string;
};

export type JobDTO = { email?: string } & JobType;

export type JobResponse = {
  jobs: JobType[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
};
