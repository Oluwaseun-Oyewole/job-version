import GoBack from "@/components/Back";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import Saved from "../../../../assets/fav.svg";

//TODO remove any
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}

export interface SavedJobInterface {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
}

export async function generateMetadata({ params }: PageProps) {
  const job = await prisma.jobs.findUnique({
    where: { slug: params.slug },
  });

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: `${job.job_title} at ${job.company_name}`,
    description: job.job_description.substring(0, 160),
  };
}

const JobDetails = async ({ params }: PageProps) => {
  const job = await prisma.jobs.findUnique({
    where: { slug: params.slug },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className=" bg-white max-w-3xl mx-auto my-5 p-10 rounded-md">
      <GoBack />{" "}
      <div className="flex justify-between">
        <div className="flex gap-4 sticky top-0 left-0">
          <h1 className="font-extrabold text-2xl">{job?.job_title}</h1>
          {job?.company_logo && (
            <Image
              src={job?.company_logo}
              alt="netflix"
              className="w-8"
              height={50}
              width={50}
            />
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Image
              src={Saved}
              alt="netflix"
              className="cursor-pointer"
              // onClick={() =>
              //   savedJobToLocalStorage({
              //     id: data?.data?.id,
              //     jobTitle: data?.data?.jobTitle,
              //     companyName: data?.data?.companyName,
              //     location: data?.data?.location,
              //   })
              // }
            />
          </div>
        </div>
      </div>
      <div className="font-[400] flex flex-col ">
        <div className="flex gap-2 flex-col border__bottom">
          <div className="text-sm font-[300] text-gray-500 pt-3">
            <p>{job?.company_name}</p>
          </div>

          <p className="bg-[rgba(83,116,231,0.1)] text-[#5374E7] rounded-sm py-3 w-[40%] lg:w-[18%] flex items-center justify-center font-[300] text-sm my-3">
            {job?.no_of_hires} to be hired
          </p>
        </div>
        <div>
          <h2 className="font-extrabold pt-6 text-lg">Company Details</h2>
          <p className="text-sm pt-1">{job?.company_info}</p>
        </div>
        <div className="pt-4 pb-6 border__bottom font-[300] flex flex-col gap-5">
          <div className="w-[90%] flex justify-between items-center">
            <div>
              <h1 className="font-bold text-base">Job Type</h1>
              <p className="text-sm pt-1">{job?.job_type}</p>
            </div>

            <div>
              <h1 className="font-bold text-base">Position</h1>
              <p className="text-sm pt-1">{job?.job_mode}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 pb-6 border__bottom font-[300] flex flex-col gap-5">
          <div className="w-[90%] flex justify-between items-center">
            <div>
              <h1 className="font-bold text-base">Location</h1>
              <p className="text-sm pt-1">{job?.location}</p>
            </div>

            <div>
              <h1 className="font-bold text-base">Salary</h1>
              <p className="text-sm pt-1">{job?.salary?.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="py-6 border__bottom font-[400] text-base">
          <div className="py-2">
            <h2 className="font-bold text-xl">Full job description</h2>
            <p className="pt-4 font-[300] text-sm leading-6">
              {job?.job_description}
            </p>
          </div>
        </div>
        <div className="py-6 border__bottom font-[400] text-base">
          <div className="py-2">
            <h2 className="font-bold text-xl"> Required Skills</h2>
            <p className="pt-4 font-[300] text-sm leading-6">{job?.skills}</p>
          </div>

          <div className="py-2">
            <h3>Application mode</h3>
            <p className="font-[300] text-sm leading-6">
              {job?.mode_of_submission}
            </p>
          </div>

          <div className="py-2">
            <h3> Benefit Highlights:</h3>
            <p className="font-[300] text-sm leading-6">{job?.benefits}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
