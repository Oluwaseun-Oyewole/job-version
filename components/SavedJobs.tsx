import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLikedJobsStore } from "@/store/likedJobsStore";
import { formatCurrency } from "@/utils/helper";
import { routes } from "@/utils/routes";
import { Trash2 } from "lucide-react";
import Link from "next/link";

const SavedJobs = () => {
  const { removeLikedJob, likedJobs } = useLikedJobsStore();

  return (
    <div className="md:w-[90%] shadow-lg rounded-md mt-14 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Company </TableHead>
            <TableHead className="w-[250px]">Job Title</TableHead>
            <TableHead className="w-[150px]">Location</TableHead>
            <TableHead className="w-[150px]">Job mode</TableHead>
            <TableHead className="w-[150px]">Experience</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-scroll">
          {likedJobs?.map((job) => (
            <TableRow key={job?.id}>
              <TableCell className="font-medium">
                <Link
                  href={routes.description(job?.slug)}
                  className="text-deepBlue"
                >
                  {job?.company_name}
                </Link>
              </TableCell>
              <TableCell className="font-light">{job?.job_title}</TableCell>
              <TableCell className="font-light">
                {formatCurrency(job?.salary ?? 0)}
              </TableCell>
              <TableCell className="font-light">{job?.job_mode}</TableCell>
              <TableCell className="font-light">
                {job?.experience_level}
              </TableCell>
              <TableCell className="font-light">
                <Trash2
                  size={15}
                  color="red"
                  onClick={() => removeLikedJob(job.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SavedJobs;
