import { Navigation } from "@/components/Navigation";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <main className="flex items-center justify-center p-4 lg:px-12">
        {children}
      </main>
    </>
  );
}
