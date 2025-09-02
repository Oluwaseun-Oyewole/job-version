import { sans } from "@/utils/fonts";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Provider from "./provider";

export const metadata: Metadata = {
  title: { default: "Jobber", template: "" },
  description: "A job platform",
  twitter: {
    card: "summary_large_image",
  },
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
          <main> {children}</main>
        </Provider>
      </body>
    </html>
  );
}
