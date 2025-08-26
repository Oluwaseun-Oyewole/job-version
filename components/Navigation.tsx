"use client";
import { useLikedJobsStore } from "@/store/likedJobsStore";
import { routes } from "@/utils/routes";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo-f.svg";

export const Navigation = () => {
  const { likedJobs } = useLikedJobsStore();

  return (
    <div className="h-[10vh] flex items-center justify-center bg-white z-20 px-4 lg:px-12 sticky top-0 left-0">
      <div className="flex justify-between items-center w-full">
        <Link href={routes.home}>
          <Image src={Logo} alt="logo" className="w-[100px]" />
        </Link>

        <div className="flex items-center gap-5">
          <Link href={routes.notification}>
            <div className="cursor-pointer rounded-full border-2 border-gray-300 p-2">
              <Bell size={17} />
              {likedJobs?.length > 0 && (
                <div className="h-4 w-4 bg-red-500 rounded-full text-[8px] font-bold absolute top-5 md:top-4 z-20 right-[110px] md:right-[45px] text-white flex items-center justify-center">
                  {likedJobs?.length}
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
