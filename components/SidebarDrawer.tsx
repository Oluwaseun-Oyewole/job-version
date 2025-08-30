"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Sidebar } from "./Sidebar";

export function SidebarDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild className="md:hidden">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d={"M4 6h16"} strokeLinecap="round" />
          <path d={"M4 12h16"} strokeLinecap="round" opacity={1} />
          <path d={"M4 18h16"} strokeLinecap="round" />
        </svg>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
        </div>
        <div className="mx-auto w-[85%] pb-5 md:pb-10">
          <Sidebar />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
