import { useSession } from "next-auth/react";

export const useIsTokenValid = () => {
  const session = useSession();
  const expireAt = session?.data?.user?.exp as number;
  const currentTime = Math.floor(Date.now() / 1000);
  return {
    isValid: expireAt > currentTime,
    status: session?.status,
  };
};
