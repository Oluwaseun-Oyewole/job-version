import JobIcon from "@/assets/briefcase.svg";
import DashboardIcon from "@/assets/dash.svg";
import { routes } from "./routes";
import { IRoutesType } from "./types";

export const jobType = [
  { id: 1, label: "FullTime", value: "fulltime" },
  { id: 2, label: "PartTime", value: "parttime" },
  { id: 3, label: "Internship", value: "internship" },
  { id: 4, label: "Volunteer", value: "volunteer" },
  { id: 5, label: "Contract", value: "contract" },
];

export const experience = [
  { id: 2, label: "Junior", value: "Junior" },
  { id: 3, label: "Intermediate", value: "Intermediate" },
  { id: 4, label: "Senior", value: "Senior" },
  { id: 5, label: "Lead", value: "Lead" },
  { id: 6, label: "Principal", value: "Principal" },
];

export const position = [
  { id: 1, label: "Onsite", value: "Onsite" },
  { id: 2, label: "Hybrid", value: "Hybrid" },
  { id: 3, label: "Remote", value: "Remote" },
];

export const sortBy = [
  { id: 1, value: "most-recent", label: "Most Recent" },
  { id: 2, value: "a-z", label: "A-Z" },
  { id: 3, value: "top-salary", label: "Top Salary" },
  // { id: 4, value: "trending", label: "Trending" },
];

export const COOKIES_KEYS = {
  TOKEN: "token",
};

export const SEARCHPARAMS_QUERIES = {
  search: "searchQuery",
  job_mode: "job_mode",
  page: "page",
  limit: "limit",
  sort_by: "sort_by",
  min_salary: "min_salary",
  max_salary: "max_salary",
  job_type: "job_type",
  experience_level: "experience_level",
};
export const EXPERIENCE_LEVELS = [
  "Junior",
  "Intermediate",
  "Senior",
  "Lead",
  "Principal",
] as const;

export const JOB_TYPES = [
  "FullTime",
  "PartTime",
  "Contract",
  "Volunteer",
  "Internship",
] as const;

export const JOB_MODES = ["Remote", "Hybrid", "Onsite"] as const;

export const dashboardRoutes: IRoutesType[] = [
  {
    id: 0,
    path: routes.dashboard,
    icon: DashboardIcon,
    title: "Dashboard",
  },

  {
    id: 1,
    icon: JobIcon,
    path: routes.postJob,
    title: "Create Job",
  },
];
