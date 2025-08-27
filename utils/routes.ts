export const routes = {
  home: "/",
  login: "/login",
  notification: "/notifications",
  dashboard: "/dashboard",
  postJob: "/dashboard/post-job",
  description: (slug: string) => `/job-description/${slug}`,
};
