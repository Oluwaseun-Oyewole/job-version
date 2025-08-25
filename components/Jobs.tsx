"use client";
import { useUrlSearchParams } from "@/hooks/useUrlQuery";
import { useGetJobs } from "@/services/queries";
import { JobParams } from "@/services/types";
import { useJobberStore } from "@/store";
import { SEARCHPARAMS_QUERIES } from "@/utils/constants";
import { useEffect, useState } from "react";
import Job from "./Job";
import PaginationWrapper from "./Pagination";
import { JobSearch } from "./Search";

const Jobs = () => {
  const { getParam } = useUrlSearchParams();
  const searchQuery = getParam(SEARCHPARAMS_QUERIES.search);
  const job_mode = getParam(SEARCHPARAMS_QUERIES.job_mode);
  const page = Number(getParam(SEARCHPARAMS_QUERIES.page));

  const limit = Number(getParam(SEARCHPARAMS_QUERIES.limit));

  const [params, setParams] = useState<JobParams>({
    page: page > 0 ? page : 1,
    limit: limit > 0 ? limit : 5,
    searchQuery: searchQuery ? searchQuery : undefined,
    job_mode: job_mode ? job_mode : undefined,
  });

  const { data, isLoading, refetch, isSuccess } = useGetJobs(params);
  const { updateData, setIsLoading } = useJobberStore();

  // useEffect(() => {
  //   if (isNaN(page)) removeParam(SEARCHPARAMS_QUERIES.page);
  //   if (limit === 0 || isNaN(limit)) removeParam(SEARCHPARAMS_QUERIES.limit);
  //   if (job_mode === "null" || !job_mode)
  //     removeParam(SEARCHPARAMS_QUERIES.job_mode);
  //   if (searchQuery === null) removeParam(SEARCHPARAMS_QUERIES.search);
  // }, []);

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
    <div className="flex flex-col gap-3 overflow-y-scroll">
      <div className="bg-lightGray bg-transparent z-10">
        <JobSearch setParams={setParams} params={params} />
      </div>

      <div className="pt-6">
        <div className="flex items-center justify-end pb-3">
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
        </div>

        <div className="overflow-y-scroll">
          <Job data={data?.jobs} isLoading={isLoading} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
