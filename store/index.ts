import { JobParams, JobType } from "@/services/types";
import { experience, jobType, sortBy } from "@/utils/constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface InitialState {
  data: JobType[];
  isLoading: boolean;
  updateData: (data: JobType[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  values: JobParams;
  setValues: (newValues: Partial<JobParams>) => void;
  resetValues: () => void;
  updateValue: <K extends keyof JobParams>(key: K, value: JobParams[K]) => void;
}

const getParam = (key: string): string => {
  if (typeof window === "undefined") return "";
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key) || "";
};

// const initialParamsValues: JobParams = {
//   page: Number(getParam(SEARCHPARAMS_QUERIES.page)) || 1,
//   searchQuery: getParam(SEARCHPARAMS_QUERIES.search) || "",
//   limit: 5,
//   job_mode: getParam(SEARCHPARAMS_QUERIES.job_mode) || "",
//   sort_by: getParam(SEARCHPARAMS_QUERIES.sort_by) || sortBy[0]?.value || "",
//   min_salary:
//     Number(getParam(SEARCHPARAMS_QUERIES.min_salary)) > 0
//       ? Number(getParam(SEARCHPARAMS_QUERIES.min_salary))
//       : 500,
//   max_salary:
//     Number(getParam(SEARCHPARAMS_QUERIES.max_salary)) > 0
//       ? Number(getParam(SEARCHPARAMS_QUERIES.max_salary))
//       : 1000000,
//   job_type: getParam(SEARCHPARAMS_QUERIES.job_type) || jobType[0]?.value || "",
//   experience_level:
//     getParam(SEARCHPARAMS_QUERIES.experience_level) ||
//     experience[0]?.value ||
//     "",
// };

const initialValues: JobParams = {
  page: 1,
  searchQuery: "",
  limit: 5,
  job_mode: "",
  sort_by: sortBy[0]?.value,
  min_salary: 500,
  max_salary: 1000000,
  job_type: jobType[0]?.value,
  experience_level: experience[0]?.value,
};

export const useJobberStore = create(
  immer<InitialState>((set) => ({
    isLoading: true,
    data: [],
    values: initialValues,
    setValues: (newValues) => {
      return set((state) => {
        return { ...state.values, newValues };
      });
    },
    updateData(data) {
      set((state) => {
        state.data = data;
      });
    },
    updateValue: (key, value) => {
      console.log("key, value", key, value);
      return set((state) => ({ ...state.values, [key]: value }));
    },
    resetValues: () => {
      set((state) => ({ initialValues }));
    },
    setIsLoading(data) {
      set((state) => {
        state.isLoading = data;
      });
    },
  }))
);
