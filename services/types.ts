import { Experience, Job_type, JobMode } from "@/types";

export type JobParams = {
  page: number;
  limit: number;
  searchQuery?: string | undefined;
  job_mode?: string | undefined;
};

export type JobType = {
  id: string;
  job_title: string;
  company_name: string;
  company_logo?: string;
  company_info?: string;
  created_at: Date;
  salary?: number;
  job_description: string;
  skills?: string;
  benefits?: string;
  location?: string;
  experience_level?: Experience;
  job_mode?: JobMode;
  job_type?: Job_type;
  mode_of_submission?: string;
  user_id: string;
  no_of_hires?: string;
  slug: string;
};

export type JobResponse = {
  jobs: JobType[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
};
