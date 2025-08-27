import prisma from "@/lib/prisma";
import { JobDTO } from "@/services/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: JobDTO = await req.json();

  const {
    salary,
    skills,
    location,
    email,
    job_title,
    job_mode,
    job_type,
    job_description,
    mode_of_submission,
    experience_level,
    no_of_hires,
    benefits,
    company_info,
    company_name,
  } = body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 501 });
    }
    // await prisma.jobs.create({
    //   data: {
    //     user_id: user.email,
    //     job_description,
    //     job_title,
    //     job_mode,
    //     job_type,
    //     mode_of_submission,
    //     experience_level,
    //     no_of_hires: Number(no_of_hires),
    //     benefits,
    //     company_info,
    //     company_name,
    //     salary,
    //     location,
    //     skills,
    //   },
    // });
    return NextResponse.json(
      { message: "New Job created", status: 200 },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 }
    );
  }
};
