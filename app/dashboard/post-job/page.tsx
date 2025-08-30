import CreateJobForm from "@/components/skeletons/CreateJob";
import { isServerTokenValid } from "@/utils/helper";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";

export default async function CreateJobPage() {
  if (!(await isServerTokenValid())) return redirect(routes.login);
  return <CreateJobForm />;
}
