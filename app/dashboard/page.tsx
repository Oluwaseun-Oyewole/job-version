import { auth } from "@/auth";
import JobsTable from "@/components/JobsTable";
import prisma from "@/lib/prisma";

export default async function postJob() {
  const session = await auth();
  const jobs = await prisma.jobs.findMany({
    orderBy: { created_at: "desc" },
    where: { user: { email: session?.user?.email } },
  });
  return <JobsTable jobs={jobs} />;
}
