/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { experience, position } from "@/utils/constants";
import { ListFilter } from "lucide-react";
import "rc-slider/assets/index.css";
import { ChangeEvent, useState } from "react";
import { Filter } from "./Filter";

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

export const JobsFilter = () => {
  //   const searchParams = useSearchParams();
  //   const router = useRouter();
  //   const { country, isSearchTrigger } = useAppSelector(
  //     (state) => state.rootReducer.jobs
  //   );
  const [jobExperience, setJobExperience] = useState(experience);
  const [jobPosition, setJobPosition] = useState(position);
  const [sliderRange, setSliderRange] = useState([500, 10000]);
  //   const page = +searchParams.get("page")!;
  //   const resultsPerPage = +searchParams.get("resultsPerPage")!;
  //   const filter__attr = searchParams.get("filter__attr")!;
  //   const price_min = +searchParams.get("price_min")!;
  //   const price_max = +searchParams.get("price_max")!;
  //   const { selected, isSelected, onChange } = useMultiselect([]);

  const classes = {
    border: "py-6 border-b-2 border-lightGray",
    flexCenterSpace: "flex items-center space-x-2",
    flexJustifyBetween: "flex justify-between",
  };

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

  //   const [myState, setState] = useState({
  //     resultsPerPage: 0,
  //     page: 0,
  //     jobType: "",
  //     location: "",
  //   });
  //   useGetJobsFilterQuery(myState, {
  //     skip:
  //       !myState.page ||
  //       !myState.resultsPerPage ||
  //       !myState.jobType ||
  //       !myState.location,
  //   });
  //   const handleJobTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     onChange(event);
  //     if (isSelected(selected[0])) {
  //       updateURLFromSearchQuery({
  //         jobType: selected[0],
  //         page: page <= 0 ? 1 : page,
  //         resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
  //       });

  //       setState({
  //         page: 1,
  //         resultsPerPage: 4,
  //         jobType: selected[0],
  //         location: country,
  //       });
  //     }
  //   };

  //   const [experienceState, setExperienceState] = useState({
  //     resultsPerPage: 0,
  //     page: 0,
  //     experience: "",
  //     location: "",
  //   });
  //   useGetJobsFilterQuery(experienceState, {
  //     skip:
  //       !experienceState.page ||
  //       !experienceState.resultsPerPage ||
  //       !experienceState.experience ||
  //       !experienceState.location,
  //   });

  //   const handleJobExperienceChange = (
  //     item: Job,
  //     event: ChangeEvent<HTMLInputElement>
  //   ) => {
  //     setJobExperience((items) => {
  //       return items?.map((e) =>
  //         e.id === item.id ? { ...e, checked: event.target.checked } : e
  //       );
  //     });

  //     updateURLFromSearchQuery({
  //       experience: item.value,
  //       page: page <= 0 ? 1 : page,
  //       resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
  //     });

  //     setExperienceState({
  //       page: 1,
  //       resultsPerPage: 4,
  //       experience: item.value,
  //       location: country,
  //     });
  //     // dispatch(api.util.resetApiState());
  //   };

  //   const [positionState, setPositionState] = useState({
  //     resultsPerPage: 0,
  //     page: 0,
  //     position: "",
  //     location: "",
  //   });
  //   useGetJobsFilterQuery(positionState, {
  //     skip:
  //       !positionState.page ||
  //       !positionState.resultsPerPage ||
  //       !positionState.position ||
  //       !positionState.location,
  //   });

  //   const handleJobPosition = (
  //     item: Job,
  //     event: ChangeEvent<HTMLInputElement>
  //   ) => {
  //     setJobPosition((items) => {
  //       return items?.map((e) =>
  //         e.id === item.id ? { ...e, checked: event.target.checked } : e
  //       );
  //     });

  //     updateURLFromSearchQuery({
  //       position: item.value,
  //       page: page <= 0 ? 1 : page,
  //       resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
  //     });

  //     setPositionState({
  //       page: 1,
  //       resultsPerPage: 4,
  //       position: item.value,
  //       location: country,
  //     });
  //   };

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

  //   // const handleRefetch = () => {
  //   checkboxState && refetch();
  // };

  // useEffect(() => {
  //   handleRefetch();
  // }, [checkboxState.filter__attr]);

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

  type SliderType = {
    resultsPerPage: number;
    page: number;
    price_min: number;
    price_max: number;
    location: string;
    filter__attr?: string;
  };

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

  //   useEffect(() => {
  //     const params = new URLSearchParams(searchParams);
  //     params.delete("filter__attr");
  //     params.delete("price_min");
  //     params.delete("price_max");
  //     router.push(`?${params.toString()}`);
  //   }, [country]);

  //   const [reset, setReset] = useState(false);
  //   const { refetch } = useGetAllJobsQuery(
  //     {
  //       page: page && page > 0 ? page : 1,
  //       resultsPerPage: resultsPerPage && resultsPerPage > 0 ? resultsPerPage : 4,
  //       location: country,
  //     },
  //     { skip: reset === false || isSearchTrigger }
  //   );

  // const filterReset = () => {
  //   setReset(true);
  //   if (reset) {
  //     refetch();
  //   }
  //   router.push(`/?page=1&resultsPerPage=4`);
  // };

  return (
    <>
      <div className="md:hidden">
        <Drawer>
          <div className="flex justify-end">
            <DrawerTrigger className="text-right flex justify-end pb-3 px-5">
              <ListFilter color="#0049fc" />
            </DrawerTrigger>
          </div>
          <DrawerContent className="px-6">
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
            </DrawerHeader>
            <Filter />
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>{" "}
      </div>
      <div className="hidden md:block">
        <Filter />
      </div>
    </>
  );
};
