/* eslint-disable @typescript-eslint/no-explicit-any */
import { JOB_MODE, JOB_TYPE } from "@/app/generated/prisma";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = await new URL(req.url);
  let limit = Number(searchParams.get("limit"));
  let page = Number(searchParams.get("page"));
  const job_mode = searchParams.get("job_mode") as JOB_MODE;
  const job_type = searchParams.get("job_type[]");
  const location = searchParams.get("location");
  const experience_level = searchParams.get("experience_level");
  const searchQuery = searchParams.get("searchQuery")?.toString();
  const min_salary = Number(searchParams.get("min_salary"));
  const max_salary = Number(searchParams.get("max_salary"));
  const sort_by = searchParams.get("sort_by");

  await auth();

  if (!limit || limit === 0) limit += 4;
  if (page <= 0) page += 1;
  try {
    const where: any = {};
    if (job_mode && Object.values(JOB_MODE)?.includes(job_mode))
      where.job_mode = job_mode;

    if (experience_level) {
      where.experience_level = experience_level;
    }

    // Job type filter (multiple selection)
    if (job_type) {
      const jobTypes = job_type.split(",");
      where.job_type = {
        in: jobTypes.filter((type) =>
          Object.values(JOB_TYPE).includes(type as JOB_TYPE)
        ),
      };
    }

    if (location) {
      where.location = {
        contains: location,
        mode: "insensitive" as const,
      };
    }

    if (searchQuery) {
      where.OR = [
        {
          job_title: {
            contains: searchQuery,
            mode: "insensitive" as const,
          },
        },
        {
          company_name: {
            contains: searchQuery,
            mode: "insensitive" as const,
          },
        },

        {
          location: {
            contains: searchQuery,
            mode: "insensitive" as const,
          },
        },
      ];
    }

    if (min_salary && max_salary) {
      where.salary = {
        gte: min_salary,
        lte: max_salary,
      };
    } else if (min_salary) {
      where.salary = {
        gte: min_salary,
      };
    } else if (max_salary) {
      where.salary = {
        lte: max_salary,
      };
    }

    let orderBy: any = {};
    switch (sort_by) {
      case "most-recent":
        orderBy = { created_at: "desc" };
        break;
      case "a-z":
        orderBy = { job_title: "asc" };
        break;
      case "top-salary":
        orderBy = { salary: "desc" };
        break;
      default:
        orderBy = { created_at: "desc" };
    }

    // for parallel queries
    const [jobs, total] = await Promise.all([
      prisma.jobs.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy,
      }),
      prisma.jobs.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit) ?? 1;
    return NextResponse.json(
      {
        message: "success",
        data: {
          jobs,
          totalPages,
          total,
          page,
          limit,
          status: 200,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error - ", error);
    return NextResponse.json(
      { message: "Oops something went wrong" },
      { status: 501 }
    );
  }
};

// export const GET = withCors(handler);
// export const OPTIONS = withCors(
//   async () => new NextResponse(null, { status: 200 })
// );
