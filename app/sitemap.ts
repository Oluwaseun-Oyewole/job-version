import { siteConfig } from "@/utils/config";
import { MetadataRoute } from "next";
import { getJobs } from "./actions/action";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = ["", "notifications"].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const data = await getJobs();
  const jobEntries: MetadataRoute.Sitemap = data?.map(() => {
    return {
      url: `${siteConfig.siteUrl}`,
    };
  });
  const jobDetailEntries: MetadataRoute.Sitemap = data.map((job) => {
    return {
      url: `${siteConfig.siteUrl}/${job.slug}`,
      lastModified: job.created_at,
    };
  });

  return [...routesMap, ...jobEntries, ...jobDetailEntries];
}
