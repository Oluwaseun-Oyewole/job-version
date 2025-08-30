import { auth } from "@/auth";
import JobsTable from "@/components/JobsTable";
import prisma from "@/lib/prisma";
import { isServerTokenValid } from "@/utils/helper";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";

export default async function postJob() {
  const session = await auth();
  const jobs = await prisma.jobs.findMany({
    orderBy: { created_at: "desc" },
    where: { user: { email: session?.user?.email } },
  });
  if (!(await isServerTokenValid())) return redirect(routes.login);
  return <JobsTable jobs={jobs} />;
}
