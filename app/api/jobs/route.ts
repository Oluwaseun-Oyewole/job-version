import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = await new URL(req.url);
  let limit = Number(searchParams.get("limit"));
  let page = Number(searchParams.get("page"));
  const location = searchParams.get("location");

  if (!limit || limit === 0) {
    limit += 4;
  }
  if (page <= 0) {
    page += 1;
  }

  try {
    const jobs = await prisma.jobs.findMany({
      where: { OR: [{ location }, { OR: [{}] }] },
      skip: (page - 1) * limit,
      take: limit,
    });
    const total = await prisma.jobs.count();
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
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("errors - ", error);
    return NextResponse.json(
      { message: "Oops something went wrong" },
      { status: 501 }
    );
  }
};
