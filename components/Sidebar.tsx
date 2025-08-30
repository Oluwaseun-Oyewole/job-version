"use client";
import ProfileImage from "@/assets/Avatar.svg";
import { Button } from "@/components/ui/button";
import { dashboardRoutes } from "@/utils/constants";
import { truncate } from "@/utils/helper";
import { routes } from "@/utils/routes";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import NavMenuItems from "./Navlink";

export const Sidebar = () => {
  const session = useSession();
  const username = session?.data?.user?.name ?? "";

  return (
    <nav className="font-[300] lg:flex items-center flex-col lg:justify-center">
      <div className="w-[87%] lg:px-6">
        <div className="lg:flex flex-col items-center justify-center">
          <div className="py-6">
            <Image
              src={ProfileImage}
              alt="jop port logo"
              className="rounded-full w-[70px]"
            />
            <p className="text-left lg:text-start font-medium text-sm pt-4 text-deepBlue">
              {truncate(username!, 20)}
            </p>
          </div>
        </div>

        <ul className="flex flex-col">
          {dashboardRoutes.map((route, index) => {
            return <NavMenuItems key={index} route={route} />;
          })}
        </ul>

        <div className="w-[80%] mx-auto flex pt-16">
          <Button
            onClick={() => signOut({ callbackUrl: routes.login })}
            className="!bg-red-500 !text-xs cursor-pointer"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};
