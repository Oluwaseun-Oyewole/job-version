"use client";

import DashboardActiveIcon from "@/assets/activeDashboard.svg";
import DashboardIcon from "@/assets/dash.svg";
import { IRoutesType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type INavMenuTypes = {
  route: IRoutesType;
};
const NavMenuItems: React.FC<INavMenuTypes> = ({ route }) => {
  const { path } = route;
  const pathname = usePathname();

  return (
    <Link
      href={`${path}`}
      className={`p-3 rounded-lg gap-2 flex items-center hover:bg-blue-50 mt-2 disabled:cursor-not-allowed ${
        pathname === path && "bg-[#F4F5FF]"
      }`}
    >
      {pathname === path ? (
        <Image src={DashboardActiveIcon} alt="icon" className="w-[16px]" />
      ) : (
        <Image src={DashboardIcon} alt="icon" className="w-[16px]" />
      )}

      <p
        className={`text-black text-base ${
          pathname === path
            ? "text-deepBlue font-medium text-sm"
            : "text-[#1C1C1E] font-medium text-sm"
        }`}
      >
        {route?.title}
      </p>
    </Link>
  );
};

export default NavMenuItems;
