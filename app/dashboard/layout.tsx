import { Sidebar } from "@/components/Sidebar";
import { outfit } from "@/utils/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-hidden h-screen">
      <main
        className={`w-full grid grid-flow-col grid-cols-[100%] lg:grid-cols-[25%_75%] xl:grid-cols-[18%_82%] ${outfit.className}bg-white`}
      >
        <div className="hidden lg:block sticky top-0 left-0  bg-white overflow-hidden">
          <Sidebar />
        </div>
        <div className="overflow-y-scroll bg-gray-100 md:m-10 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
