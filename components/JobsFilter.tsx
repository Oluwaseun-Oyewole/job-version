/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { JobsProps } from "@/utils/types";
import { ListFilter } from "lucide-react";
import "rc-slider/assets/index.css";
import { Filter } from "./Filter";

export const JobsFilter = ({ isLoading, params, setParams }: JobsProps) => {
  return (
    <>
      <div className="md:hidden">
        <Drawer>
          <div className="flex justify-end">
            <DrawerTrigger className="text-right flex justify-end pb-3 px-5">
              <ListFilter color="#0049fc" />
            </DrawerTrigger>
          </div>
          <DrawerContent className="px-6">
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
            </DrawerHeader>
            <Filter
              isLoading={isLoading}
              setParams={setParams}
              params={params}
            />
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>{" "}
      </div>
      <div className="hidden md:block">
        <Filter isLoading={isLoading} setParams={setParams} params={params} />
      </div>
    </>
  );
};
