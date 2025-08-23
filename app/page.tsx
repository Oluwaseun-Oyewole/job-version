import AllJobs from "@/components/Home";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <AllJobs />
      </Suspense>
    </main>
  );
}
