import { JobType } from "@/services/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface InitialState {
  data: JobType[];
  isLoading: boolean;
  updateData: (data: JobType[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useJobberStore = create(
  immer<InitialState>((set) => ({
    isLoading: false,
    data: [],
    updateData(data) {
      set((state) => {
        state.data = data;
      });
    },
    setIsLoading(data) {
      set((state) => {
        state.isLoading = data;
      });
    },
  }))
);
