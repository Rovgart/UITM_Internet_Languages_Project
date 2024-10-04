"use server";
import React, { useEffect } from "react";
import DashboardNavbar from "./components/Navbar/DashboardNavbar";
import { cn } from "@/utils/cn";
import { Container } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { fetchTrendingAuthors } from "@/utils/actions/authors/trending-authors";

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
