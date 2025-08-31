"use client";
import { useLikedJobsStore } from "@/store/likedJobsStore";
import { useIsTokenValid } from "@/utils/hooks/useToken";
import { routes } from "@/utils/routes";
import { Bell } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo-f.svg";
import { SidebarDrawer } from "./SidebarDrawer";
import { Button } from "./ui/button";

export const Navigation = () => {
  const { likedJobs } = useLikedJobsStore();
  const { status } = useIsTokenValid();

  return (
    <div className="h-[10vh] flex items-center justify-center bg-white z-20 px-4 lg:px-12 sticky top-0 left-0">
      <div className="flex justify-between items-center w-full ">
        <Link href={routes.home}>
          <Image src={Logo} alt="logo" className="w-[100px]" />
        </Link>

        <div className="flex items-center gap-4">
          <Link href={routes.notification}>
            <div className="cursor-pointer rounded-full border-2 border-gray-300 p-2 relative">
              <Bell size={17} />
              {likedJobs?.length > 0 && (
                <div className="h-4 w-4 bg-red-500 rounded-full text-[8px] font-bold absolute -top-[2px] z-20 -right-[3px] text-white flex items-center justify-center">
                  {likedJobs?.length}
                </div>
              )}
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link href={routes.postJob}>
              <Button className="cursor-pointer bg-deepBlue text-white hover:opacity-90 hover:bg-deepBlue">
                Post a job
              </Button>
            </Link>
            {status === "authenticated" && (
              <Button
                className="cursor-pointer bg-red-500 text-white hover:bg-red-400"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            )}
          </div>
          {status === "authenticated" && <SidebarDrawer />}
        </div>
      </div>
    </div>
  );
};
