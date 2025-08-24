"use client";
import JobDetails from "./JobDescription";
import Jobs from "./Jobs";
import { JobsFilter } from "./JobsFilter";
import { Navigation } from "./Navigation";

const AllJobs = () => {
  return (
    <div className="bg-gray-100">
      <Navigation />
      <div className="flex items-center justify-center py-8">
        <div className="w-[95%] grid grid-items-center lg:justify-center xl:grid-flow-col md:grid-cols-[35%_65%] xl:grid-cols-[20%_55%_25%]">
          <JobsFilter />
          <Jobs />
          <JobDetails />
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
