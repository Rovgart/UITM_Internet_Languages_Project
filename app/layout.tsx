import type { Metadata } from "next";
import { Lato } from "next/font/google";
import CookiePopUp from "./components/Cookie/CookiePopUp";
import Header from "./components/header";
import "./globals.css";
import { cn } from "./utils/cn";

const lato = Lato({ subsets: ["latin"], weight: "400" });
export const metadata: Metadata = {
  title: "Bookjourney",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <CookiePopUp></CookiePopUp>
      </body>
    </html>
  );
}
