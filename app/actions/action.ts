"use server";
import prisma from "@/lib/prisma";

export async function getJobs() {
  try {
    return await prisma.jobs.findMany({
      orderBy: { created_at: "desc" },
    });
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
}
