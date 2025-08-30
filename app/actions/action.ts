/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { EXPERIENCE_LEVELS, JOB_MODES, JOB_TYPES } from "@/utils/constants";
import { routes } from "@/utils/routes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getJobs() {
  try {
    return await prisma.jobs.findMany({
      orderBy: { created_at: "desc" },
    });
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
}

export async function createJob(prevState: any, formData: FormData) {
  "use server";

  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const jobTitle = formData.get("job_title") as string;
  const companyName = formData.get("company_name") as string;
  const companyInfo = formData.get("company_info") as string;
  const salary = formData.get("salary") as string;
  const jobDescription = formData.get("job_description") as string;
  const slug = formData.get("slug") as string;
  const skills = formData.get("skills") as string;
  const benefits = formData.get("benefits") as string;
  const location = formData.get("location") as string;
  const experienceLevel = formData.get("experience_level") as string;
  const jobType = formData.get("job_type") as string;
  const jobMode = formData.get("job_mode") as string;
  const modeOfSubmission = formData.get("mode_of_submission") as string;
  const noOfHires = formData.get("no_of_hires") as string;

  if (!jobTitle || !companyName || !jobDescription || !slug) {
    throw new Error("Required fields are missing");
  }

  if (!jobTitle?.trim()) {
    return { error: "Job title is required" };
  }
  if (!companyName?.trim()) {
    return { error: "Company name is required" };
  }
  if (!jobDescription?.trim()) {
    return { error: "Job description is required" };
  }
  if (!slug?.trim()) {
    return { error: "Job slug is required" };
  }

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(slug)) {
    return {
      error: "Slug must contain only lowercase letters, numbers, and hyphens",
    };
  }

  const existingJob = await prisma.jobs.findUnique({
    where: { slug },
  });
  if (existingJob) {
    return { error: "A job with this slug already exists" };
  }

  try {
    const newJob = await prisma.jobs.create({
      data: {
        job_title: jobTitle,
        company_name: companyName,
        company_info: companyInfo,
        salary: salary ? parseInt(salary) : null,
        job_description: jobDescription,
        slug: slug,
        skills: skills,
        benefits: benefits || null,
        location: location || null,
        experience_level:
          experienceLevel && EXPERIENCE_LEVELS.includes(experienceLevel as any)
            ? (experienceLevel as any)
            : null,
        job_type:
          jobType && JOB_TYPES.includes(jobType as any)
            ? (jobType as any)
            : null,
        job_mode:
          jobMode && JOB_MODES.includes(jobMode as any)
            ? (jobMode as any)
            : null,
        mode_of_submission: modeOfSubmission || null,
        no_of_hires: noOfHires ? parseInt(noOfHires) : null,
        user_id: session.user.id,
      },
    });

    revalidatePath(routes.home);
    redirect(routes.description(newJob.slug));
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    return { error: "Failed to create job. Please try again." };
  }
}
