/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "@/services/axios";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface ApiError {
  status?: number;
  message?: string;
  errors?: Record<string, string[]>;
}

export function useApiQuery<T>(
  key: any[],
  url: string,
  options?: Omit<UseQueryOptions<T, ApiError>, "queryKey" | "queryFn">,
  params?: Record<string, any>
) {
  return useQuery<T, ApiError>({
    queryKey: key,
    queryFn: async () => {
      const response = await api.get<ApiResponse<T>>(url, { params });
      return response?.data && response?.data?.data;
    },
    // refetchOnWindowFocus: false,
    ...options,
  });
}

export function useApiPost<T, V = any>(
  url: string,
  options?: Omit<UseMutationOptions<T, ApiError, V>, "mutationFn">
) {
  return useMutation<T, ApiError, V>({
    mutationFn: async (data: V) => {
      const response = await api.post<ApiResponse<T>>(url, data);
      return response.data.data;
    },
    ...options,
  });
}

export function useApiPut<T, V = any>(
  url: string,
  options?: Omit<UseMutationOptions<T, ApiError, V>, "mutationFn">
) {
  return useMutation<T, ApiError, V>({
    mutationFn: async (data: V) => {
      const response = await api.put<ApiResponse<T>>(url, data);
      return response.data.data;
    },
    ...options,
  });
}

export function useApiDelete<T = void>(
  url: string,
  options?: Omit<UseMutationOptions<T, ApiError, void>, "mutationFn">
) {
  return useMutation<T, ApiError, void>({
    mutationFn: async () => {
      const response = await api.delete<ApiResponse<T>>(url);
      return response.data.data;
    },
    ...options,
  });
}
