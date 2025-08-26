import { JobType } from "@/services/types";
import { useLikedJobsStore } from "@/store/likedJobsStore";
import { dateFormat, formatCurrency, Toastify, truncate } from "@/utils/helper";
import { routes } from "@/utils/routes";
import { MapPin, Pin, PinOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JobCardSkeleton } from "./skeletons/JobCardSkeleton";
import { Button } from "./ui/button";

export interface SavedJobInterface {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
}

const Job = ({ data, isLoading }: { data?: JobType[]; isLoading: boolean }) => {
  const { isJobLiked, removeLikedJob, addLikedJob } = useLikedJobsStore();

  const handleLikeToggle = (job: JobType) => {
    if (isJobLiked(job?.id)) {
      removeLikedJob(job?.id);
      Toastify.success("Job removed from saved list");
    } else {
      addLikedJob({ ...job });
      Toastify.success("Job saved");
    }
  };

  if (isLoading) {
    return <JobCardSkeleton />;
  }

  if (data && data?.length <= 0) {
    return (
      <div>
        <div className="h-[250px] w-full bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col gap-2 justify-center items-center">
          <h1 className="text-lg ">No jobs available</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-row gap-4 pb-7">
      <div className="grid grid-cols-[100%] gap-4 lg:gap-3 lg:grid-cols-2 relative">
        {data?.map((job) => {
          return (
            <div key={job?.id}>
              <div className="flex justify-between flex-col">
                <div className="mb-5 min-h-[230px] bg-white rounded-lg shadow-md hover:shadow-lg xl:flex flex-col gap-4 px-5 py-5 font-[400] justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-1">
                      {job?.company_logo && (
                        <Image
                          src={job?.company_logo}
                          alt="job image"
                          width={50}
                          height={50}
                        />
                      )}

                      <h1 className="text-sm">{job?.job_title}</h1>
                      {`(${job?.company_name} ${
                        dateFormat(job?.created_at) !== "2 days ago" ? (
                          <small className="text-red-500 text-[10px] rounded-lg border-[0.5px] border-red-500 px-1">
                            New
                          </small>
                        ) : (
                          ""
                        )
                      })`}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <p className="">{job?.location}</p>
                      </div>
                      {isJobLiked(job?.id) ? (
                        <Button
                          onClick={() => handleLikeToggle(job)}
                          className="!bg-transparent text-black"
                        >
                          <PinOff size={18} />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleLikeToggle(job)}
                          className="!bg-transparent text-black"
                        >
                          <Pin size={18} />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm">
                      {truncate(job?.job_description, 80)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm ">
                      {formatCurrency(job?.salary ?? 0)}/month
                    </p>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <p className="">{dateFormat(job?.created_at)}</p>

                      <Link href={routes.description(job?.slug)}>
                        <p className="text-deepBlue">Job details</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Job;
