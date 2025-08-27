import { Navigation } from "@/components/Navigation";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { sans } from "../utils/fonts";
import "./globals.css";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "Jobber",
  description: "A job platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.className} bg-gray-100`}>
        <Toaster position="top-center" />
        <Provider>
          <Navigation />
          <main> {children}</main>
        </Provider>
      </body>
    </html>
  );
}
