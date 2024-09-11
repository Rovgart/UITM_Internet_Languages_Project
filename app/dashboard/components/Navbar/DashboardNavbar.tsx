"use client";
import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
function DashboardNavbar() {
  const [value, setValue] = useState(1);

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box>
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
    </Box>
  );
}

export default DashboardNavbar;
