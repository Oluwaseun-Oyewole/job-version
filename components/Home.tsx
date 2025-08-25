"use client";
import JobDetails from "./JobDescription";
import Jobs from "./Jobs";
import { JobsFilter } from "./JobsFilter";
import { Navigation } from "./Navigation";

const AllJobs = () => {
  return (
    <div className="h-screen flex flex-col gap-7">
      <Navigation />
      <div className="flex items-center justify-center px-4 lg:px-12">
        <div className="w-[95%] grid grid-items-center lg:justify-center xl:grid-flow-col md:grid-cols-[35%_65%] xl:grid-cols-[25%_55%_25%] gap-4">
          <JobsFilter />
          <Jobs />
          <JobDetails />
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
