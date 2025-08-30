/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { jwtVerify, SignJWT } from "jose";
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

export async function generateCustomToken(
  user: any,
  secret: Uint8Array<ArrayBufferLike>
): Promise<string> {
  const customPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    issuedAt: Math.floor(Date.now() / 1000),
    expiresIn: "24h",
  };

  const token = await new SignJWT(customPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    // .setIssuedAt()
    .sign(secret);

  return token;
}

export async function verifyCustomToken(
  token: string,
  secret: Uint8Array<ArrayBufferLike>
) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export async function isServerTokenValid() {
  const session = await auth();
  console.log("session", session);
  const expireAt = session?.user?.exp as number;
  const currentTime = Math.floor(Date.now() / 1000);
  return expireAt > currentTime;
}
