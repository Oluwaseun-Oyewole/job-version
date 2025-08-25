import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUrlSearchParams } from "@/hooks/useUrlQuery";
import { JobParams } from "@/services/types";
import { SEARCHPARAMS_QUERIES } from "@/utils/constants";
import { Dispatch, SetStateAction, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const JobSearch = ({
  params,
  setParams,
}: {
  params: JobParams;
  setParams: Dispatch<SetStateAction<JobParams>>;
}) => {
  const { setParam, clearParams, getParam } = useUrlSearchParams();
  const [values, setValues] = useState({
    searchQuery: getParam(SEARCHPARAMS_QUERIES.search),
    job_mode: getParam(SEARCHPARAMS_QUERIES.job_mode),
  });

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearch(value);
    return;
  }, 300);

  const onSearch = async (query: string) => {
    setParam(SEARCHPARAMS_QUERIES.search, query);
    setValues((prev) => ({ ...prev, searchQuery: query }));
    setParams((prev) => ({ ...prev, searchQuery: query }));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, searchQuery: value }));
    debouncedSearch(value);
  };

  const onSelectChange = (value: string) => {
    setParam(SEARCHPARAMS_QUERIES.job_mode, value);
    setValues((prev) => ({ ...prev, job_mode: value }));
    setParams((prev) => ({ ...prev, job_mode: value }));
  };

  const clearFilters = () => {
    setValues({ job_mode: "", searchQuery: "" });
    setParams({
      page: 1,
      limit: 4,
      searchQuery: undefined,
      job_mode: undefined,
    });
    clearParams();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-5">
        <div className="grid md:gap-3 lg:gap-0 w-full md:grid-cols-[60%_40%] items-center bg-white rounded-sm flex-1">
          <Input
            value={values.searchQuery ?? ""}
            type="search"
            className="autocomplete-input h-[52px] w-full px-8 rounded-lg !border-none font-[400] placeholder:!text-sm placeholder:!text-gray-500 outline-none"
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Search by job title, company"
          />
          <div className="relative">
            <Select
              value={values.job_mode ?? ""}
              onValueChange={(value: string) => onSelectChange(value)}
            >
              <SelectTrigger className="w-full pl-8 text-sm !h-[50px] font-[400]">
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
