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
        <div className="overflow-y-scroll bg-gray-100 my-5 md:my-10 px-6 md:px-0 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
