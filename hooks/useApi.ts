/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useApi.ts
import api from "@/services/axios";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

// Generic response type
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

// Error type
export interface ApiError {
  status?: number;
  message?: string;
  errors?: Record<string, string[]>;
}

// GET request hook
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
    ...options,
  });
}

// POST request hook
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

// PUT request hook
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

// DELETE request hook
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
