"use client";
import { useCallback, useEffect, useState } from "react";

export interface Job {
  id: string;
  job_title: string;
  company_name: string;
  company_logo?: string;
  salary?: number;
  location?: string;
}

export interface UseLocalStorageReturn {
  likedJobs: Job[];
  addLikedJob: (job: Job) => void;
  removeLikedJob: (jobId: string) => void;
  isJobLiked: (jobId: string) => boolean;
  clearLikedJobs: () => void;
}

export const useLocalStorage = () => {
  const [likedJobs, setLikedJobs] = useState<Job[]>([]);

  // Load liked jobs from localStorage
  useEffect(() => {
    const loadLikedJobs = () => {
      try {
        if (typeof window === "undefined") return;
        const stored = localStorage.getItem("likedJobs");
        if (stored) {
          const parsed = JSON.parse(stored);
          setLikedJobs(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.error("Error loading liked jobs from localStorage:", error);
        setLikedJobs([]);
      } finally {
      }
    };

    loadLikedJobs();
  }, []);

  // Save liked jobs to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("likedJobs", JSON.stringify(likedJobs));
    } catch (error) {
      console.error("Error saving liked jobs to localStorage:", error);
    }
  }, [likedJobs]);

  const addLikedJob = useCallback((job: Job) => {
    setLikedJobs((prev) => {
      const exists = prev.some((j) => j.id === job.id);
      if (exists) return prev;
      return [...prev, job];
    });
  }, []);

  const removeLikedJob = useCallback((jobId: string) => {
    setLikedJobs((prev) => prev.filter((job) => job.id !== jobId));
  }, []);

  const isJobLiked = useCallback(
    (jobId: string) => {
      return likedJobs.some((job) => job.id === jobId);
    },
    [likedJobs]
  );

  const clearLikedJobs = useCallback(() => {
    setLikedJobs([]);
  }, []);

  return {
    likedJobs,
    addLikedJob,
    removeLikedJob,
    isJobLiked,
    clearLikedJobs,
  };
};
