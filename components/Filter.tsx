/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  experience,
  jobType,
  SEARCHPARAMS_QUERIES,
  sortBy,
} from "@/utils/constants";
import { useUrlSearchParams } from "@/utils/hooks/useUrlQuery";
import { JobParams, JobsProps } from "@/utils/types";
import classNames from "classnames";
import "rc-slider/assets/index.css";
import { useState } from "react";
import SliderComponent from "./Slider";

export const Filter = ({ setParams }: JobsProps) => {
  const { setParam, clearParams, getParam, setURLParams } =
    useUrlSearchParams();

  const styles = {
    border: "py-6 border-b-2 border-lightGray",
    flexCenterSpace: "flex items-center space-x-2",
    flexJustifyBetween: "flex justify-between",
  };

  const [values, setValues] = useState<JobParams>({
    page: Number(getParam(SEARCHPARAMS_QUERIES.page)) ?? 1,
    searchQuery: getParam(SEARCHPARAMS_QUERIES.search) ?? "",
    limit: 5,
    job_mode: getParam(SEARCHPARAMS_QUERIES.job_mode) ?? "",
    sort_by: getParam(SEARCHPARAMS_QUERIES.sort_by) ?? sortBy[0]?.value,
    min_salary:
      Number(getParam(SEARCHPARAMS_QUERIES.min_salary)) > 0
        ? Number(getParam(SEARCHPARAMS_QUERIES.min_salary))
        : 500,
    max_salary:
      Number(getParam(SEARCHPARAMS_QUERIES.max_salary)) > 0
        ? Number(getParam(SEARCHPARAMS_QUERIES.max_salary))
        : 1000000,
    // job_type: getParam(SEARCHPARAMS_QUERIES.job_type)?.split(",") || [],
    job_type: getParam(SEARCHPARAMS_QUERIES.job_type) ?? jobType[0]?.value,
    experience_level:
      getParam(SEARCHPARAMS_QUERIES.experience_level) ?? experience[0]?.value,
  });

  const clearFilters = () => {
    setParams({
      page: 1,
      limit: 4,
      sort_by: undefined,
      min_salary: undefined,
      max_salary: undefined,
      searchQuery: undefined,
      job_mode: undefined,
      job_type: undefined,
      experience_level: undefined,
    });
    clearParams();
    setValues({
      min_salary: 500,
      max_salary: 1000000,
      searchQuery: "",
      job_mode: "",
      sort_by: sortBy[0]?.value,
      job_type: jobType[0]?.value,
      experience_level: experience[0]?.value,
      limit: 5,
      page: 1,
    });
  };

  const onSort = (value: string) => {
    setParam(SEARCHPARAMS_QUERIES.sort_by, value);
    setValues((prev) => ({ ...prev, sort_by: value }));
    setParams((prev) => ({ ...prev, sort_by: value }));
  };

  const handleJobFilter = (value: string) => {
    setParam(SEARCHPARAMS_QUERIES.job_type, value);
    setValues((prev) => ({ ...prev, job_type: value }));
    setParams((prev) => ({ ...prev, job_type: value }));
  };

  const handleExperienceFilter = (value: string) => {
    setParam(SEARCHPARAMS_QUERIES.experience_level, value);
    setValues((prev) => ({ ...prev, experience_level: value }));
    setParams((prev) => ({ ...prev, experience_level: value }));
  };

  // useEffect(() => {
  //   if (values.job_type.length > 0) {
  //     setParam(SEARCHPARAMS_QUERIES.job_type, values.job_type.join(","));
  //   } else {
  //     setParam(SEARCHPARAMS_QUERIES.job_type, "");
  //   }
  // }, [values.job_type, setParam]);

  // const handleJobTypeChange = (value: string, isChecked: boolean) => {
  //   let newJobTypes;
  //   setValues((prev) => {
  //     newJobTypes = [...prev.job_type];
  //     if (isChecked) {
  //       newJobTypes.push(value);
  //     } else {
  //       newJobTypes = newJobTypes.filter((job) => job !== value);
  //     }
  //     return { ...prev, job_type: newJobTypes };
  //   });

  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   //@ts-ignore
  //   setParams((prev) => {
  //     let newJobTypes = [...(prev.job_type || [])];
  //     console.log("new job types", newJobTypes);
  //     if (isChecked) {
  //       newJobTypes.push(value);
  //     } else {
  //       newJobTypes = newJobTypes.filter((type) => type !== value);
  //     }
  //     return {
  //       ...prev,
  //       job_type: newJobTypes.length > 0 ? [...newJobTypes] : undefined,
  //     };
  //   });
  // };

  const salaryFilter = () => {
    setURLParams({
      min_salary: values?.min_salary,
      max_salary: values?.max_salary,
    });
    setParams((prev) => ({
      ...prev,
      min_salary: Number(values?.min_salary),
      max_salary: Number(values?.max_salary),
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg pb-8 px-5 md:h-[84vh] overflow-y-scroll">
      <div
        className={classNames(
          styles.flexJustifyBetween,
          "pb-6 border-b-2 border-gray-100 md:pt-8 left-0 bg-white"
        )}
      >
        <h2 className="font-bold text-lg">Filters</h2>
        <Button
          className="text-sm text-blue-500 !bg-transparent"
          onClick={clearFilters}
        >
          Reset All
        </Button>
      </div>
      <div className={styles.border}>
        <h2 className="font-bold pb-5">Sort By</h2>
        <div>
          <RadioGroup
            value={values?.sort_by}
            className="w-[92%] font-[300]"
            onValueChange={(e) => onSort(e)}
          >
            <div className="grid gap-3 grid-cols-[50%_50%] items-center">
              {sortBy?.map((sort, index) => {
                return (
                  <div
                    className={classNames(styles.flexCenterSpace)}
                    key={index}
                  >
                    <RadioGroupItem
                      value={`${sort.value}`}
                      id={`${sort.value}`}
                    />
                    <Label
                      htmlFor={`${sort.value}`}
                      className="hidden lg:block"
                    >
                      {sort.label}
                    </Label>

                    <Label htmlFor="most-recent" className="block lg:hidden">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="line-clamp-1">
                            {sort.label.substring(0, 5) + "..."}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{sort.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className={styles.border}>
        <div className="w-[90%]">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-bold">Salary Range</h2>
            <Button
              className="bg-transparent hover:bg-transparent text-deepBlue text-sm !m-0 !p-0"
              onClick={salaryFilter}
            >
              Apply
            </Button>
          </div>
          <SliderComponent values={values} setValues={setValues} />
        </div>
      </div>

      <div className={styles.border}>
        <h2 className="pb-4 font-bold">Experience</h2>
        <div className="w-[92%]">
          <div className="grid grid-flow-cols grid-cols-[50%_50%] gap-3">
            <RadioGroup
              value={values?.experience_level}
              className="w-[92%] font-[300]"
              onValueChange={(e) => handleExperienceFilter(e)}
            >
              <div className="grid gap-3 grid-cols-[50%_50%] items-center">
                {experience?.map((experience, index) => {
                  return (
                    <div
                      className={classNames(styles.flexCenterSpace)}
                      key={index}
                    >
                      <RadioGroupItem
                        value={`${experience.value}`}
                        id={`${experience.value}`}
                      />
                      <Label
                        htmlFor={`${experience.value}`}
                        className="hidden lg:block"
                      >
                        {experience.label}
                      </Label>

                      <Label htmlFor="most-recent" className="block lg:hidden">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="line-clamp-1">
                              {experience.label.substring(0, 5) + "..."}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{experience.label}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className={styles.border}>
        <h2 className="pb-4 font-bold">Job Type</h2>
        <div className="w-[92%]">
          <div className="grid grid-flow-cols grid-cols-[50%_50%] gap-3">
            <RadioGroup
              value={values?.job_type}
              className="w-[92%] font-[300]"
              onValueChange={(e) => handleJobFilter(e)}
            >
              <div className="grid gap-3 grid-cols-[50%_50%] items-center">
                {jobType?.map((job, index) => {
                  return (
                    <div
                      className={classNames(styles.flexCenterSpace)}
                      key={index}
                    >
                      <RadioGroupItem
                        value={`${job.value}`}
                        id={`${job.value}`}
                      />
                      <Label
                        htmlFor={`${job.value}`}
                        className="hidden lg:block"
                      >
                        {job.label}
                      </Label>

                      <Label htmlFor="most-recent" className="block lg:hidden">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="line-clamp-1">
                              {job.label.substring(0, 5) + "..."}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{job.label}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* <div className="pt-6">
        <h2 className="pb-4 font-bold">Job Type</h2>

        <div className="w-[92%]">
          <div className="grid grid-flow-cols grid-cols-[50%_50%] gap-3">
            {jobType?.map((job, index) => {
              return (
                <div
                  key={index}
                  className={classNames(styles.flexJustifyBetween)}
                >
                  <div
                    className={classNames(
                      styles.flexCenterSpace,
                      "space-x-0 gap-0"
                    )}
                  >
                    <Checkbox
                      name="job_type"
                      id={job.value}
                      value={job.value}
                      checked={values?.job_type?.includes(job?.value)}
                      onChangeHandler={handleJobTypeChange}
                    />
                    <Label htmlFor={job.value}>{job.label}</Label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </div>
  );
};
