export const routes = {
  home: "/",
  login: "/auth/login",
  notification: "/notifications",
  description: (slug: string) => `/job-description/${slug}`,
};
