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
import { useUrlSearchParams } from "@/hooks/useUrlQuery";
import { JobsProps, ValuesInterface } from "@/types";
import {
  experience,
  jobType,
  SEARCHPARAMS_QUERIES,
  sortBy,
} from "@/utils/constants";
import classNames from "classnames";
import "rc-slider/assets/index.css";
import { ChangeEvent, useState } from "react";
import SliderComponent from "./Slider";

const CheckBoxInput = ({
  name,
  id,
  value,
  checked,
  job,
  onChange,
}: {
  name: string;
  id: string;
  value: string;
  checked: boolean;
  job: any;
  // onChange: (job: Job, e: ChangeEvent<HTMLInputElement>) => void;
  onChange: (job: any, e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="checkbox"
      name={name}
      id={id}
      value={value}
      checked={checked}
      onChange={(e) => onChange(job, e)}
      className="h-[15px] w-[17px] focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
    />
  );
};

export const Filter = ({ isLoading, data, params, setParams }: JobsProps) => {
  const [jobExperience, setJobExperience] = useState(experience);
  const { setParam, clearParams, getParam, setURLParams } =
    useUrlSearchParams();

  const styles = {
    border: "py-6 border-b-2 border-lightGray",
    flexCenterSpace: "flex items-center space-x-2",
    flexJustifyBetween: "flex justify-between",
  };

  const [values, setValues] = useState<ValuesInterface>({
    searchQuery: getParam(SEARCHPARAMS_QUERIES.search) ?? "",
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
    });
    clearParams();
    setValues({
      min_salary: 500,
      max_salary: 1000000,
      searchQuery: "",
      job_mode: "",
      sort_by: sortBy[0]?.value,
    });
  };

  const onSort = (value: string) => {
    setParam(SEARCHPARAMS_QUERIES.sort_by, value);
    setValues((prev) => ({ ...prev, sort_by: value }));
    setParams((prev) => ({ ...prev, sort_by: value }));
  };

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
                    <input
                      id={job.value}
                      type="checkbox"
                      value={job.value}
                      //   checked={isSelected(job.value)}
                      //   onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      //     handleJobTypeChange(e)
                      //   }
                      className="h-[15px] w-[17px] focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                    />
                    <Label htmlFor={job.value}>{job.label}</Label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="pt-6">
        <h2 className="pb-4 font-bold">Experience</h2>
        <div className="w-[92%]">
          <div className="grid grid-flow-cols grid-cols-[50%_50%] gap-3">
            {jobExperience?.map((job, index) => {
              return (
                <div
                  className={classNames(styles.flexJustifyBetween)}
                  key={index}
                >
                  <div
                    className={classNames(
                      styles.flexCenterSpace,
                      "space-x-0 gap-1"
                    )}
                  >
                    <CheckBoxInput
                      name="experience"
                      id={job.value}
                      value={job.value}
                      checked={job.checked}
                      job={job}
                      onChange={() => {}}
                      //   onChange={handleJobExperienceChange}
                    />

                    <Label htmlFor={job.value}>{job.label}</Label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
