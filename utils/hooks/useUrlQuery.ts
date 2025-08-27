"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type SearchParamValue = string | string[] | number | boolean | null | undefined;

interface UseSearchParamsReturn {
  searchParams: Record<string, string>;
  setParam: (key: string, value: SearchParamValue) => void;
  setURLParams: (params: Record<string, SearchParamValue>) => void;
  removeParam: (key: string) => void;
  removeParams: (keys: string[]) => void;
  clearParams: () => void;
  getParam: (key: string) => string | null;
  hasParam: (key: string) => boolean;
  toggleParam: (key: string, value?: string) => void;
}

export function useUrlSearchParams(): UseSearchParamsReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Convert URLSearchParams to plain object
  const searchParamsObject = Object.fromEntries(searchParams.entries());

  // Helper function to create new URL with updated params
  const createUpdatedUrl = useCallback(
    (updatedParams: URLSearchParams) => {
      const paramString = updatedParams.toString();
      return paramString ? `${pathname}?${paramString}` : pathname;
    },
    [pathname]
  );

  // Helper function to normalize values
  const normalizeValue = useCallback((value: SearchParamValue) => {
    if (value === null || value === undefined || value === "") return null;
    if (Array.isArray(value)) return value.length > 0 ? value.join(",") : null;
    return String(value);
  }, []);

  const setParam = useCallback(
    (key: string, value: SearchParamValue) => {
      const params = new URLSearchParams(searchParams);
      const normalizedValue = normalizeValue(value);
      if (normalizedValue === null) {
        params.delete(key);
      } else {
        params.set(key, normalizedValue);
      }
      router.push(createUpdatedUrl(params));
    },
    [searchParams, router, createUpdatedUrl, normalizeValue]
  );

  const setURLParams = useCallback(
    (paramsToSet: Record<string, SearchParamValue>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(paramsToSet).forEach(([key, value]) => {
        const normalizedValue = normalizeValue(value);
        if (normalizedValue === null) {
          params.delete(key);
        } else {
          params.set(key, normalizedValue);
        }
      });

      router.push(createUpdatedUrl(params));
    },
    [searchParams, router, createUpdatedUrl, normalizeValue]
  );

  const removeParam = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(key);
      router.push(createUpdatedUrl(params));
    },
    [searchParams, router, createUpdatedUrl]
  );

  const removeParams = useCallback(
    (keys: string[]) => {
      const params = new URLSearchParams(searchParams);
      keys.forEach((key) => params.delete(key));
      router.push(createUpdatedUrl(params));
    },
    [searchParams, router, createUpdatedUrl]
  );

  const clearParams = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  const getParam = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const hasParam = useCallback(
    (key: string): boolean => {
      return searchParams.has(key);
    },
    [searchParams]
  );

  // Toggle a parameter (useful for boolean filters)
  const toggleParam = useCallback(
    (key: string, value: string = "true") => {
      const currentValue = searchParams.get(key);
      if (currentValue === value) {
        removeParam(key);
      } else {
        setParam(key, value);
      }
    },
    [searchParams, setParam, removeParam]
  );

  return {
    searchParams: searchParamsObject,
    setParam,
    setURLParams,
    removeParam,
    removeParams,
    clearParams,
    getParam,
    hasParam,
    toggleParam,
  };
}
