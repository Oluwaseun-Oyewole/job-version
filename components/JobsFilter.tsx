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
import { JobsProps } from "@/types";
import { ListFilter } from "lucide-react";
import "rc-slider/assets/index.css";
import { ChangeEvent } from "react";
import { Filter } from "./Filter";

const CheckBoxInput = ({
  name,
  id,
  value,
  checked,
  job,
  onChange,
}: {
  name: string;
  id: string;
  value: string;
  checked: boolean;
  job: any;
  // onChange: (job: Job, e: ChangeEvent<HTMLInputElement>) => void;
  onChange: (job: any, e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="checkbox"
      name={name}
      id={id}
      value={value}
      checked={checked}
      onChange={(e) => onChange(job, e)}
      className="h-[15px] w-[17px] focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
    />
  );
};

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
