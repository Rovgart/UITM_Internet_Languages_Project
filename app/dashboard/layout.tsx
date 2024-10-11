"use client";
import React from "react";
import DashboardMenu from "./components/DashboardMenu";
import { ReactNode } from "@tanstack/react-router";
import { cn } from "@/utils/cn";
import Header from "./components/Header/Header";

function Layout({ children }: { children: ReactNode }) {
  return (
    <main
      className={cn(
        "grid",
        "grid-rows-4",
        "grid-cols-dashboard_layout",
        "grid-rows-dashboard_rows",
        "w-full"
      )}
    >
      <Header />
      <DashboardMenu />
      <article className="md:col-[2/-1] col-[1/-1] border-red-500">
        {children}
      </article>
    </main>
  );
}

export default Layout;
