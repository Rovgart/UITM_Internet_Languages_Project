"use client";
import React, { useEffect } from "react";
import DashboardNavbar from "./components/Navbar/DashboardNavbar";
import { cn } from "@/utils/cn";
import { Container } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { fetchTrendingAuthors } from "@/utils/actions/authors/trending-authors";

import TrendingAuthorsCard from "./components/Header/TrendingAuthor/TrendingAuthorsCard";
function Dashboard() {
  const { data: TrendingAuthors } = useQuery({
    queryKey: ["trendingAuthors"],
    queryFn: () => fetchTrendingAuthors(),
  });
  useEffect(() => {
    console.log(TrendingAuthors);
  }, [TrendingAuthors]);
  return (
    <Container className="border flex md:flex-row flex-col   p-4 bg-gray-50 ">
      <DashboardNavbar />
      <TrendingAuthorsCard trendingAuthors={TrendingAuthors} />
    </Container>
  );
}

export default Dashboard;
