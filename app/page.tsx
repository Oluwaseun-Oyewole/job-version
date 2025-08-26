import AllJobs from "@/components/Home";
import LoadingSpinner from "@/components/Loading";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<LoadingSpinner />}>
        <AllJobs />
      </Suspense>
    </main>
  );
}
