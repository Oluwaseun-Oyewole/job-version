"use client";
import LoadingSpinner from "@/components/Loading";
import SavedJobs from "@/components/SavedJobs";
import { Button } from "@/components/ui/button";
import { useLikedJobsStore } from "@/store/likedJobsStore";
import { routes } from "@/utils/routes";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";

const Notification = () => {
  const { isLoading, likedJobs } = useLikedJobsStore();
  const { push } = useRouter();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (likedJobs?.length > 0) {
    return (
      <div className="overflow-x-hidden max-w-5xl mx-auto">
        <Tabs
          defaultValue="saved-jobs"
          className="flex justify-between items-center flex-col"
        >
          <TabsContent
            value="saved-jobs"
            className="w-full flex flex-col items-center justify-center"
          >
            <SavedJobs />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="mt-10 bg-white h-[300px] lg:h-[320px] rounded-lg max-w-3xl mx-auto">
      <div className="flex items-center justify-center flex-col h-full">
        <Bell size={80} color="#537FE7" />
        <h3 className="font-extrabold pt-2">
          Nothing right now. Check back later
        </h3>
        <p className="w-[90%] md:w-[60%] font-[300] py-4 text-center text-sm md:text-base">
          This is where we notify you about your job applications and recent
          searches.
        </p>

        <Button
          className="bg-lightBlue hover:bg-deepBlue"
          onClick={() => push(routes.home)}
        >
          Find Jobs
        </Button>
      </div>
    </div>
  );
};

export default Notification;
