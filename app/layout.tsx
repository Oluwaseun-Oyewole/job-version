import { sans } from "@/utils/fonts";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
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
      <body className={`${sans.className} bg-gray-200`}>
        <Toaster position="top-center" />
        <Provider>
          <main> {children}</main>
        </Provider>
      </body>
    </html>
  );
}
