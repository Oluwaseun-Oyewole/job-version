import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { outfit } from "@/utils/fonts";
import { isServerTokenValid } from "@/utils/helper";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";
import "../globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isTokenExpired = await isServerTokenValid();
  if (!isTokenExpired) return redirect(routes.login);
  return (
    <>
      <Navigation />
      <div
        className={`h-[90vh] w-full grid grid-flow-col lg:grid-cols-[25%_75%] xl:grid-cols-[18%_82%] ${outfit.className}`}
      >
        <div className="hidden lg:block sticky top-0 left-0 right-0 bottom-0 bg-white overflow-hidden">
          <Sidebar />
        </div>
        <div className="overflow-y-scroll p-4 md:py-8 w-full">{children}</div>
      </div>
    </>
  );
}
