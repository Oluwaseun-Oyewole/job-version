import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobParams } from "@/services/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type IState = {
  name: string;
  status_code: string;
};

// type ISearch = {
//   searchTerm: string;
// };
// type ISearchType = {
//   resultsPerPage: number;
//   page: number;
//   searchQuery?: string;
//   location: string;
//   searchLocation?: string;
// };

export const JobSearch = ({
  params,
  setParams,
}: {
  params: JobParams;
  setParams: Dispatch<SetStateAction<JobParams>>;
}) => {
  const [values, setValues] = useState({ searchQuery: "", job_mode: "" });
  //   const searchParams = useSearchParams();
  //   const dispatch = useAppDispatch();
  //   const router = useRouter();
  //   const { states, country } = useAppSelector((state) => state.rootReducer.jobs);
  //   const [searchController, setSearchController] = useState(false);
  //   const page = +searchParams.get("page")!;
  //   const resultsPerPage = +searchParams.get("resultsPerPage")!;

  //   const updateURLFromSearchQuery = useDebouncedCallback(
  //     (query: {
  //       search: string;
  //       searchLocation: string;
  //       page: number;
  //       resultsPerPage: number;
  //     }) => {
  //       const params = new URLSearchParams(searchParams);
  //       params.set("page", query.page.toString());
  //       params.set("resultsPerPage", query.resultsPerPage.toString());
  //       if (query.searchLocation && query.search) {
  //         params.set("query", query.search);
  //         params.set("location", query.searchLocation);
  //       } else if (query.search) {
  //         params.set("query", query.search);
  //       } else if (query.searchLocation) {
  //         params.set("location", query.searchLocation);
  //       } else {
  //         params.delete("query");
  //         params.delete("location");
  //       }
  //       router.push(`?${params.toString()}`);
  //     },
  //     50
  //   );
  //   const checkIfJobInArray = (object: ISearch, array: ISearch[]): boolean => {
  //     return array.some((item) => item === object);
  //   };

  //   const saveSearches = (object: ISearch) => {
  //     let currentList: ISearch[] = [];
  //     const storedList = localStorage.getItem("searches");
  //     if (storedList) {
  //       currentList = JSON.parse(storedList);
  //     }
  //     const obj = checkIfJobInArray(object, currentList);
  //     if (obj) {
  //       return;
  //     } else {
  //       currentList.push(object);
  //       if (typeof window !== "undefined") {
  //         localStorage.setItem("searches", JSON.stringify(currentList));
  //         localStorage.setItem("notification", String(true));
  //       }
  //       dispatch(setNotification());
  //     }
  //   };

  //   const [myState, setState] = useState<ISearchType>({
  //     resultsPerPage: 0,
  //     page: 0,
  //     searchQuery: "",
  //     location: "",
  //     searchLocation: "",
  //   });
  //   useGetJobSearchQuery(myState, {
  //     skip:
  //       !myState.page ||
  //       !myState.resultsPerPage ||
  //       (!myState.searchQuery && !myState.location) ||
  //       (!myState.searchLocation && !myState.location),
  //   });

  //   const onSubmit = async (values: Record<string, any>, { resetForm }: any) => {
  //     setSearchController(true);
  //     if (values.location && values.search === "") {
  //       setState({
  //         page: page > 0 ? page : 1,
  //         resultsPerPage: resultsPerPage > 0 ? resultsPerPage : 4,
  //         location: country,
  //         searchLocation: values.location,
  //       });
  //     } else if (values.search && values.location === "") {
  //       setState({
  //         page: page > 0 ? page : 1,
  //         resultsPerPage: resultsPerPage > 0 ? resultsPerPage : 4,
  //         location: country,
  //         searchQuery: values.search,
  //       });
  //     } else {
  //       setState({
  //         page: page > 0 ? page : 1,
  //         resultsPerPage: resultsPerPage > 0 ? resultsPerPage : 4,
  //         location: country,
  //         searchQuery: values.search,
  //         searchLocation: values.location,
  //       });
  //     }
  //     updateURLFromSearchQuery({
  //       search: values?.search ?? "",
  //       searchLocation: values.location,
  //       page: page <= 0 ? 1 : page,
  //       resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
  //     });
  //     dispatch(setNotification());
  //     saveSearches(values.search || values.location);
  //     resetForm({});
  //   };

  //   useEffect(() => {
  //     const params = new URLSearchParams(searchParams);
  //     params.delete("query");
  //     params.delete("location");
  //     router.push(`?${params.toString()}`);
  //   }, []);

  //   useEffect(() => {
  //     if (!searchController) {
  //       dispatch(stopSearch());
  //     } else {
  //       dispatch(startSearch());
  //     }
  //   }, [searchController]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    performSearch(value);
    return;
  }, 300);

  const performSearch = async (query: string) => {
    setValues((prev) => ({ ...prev, searchQuery: query }));
    setParams((prev) => ({ ...prev, searchQuery: query }));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, searchQuery: value }));
    debouncedSearch(value);
  };

  useEffect(() => {
    if (!Object.values(values).length)
      setParams({
        page: 1,
        limit: 4,
        searchQuery: undefined,
        job_mode: undefined,
      });
  }, [setParams, params]);

  const clearFilters = () => {
    setValues({ job_mode: "", searchQuery: "" });
    setParams({
      page: 1,
      limit: 4,
      searchQuery: undefined,
      job_mode: undefined,
    });
  };

  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="grid gap-3 lg:gap-0 md:grid-cols-[60%_40%] items-center lg:bg-white rounded-sm flex-1">
          <Input
            value={values.searchQuery}
            onChangeCapture={handleInputChange}
            type="search"
            className="autocomplete-input h-[52px] w-full px-8 rounded-lg !border-none font-[400] placeholder:!text-sm placeholder:!text-gray-500 outline-none"
            onChange={() => {}}
            autoComplete="off"
            placeholder="Search by job title, company"
          />
          <div className="relative">
            <Select
              value={values.job_mode}
              onValueChange={(value: string) => {
                setValues((prev) => ({ ...prev, job_mode: value }));
                setParams((prev) => ({ ...prev, job_mode: value }));
              }}
            >
              <SelectTrigger className="w-full pl-9 font-medium">
                <SelectValue placeholder="Select job mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Onsite" className="font-light">
                  Onsite
                </SelectItem>
                <SelectItem value="Hybrid" className="font-light">
                  Hybrid
                </SelectItem>
                <SelectItem value="Remote" className="font-light">
                  Remote
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {(params?.job_mode || params?.searchQuery) && (
          <Button
            className="bg-deepBlue h-[45px] lg:ml-5 hover:bg-lightBlue rounded-sm"
            onClick={clearFilters}
          >
            Clear filter(s)
          </Button>
        )}
      </div>
    </div>
  );
};
