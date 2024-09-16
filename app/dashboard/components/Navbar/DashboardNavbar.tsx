"use client";
import { Box, Container, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import DashboardBookList from "../List/DashboardBookList";
function DashboardNavbar() {
  const [value, setValue] = useState(1);

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Container className="col-[2/3] row-[1/-1] border bg-white rounded-lg">
      <Tabs
        value={value}
        onChange={handleTabChange}
        className=""
        variant="standard"
      >
        <Tab value={"popular"} label="Popular" />
        <Tab value={"top_selling"} label="Top selling" />
        <Tab value={"following"} label="Following" />
        <Tab value={"new_releases"} label="New releases" />
      </Tabs>
      <DashboardBookList />
    </Container>
  );
}

export default DashboardNavbar;
