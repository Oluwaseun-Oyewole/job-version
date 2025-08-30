import AllJobs from "@/components/Home";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense fallback={<Spinner />}>
      <AllJobs />
    </Suspense>
  );
}
