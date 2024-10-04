"use client";
import { Box, Container, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import DashboardBookList from "../List/DashboardBookList";
import { useGetBooks } from "@/hooks/useGetBooks";
import { getBooks } from "@/lib/books";
import {
  getPopularBooksUrl,
  topSellingBooksUrl,
  trendingAuthorsUrl,
  booksOfFollowingAuthors,
} from "@/lib/urls";
import useDashboardStore from "@/store/dashboardStore";
function DashboardNavbar() {
  const { currentTab, setCurrentTab } = useDashboardStore();

  const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
    console.log(newValue);
    setCurrentTab(newValue);
  };
  return (
    <Container className="col-[2/3] row-[1/-1] border bg-white rounded-lg">
      <Tabs value={currentTab} onChange={handleTabChange} variant="standard">
        <Tab value={"popular"} label="Popular" />
        <Tab value={"top_selling"} label="Top selling" />
        <Tab value={"following"} label="Following" />
        <Tab value={"new_releases"} label="New releases" />
      </Tabs>
    </Container>
  );
}

export default DashboardNavbar;
