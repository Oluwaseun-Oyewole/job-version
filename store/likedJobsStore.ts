import { JobType } from "@/services/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LikedJobsStore {
  likedJobs: JobType[];
  addLikedJob: (job: JobType) => void;
  removeLikedJob: (jobId: string) => void;
  isJobLiked: (jobId: string) => boolean;
  clearLikedJobs: () => void;
  isLoading: boolean;
}

export const useLikedJobsStore = create<LikedJobsStore>()(
  persist(
    (set, get) => ({
      likedJobs: [],
      isLoading: true,

      addLikedJob: (job: JobType) => {
        set((state) => {
          const exists = state.likedJobs.some((j) => j.id === job.id);
          if (exists) return state;
          return {
            likedJobs: [...state.likedJobs, job],
            isLoading: false,
          };
        });
      },

      removeLikedJob: (jobId: string) => {
        set((state) => ({
          likedJobs: state.likedJobs.filter((job) => job.id !== jobId),
          isLoading: false,
        }));
      },

      isJobLiked: (jobId: string) => {
        return get().likedJobs.some((job) => job.id === jobId);
      },

      clearLikedJobs: () => {
        set({ likedJobs: [], isLoading: false });
      },
    }),
    {
      name: "liked-jobs-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Set loading to false after rehydration
        if (state) {
          state.isLoading = false;
        }
      },
    }
  )
);
