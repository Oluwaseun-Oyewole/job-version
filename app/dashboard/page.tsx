import JobsTable from "@/components/JobsTable";
import { isServerTokenValid } from "@/utils/helper";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";
import { getJobs } from "../actions/action";

export default async function postJob() {
  const jobs = await getJobs();
  if (!(await isServerTokenValid())) return redirect(routes.login);
  return <JobsTable jobs={jobs} />;
}
