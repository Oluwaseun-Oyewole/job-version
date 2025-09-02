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
      <main className="p-4 lg:px-12">{children}</main>
    </>
  );
}
