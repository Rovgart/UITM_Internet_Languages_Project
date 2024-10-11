"use server";
import React from "react";
import DashboardNavbar from "./components/Navbar/DashboardNavbar";
import { cn } from "@/utils/cn";
import { Container } from "@mui/material";


import TrendingAuthorsCard from "./components/Header/TrendingAuthor/TrendingAuthorsCard";
import DashboardBookList from "./components/List/DashboardBookList";
function Dashboard() {
  return (
    <>
      <DashboardNavbar />
      <Container
        className={cn(`
        border 
        p-4 
        bg-white
        grid
        grid-cols-1
        md:grid-cols-2
        `)}
      >
        <DashboardBookList />
        <TrendingAuthorsCard />
      </Container>
    </>
  );
}

export default Dashboard;
