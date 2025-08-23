import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { JobType } from "@/services/types";
import { dateFormat, truncate } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Dollar from "../assets/dollar.svg";
import Saved from "../assets/fav.svg";

export interface SavedJobInterface {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
}

const Job = ({
  data,
  isLoading,
  refetch,
}: {
  data?: JobType[];
  isLoading: boolean;
  refetch?: () => void;
}) => {
  const skeleton = new Array(2).fill("_");
  //   const { country, isSearchTrigger } = useAppSelector(
  //     (state) => state.rootReducer.jobs
  //   );
  const searchParams = useSearchParams();
  const page = +searchParams.get("page")!;
  const resultsPerPage = +searchParams.get("resultsPerPage")!;
  const searchQuery = searchParams.get("query")!;

  if (isLoading) {
    return (
      <div className="flex flex-col justify-around items-center overflow-hidden  h-[50vh]  bg-white shadow-xl rounded-lg">
        {skeleton?.map((_, index) => {
          return (
            <div className="flex justify-around" key={index}>
              <div className="flex items-center space-x-4" key={index}>
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const checkIfJobInArray = (
    object: SavedJobInterface,
    array: SavedJobInterface[]
  ): boolean => {
    return array.some((item) => item.jobTitle === object.jobTitle);
  };

  //   const savedJobToLocalStorage = (object: SavedJobInterface) => {
  //     let currentList: SavedJobInterface[] = [];
  //     const storedList = localStorage.getItem("savedJobs");
  //     if (storedList) {
  //       currentList = JSON.parse(storedList);
  //     }
  //     const obj = checkIfJobInArray(object, currentList);
  //     if (obj || object.jobTitle === "") {
  //       Toastify.error("Job already saved");
  //       return;
  //     } else {
  //       currentList.push(object);
  //       if (typeof window !== "undefined") {
  //         localStorage.setItem("savedJobs", JSON.stringify(currentList));
  //         localStorage.setItem("notification", String(true));
  //       }
  //       dispatch(setNotification());
  //       Toastify.success("Job saved");
  //     }
  //   };

  if (data && data?.length <= 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <div className="h-[250px] w-full bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col gap-2 justify-center items-center">
          <h1 className="text-lg ">No jobs available</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-row gap-4 pb-7">
      <div className="grid grid-cols-[100%] gap-4 lg:gap-3 lg:grid-cols-2">
        {data?.map((job) => {
          return (
            <div key={job?.id}>
              <Link href={`/job-description/${job?.id}`} className="">
                <div
                  className="mb-5 min-h-[250px] bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer xl:flex flex-col justify-between px-5 py-5"
                  //   onClick={() => {
                  //     dispatch(stopSearch());
                  //     setJobId(job?.id);
                  //   }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {job?.company_logo && (
                        <Image
                          src={job?.company_logo}
                          alt="job image"
                          width={50}
                          height={50}
                        />
                      )}
                      <div>
                        <h1 className="text-base">{job?.job_title}</h1>
                        <div className="flex items-center gap-2">
                          <p className="font-[300] text-sm py-1">
                            {job?.company_name}
                          </p>
                          <div>
                            <small className="text-red-500 text-[10px] border-[0.5px] border-red-500 px-2 ">
                              New
                            </small>
                            {/* {days <= 1 && (
                              <small className="text-red-500 text-[10px] border-[0.5px] border-red-500 px-2 ">
                                New
                              </small>
                            )} */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      //   onClick={() =>
                      //     savedJobToLocalStorage({
                      //       id: job.id,
                      //       jobTitle: job.jobTitle,
                      //       companyName: job.companyName,
                      //       location: job.location,
                      //     })
                      //   }
                      className="!bg-transparent"
                    >
                      <Image src={Saved} alt="netflix" />
                    </Button>
                  </div>

                  <div>
                    <p className="font-[400] text-xs">{job?.location}</p>
                  </div>

                  <div className="flex justify-between items-center w-[90%] font-[400] text-xs mt-2">
                    <h3 className=" bg-lightGray rounded-sm py-2 px-4">
                      {job?.job_type}
                    </h3>
                  </div>

                  <div className="py-2">
                    <p className="text-sm font-[300]">
                      {truncate(job?.job_description, 70)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center font-[400] text-sm">
                    <div className="flex gap-2 items-center">
                      <Image src={Dollar} alt="netflix" />
                      <p className="text-[13px] font-[300]">
                        &#36;{job?.salary}K/month
                      </p>
                    </div>
                    {dateFormat(job?.created_at)}
                    <div>
                      {/* <div className="text-sm font-[300]">
                        {days > 0 ? (
                          <p>
                            {days} {days > 1 ? "days" : "day"} ago
                          </p>
                        ) : hours > 0 ? (
                          <p>
                            {hours} {hours > 1 ? "hrs" : "hr"} ago
                          </p>
                        ) : (
                          <p>
                            {minutes} {minutes > 1 ? "mins" : "mins"} ago
                          </p>
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Job;
