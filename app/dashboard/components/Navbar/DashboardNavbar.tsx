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
    <Container className="col-[2/3] row-[1/-1] border  rounded-lg">
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="scrollable"
        indicatorColor="secondary"
      >
        <Tab value={"popular"} label="Popular" />
        <Tab value={"top_selling"} label="Top selling" />
        <Tab value={"top_rated"} label="Top rated" />
        <Tab value={"following"} label="Following" />
      </Tabs>
    </Container>
  );
}

export default DashboardNavbar;
