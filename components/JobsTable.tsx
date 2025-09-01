/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { formatCurrency } from "@/utils/helper";
import { routes } from "@/utils/routes";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

//TODO: use the correct api type
const JobsTable = ({ jobs }: { jobs: any[] }) => {
  return (
    <div className="flex justify-center items-center md:w-[90%] mx-auto bg-white shadow-lg rounded-md mt-14 overflow-y-scroll">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Company</TableHead>
            <TableHead className="w-[250px]">Job Title</TableHead>
            <TableHead className="w-[150px]">Location</TableHead>
            <TableHead className="w-[150px]">Salary</TableHead>
            <TableHead className="w-[150px]">Job mode</TableHead>
            <TableHead className="w-[150px]">Experience</TableHead>
            <TableHead className="w-[150px]">Job details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-scroll">
          {jobs?.map((job) => (
            <TableRow key={job?.id}>
              <TableCell className="font-medium">{job?.company_name}</TableCell>
              <TableCell className="font-light">{job?.job_title}</TableCell>
              <TableCell className="font-light">{job?.location}</TableCell>
              <TableCell className="font-light">
                {formatCurrency(job?.salary ?? 0)}
              </TableCell>
              <TableCell className="font-light">{job?.job_mode}</TableCell>
              <TableCell className="font-light">
                {job?.experience_level}
              </TableCell>
              <TableCell className="font-light text-deepBlue flex items-center gap-1">
                <Link href={routes.description(job?.slug)}>
                  <LinkIcon size={15} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobsTable;
