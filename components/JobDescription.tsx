import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobberStore } from "@/store";
import { useLikedJobsStore } from "@/store/likedJobsStore";
import { Toastify, truncate } from "@/utils/helper";
import { Pin, PinOff } from "lucide-react";
import Link from "next/link";

const JobDetails = () => {
  const { data, isLoading } = useJobberStore();
  const firstJob = data[0];
  const { isJobLiked, removeLikedJob, addLikedJob } = useLikedJobsStore();

  const handleLikeToggle = () => {
    if (isJobLiked(firstJob?.id)) {
      removeLikedJob(firstJob?.id);
      Toastify.success("Job removed from saved list");
    } else {
      addLikedJob({ ...firstJob });
      Toastify.success("Job saved");
    }
  };

  return (
    <div className="hidden lg:block bg-white rounded-lg h-[84vh] overflow-scroll shadow-md p-5 font-[400]">
      {isLoading ? (
        <div className="flex flex-col justify-between  h-[80vh] items-center">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {data?.length <= 0 ? (
            <div className="h-[70vh] flex items-center justify-center">
              <div>
                <p>No job available</p>
              </div>
            </div>
          ) : (
            <>
              <div className="py-6 flex gap-2 flex-col border__bottom">
                <h1 className="font-bolder text-xl">{data[0]?.job_title}</h1>
                <div className="flex gap-3 text-sm font-[300] text-gray-500">
                  <p>{firstJob?.location}</p>
                </div>

                <div className="flex items-center justify-between">
                  {firstJob?.no_of_hires && (
                    <p className="bg-[rgba(83,116,231,0.1)] text-[#5374E7] rounded-md py-3 w-[40%] flex items-center justify-center font-[300] text-sm">
                      {firstJob?.no_of_hires} to be hired
                    </p>
                  )}

                  {isJobLiked(firstJob?.id) ? (
                    <Button
                      onClick={handleLikeToggle}
                      className="!bg-transparent text-black"
                    >
                      <PinOff size={18} />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleLikeToggle}
                      className="!bg-transparent text-black"
                    >
                      <Pin size={18} />
                    </Button>
                  )}
                </div>
              </div>
              <div className="py-6 border__bottom font-[300] flex flex-col gap-5 w-[90%]">
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <h1 className="font-bold text-sm">Job Type</h1>
                    <p className="text-sm pt-1">{firstJob?.job_type ?? "--"}</p>
                  </div>
                  <div>
                    <h1 className="font-bold">Experience</h1>
                    <p className="text-sm pt-1">
                      {firstJob?.experience_level ?? "--"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="font-bold">Position</h1>
                    <p className="text-sm pt-1">{firstJob?.job_mode ?? "--"}</p>
                  </div>
                  <div>
                    <h1 className="font-bold">Location</h1>
                    <p className="text-sm pt-1">{firstJob?.location ?? "--"}</p>
                  </div>
                </div>
              </div>
              <div className="py-6 border__bottom font-[300] text-sm">
                <h2 className="font-bold text-xl">Job Description</h2>
                <p className="text-sm pt-4 leading-5 text-gray-600">
                  {truncate(firstJob?.job_description, 200)}
                </p>
              </div>
              <div className="py-6 border__bottom font-[300] text-sm">
                <h2 className="font-bold text-xl">Base Salary</h2>
                <p className="pt-3 leading-5 text-gray-600">
                  &#36;{firstJob.salary}K/annum
                </p>

                <Link href={`/job-description/${firstJob?.slug}`}>
                  <Button className="bg-lightBlue hover:bg-deepBlue w-full mt-4 h-[50px] transition-all ease-in-out duration-500">
                    Read More
                  </Button>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default JobDetails;
