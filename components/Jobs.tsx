"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetJobs } from "@/services/queries";
import { useJobberStore } from "@/store";
import { experience, jobType, position, sortBy } from "@/utils/constants";
import { useEffect, useState } from "react";
import Job from "./Job";
import PaginationWrapper from "./Pagination";
import { JobSearch } from "./Search";
import SliderComponent from "./Slider";

const Jobs = () => {
  const [params, setParams] = useState({ page: 1, limit: 10 });
  const { data, isLoading, refetch, isSuccess } = useGetJobs(params);
  const { updateData, setIsLoading } = useJobberStore();

  useEffect(() => {
    if (isSuccess) {
      updateData(data?.jobs);
      setIsLoading(isLoading);
    }
  }, [isSuccess, isLoading, data?.jobs]);

  const onNext = () => {
    return setParams((prev) => ({ ...prev, page: params?.page + 1 }));
  };
  const onPrev = () => {
    return setParams((prev) => ({ ...prev, page: params?.page - 1 }));
  };
  //   const { isPaginate, isLoading, country, isSearchTrigger } = useAppSelector(
  //     (state) => state.rootReducer.jobs
  //   );
  //   const data: any = useAppSelector((state) => state.rootReducer.jobs.data);
  const [sliderRange, setSliderRange] = useState([500, 10000]);
  //   const searchParams = useSearchParams();
  //   const page = +searchParams.get("page")!;
  //   const resultsPerPage = +searchParams.get("resultsPerPage")!;
  //   const dispatch = useAppDispatch();
  //   useEffect(() => {
  //     dispatch(stopPagination());
  //   }, []);
  //   const router = useRouter();

  //   const filter__attr = searchParams.get("filter__attr")!;
  //   const price_min = +searchParams.get("price_min")!;
  //   const price_max = +searchParams.get("price_max")!;

  //   type SliderType = {
  //     resultsPerPage: number;
  //     page: number;
  //     price_min: number;
  //     price_max: number;
  //     location: string;
  //     filter__attr?: string;
  //   };

  //   const [slider, setSlider] = useState<SliderType>({
  //     resultsPerPage: 0,
  //     page: 0,
  //     price_min: 0,
  //     price_max: 0,
  //     location: "",
  //   });
  //   useGetJobsFilterQuery(slider, {
  //     skip:
  //       !slider.page ||
  //       !slider.resultsPerPage ||
  //       !slider.price_min ||
  //       !slider.price_max ||
  //       !slider.location,
  //   });

  //   const [myState, setState] = useState({
  //     resultsPerPage: 0,
  //     page: 0,
  //     location: "",
  //   });
  //   useGetAllJobsQuery(myState, {
  //     skip:
  //       !myState.page ||
  //       !myState.resultsPerPage ||
  //       !myState.location ||
  //       isPaginate ||
  //       isSearchTrigger,
  //   });

  //   type CheckboxStateType = {
  //     resultsPerPage: number;
  //     page: number;
  //     filter__attr: string;
  //     location: string;
  //     price_min?: number;
  //     price_max?: number;
  //   };

  //   const [checkboxState, setCheckboxState] = useState<CheckboxStateType>({
  //     resultsPerPage: 0,
  //     page: 0,
  //     filter__attr: filter__attr ? filter__attr : "",
  //     location: "",
  //     price_min: price_min,
  //     price_max: price_max,
  //   });
  //   useGetJobsFilterQuery(checkboxState, {
  //     skip:
  //       !checkboxState.page ||
  //       !checkboxState.resultsPerPage ||
  //       !checkboxState.filter__attr ||
  //       !checkboxState.location,
  //   });

  //   const handleRadioChange = (e: string) => {
  //     // dispatch(api.util.invalidateTags(["JobFilter"]));
  //     updateURLFromSearchQuery({
  //       checkBox: e ? e : filter__attr,
  //       page: page <= 0 ? 1 : page,
  //       resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
  //     });
  //     if (price_min! <= 0) {
  //       setCheckboxState({
  //         page: page <= 0 ? 1 : page,
  //         resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
  //         filter__attr: e ? e : filter__attr,
  //         location: country,
  //       });
  //     } else {
  //       setCheckboxState({
  //         page: page <= 0 ? 1 : page,
  //         resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
  //         filter__attr: e ? e : filter__attr,
  //         location: country,
  //         price_min: price_min ? price_min : sliderRange[0],
  //         price_max: price_max ? price_max : sliderRange[1],
  //       });
  //     }
  //   };

  //   const fetchJobs = async () => {
  //     if (isSearchTrigger) return;
  //     else {
  //       await setState({
  //         page: page <= 0 ? 1 : page,
  //         resultsPerPage:
  //           !resultsPerPage || resultsPerPage < 0 ? 4 : resultsPerPage,
  //         location: country,
  //       });
  //     }
  //   };

  //   useEffect(() => {
  //     if (!country || isSearchTrigger) return;
  //     else {
  //       fetchJobs();
  //     }
  //   }, [country]);

  //   const updateURLFromSearchQuery = useDebouncedCallback(
  //     (query: {
  //       jobType?: string;
  //       price_min?: number;
  //       price_max?: number;
  //       checkBox?: string;
  //       experience?: string;
  //       position?: string;
  //       page: number;
  //       resultsPerPage: number;
  //     }) => {
  //       const params = new URLSearchParams(searchParams);
  //       params.set("page", query.page.toString());
  //       params.set("resultsPerPage", query.resultsPerPage.toString());

  //       if (query.jobType) {
  //         params.set("jobType", query.jobType);
  //       }
  //       if (query.price_min && query.price_max) {
  //         params.set("price_min", query.price_min.toString());
  //         params.set("price_max", query.price_max.toString());
  //       }
  //       if (query.checkBox) {
  //         params.set("filter__attr", query.checkBox);
  //       }
  //       if (query.experience) {
  //         params.set("experience", query.experience);
  //       }
  //       if (query.position) {
  //         params.set("position", query.position);
  //       }
  //       router.push(`?${params.toString()}`);
  //     },
  //     50
  //   );

  //   const filterByPriceRange = () => {
  //     updateURLFromSearchQuery({
  //       price_min: sliderRange[0],
  //       price_max: sliderRange[1],
  //       page: page <= 0 ? 1 : page,
  //       resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
  //     });
  //     if (!filter__attr) {
  //       setSlider({
  //         page: page <= 0 ? 1 : page,
  //         resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
  //         price_min: price_min ? price_min : sliderRange[0],
  //         price_max: price_max ? price_max : sliderRange[1],
  //         location: country,
  //       });
  //     } else {
  //       setSlider({
  //         page: page <= 0 ? 1 : page,
  //         resultsPerPage: resultsPerPage <= 0 ? 5 : resultsPerPage,
  //         price_min: price_min ? price_min : sliderRange[0],
  //         price_max: price_max ? price_max : sliderRange[1],
  //         filter__attr: filter__attr,
  //         location: country,
  //       });
  //     }
  //     // dispatch(api.util.invalidateTags(["JobFilter"]));
  //   };

  return (
    <>
      <div className="mx-4 flex flex-col gap-3 overflow-y-scroll h-[90vh]">
        <div className="bg-lightGray bg-transparent z-10">
          <JobSearch />
        </div>

        <div className="grid grid-cols-2 items-center gap-3 mt-5 md:hidden">
          <Select
          //   onValueChange={(e) => handleRadioChange(e)}
          >
            <SelectTrigger className="w-full py-7 pl-9">
              <SelectValue placeholder="Date Posted" />
            </SelectTrigger>
            <SelectContent>
              {sortBy?.map((sort) => {
                return (
                  <SelectItem
                    key={sort.id}
                    value={sort.value}
                    className="cursor-pointer"
                  >
                    {sort.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full py-7 pl-9">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              {jobType?.map((sort) => {
                return (
                  <SelectItem
                    key={sort.id}
                    value={sort.value}
                    className="cursor-pointer"
                  >
                    {sort.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
            <Select>
              <SelectTrigger className="w-full py-7 pl-9">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                {experience?.map((sort) => {
                  return (
                    <SelectItem
                      key={sort.id}
                      value={sort.value}
                      className="cursor-pointer"
                    >
                      {sort.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full py-7 pl-9">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                {position?.map((sort) => {
                  return (
                    <SelectItem
                      key={sort.id}
                      value={sort.value}
                      className="cursor-pointer"
                    >
                      {sort.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </Select>
        </div>

        <div className="md:hidden">
          <div className="">
            <div className="flex items-center justify-between pb-5">
              <h2 className="font-bold">Salary Range</h2>
              <Button
                className="bg-transparent text-deepBlue text-sm"
                // onClick={filterByPriceRange}
              >
                Apply
              </Button>
            </div>
            <div className="w-[90%] mx-auto">
              <SliderComponent
                sliderRange={sliderRange}
                setSliderRange={setSliderRange}
              />
            </div>
          </div>
        </div>

        <div className="pt-6">
          <div className="flex items-center justify-between pb-3">
            {data?.jobs && data?.jobs?.length > 0 && (
              <PaginationWrapper
                total={data?.total ?? 0}
                resultsPerPage={data?.limit ?? 4}
                totalResults={data?.total ?? 0}
                page={data?.page ?? 1}
                totalPages={data?.totalPages ?? 0}
                onNext={onNext}
                onPrev={onPrev}
              />
            )}
            <p className="text-sm text-gray-400">
              {data?.jobs?.length} results found
            </p>
          </div>

          <div className="lg:h-[70vh] overflow-y-scroll">
            <Job data={data?.jobs} isLoading={isLoading} refetch={refetch} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
