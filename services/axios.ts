import { COOKIES_KEYS } from "@/utils/constants";
import { getFromStorage, removeFromStorage, Toastify } from "@/utils/helper";
import { routes } from "@/utils/routes";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface DefaultOptions extends AxiosRequestConfig {
  baseURL?: string;
  headers: {
    "Content-Type": string;
  };
  timeout: number;
}

interface ErrorResponse {
  status?: number;
  message?: string;
}

const defaultOptions: DefaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
};

const api = axios.create(defaultOptions);

const errorHandler = (error: AxiosError<ErrorResponse>): Promise<never> => {
  const status = error.response?.data?.status;
  const errorMessage = error.response?.data?.message;

  const handleLogout = (): void => {
    removeFromStorage(COOKIES_KEYS.TOKEN);
    window.location.href = window.origin + routes.login;
  };

  switch (status) {
    case 429:
      Toastify.error("Too many requests");
      break;
    case 401:
      handleLogout();
      Toastify.error(errorMessage || "Unauthorized");
      break;
    case 404:
      Toastify.error("Invalid request route");
      break;
    case 503:
      Toastify.error("Service unavailable, Please try again shortly");
      break;
    default:
      Toastify.error(errorMessage ?? "Sorry your request failed");
  }
  return Promise.reject(error.response?.data || error);
};

const authInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getFromStorage(COOKIES_KEYS.TOKEN);

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  errorHandler
);

api.interceptors.request.use(authInterceptor);

export default api;
