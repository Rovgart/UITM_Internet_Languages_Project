"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../assets/book_preview.png";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardMenu from "./components/DashboardMenu";
import { useMediaQuery } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { ReactNode } from "@tanstack/react-router";
import { cn } from "@/utils/cn";
import Header from "./components/Header/Header";

function Layout({ children }: { children: ReactNode }) {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenClose = () => {
    setOpenMenu((prev) => !prev);
  };
  const matches = useMediaQuery("(min-width:768px)");
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
