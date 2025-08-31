import { Sidebar } from "@/components/Sidebar";
import { outfit } from "@/utils/fonts";
import { isServerTokenValid } from "@/utils/helper";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isTokenExpired = await isServerTokenValid();
  if (!isTokenExpired) return redirect(routes.login);
  return (
    <div className="overflow-hidden h-screen">
      <main
        className={`w-full grid grid-flow-col grid-cols-[100%] lg:grid-cols-[25%_75%] xl:grid-cols-[18%_82%] ${outfit.className}bg-white`}
      >
        <div className="hidden lg:block sticky top-0 left-0 h-screen bg-white overflow-hidden">
          <Sidebar />
        </div>
        <div className="overflow-y-scroll bg-gray-100 md:m-10 min-h-[50vh]">
          {children}
        </div>
      </main>
    </div>
  );
}
