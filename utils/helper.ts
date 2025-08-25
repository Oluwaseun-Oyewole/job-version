import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Cookies from "js-cookie";
import toast, { ToastOptions } from "react-hot-toast";

export const truncate = (str: string, n: number): string => {
  if (str?.length <= n) {
    return str;
  }
  return str?.slice(0, n) + "...";
};
export const dateFormat = (dateString: Date) => {
  dayjs.extend(relativeTime);
  const jobPostedAt = dayjs(dateString);
  return jobPostedAt?.fromNow();
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// utils/slugify.ts
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export class Toastify {
  static success(message: string, options?: ToastOptions) {
    return toast.success(message, {
      ...options,
      style: {
        background: "green",
        color: "white",
        fontSize: "14px",
      },
      className: "toast",
    });
  }

  static error(message: string, options?: ToastOptions) {
    return toast.error(message, {
      ...options,
      style: {
        background: "red",
        color: "white",
        fontSize: "14px",
      },
      className: "toast",
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function saveToStorage(key: string, value: any) {
  try {
    return Cookies.set(key, JSON.stringify(value));
  } catch (error) {
    return error;
  }
}

export function getFromStorage(key: string) {
  try {
    const value = Cookies.get(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
}

export function removeFromStorage(key: string) {
  try {
    return Cookies.remove(key);
  } catch (error) {
    return error;
  }
}

export const formatCurrency = (
  amount: number,
  currencyCode?: string,
  locale = "en-US"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode ?? "USD",
  }).format(amount);
};
