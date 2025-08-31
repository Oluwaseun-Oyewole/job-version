export const routes = {
  home: "/",
  login: "/login",
  notification: "/notifications",
  dashboard: "/dashboard",
  postJob: "/dashboard/create-job",
  description: (slug: string) => `/job-description/${slug}`,
};
