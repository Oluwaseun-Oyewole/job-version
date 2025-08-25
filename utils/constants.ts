export const jobType = [
  { id: 1, label: "FullTime", value: "fulltime", checked: false },
  { id: 2, label: "PartTime", value: "parttime", checked: false },
  { id: 3, label: "Internship", value: "internship", checked: false },
  { id: 4, label: "Volunteer", value: "volunteer", checked: false },
  { id: 5, label: "Contract", value: "contract", checked: false },
];

export const experience = [
  { id: 2, label: "Junior", value: "Junior", checked: false },
  { id: 3, label: "Intermediate", value: "Intermediate", checked: false },
  { id: 4, label: "Senior", value: "Senior", checked: false },
  { id: 5, label: "Tech Lead", value: "Tech Lead", checked: false },
];

export const position = [
  { id: 1, label: "Onsite", value: "Onsite", checked: false },
  { id: 2, label: "Hybrid", value: "Hybrid", checked: false },
  { id: 3, label: "Remote", value: "Remote", checked: false },
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
};
