import { Input, InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const DashboardSearch = () => {
  return (
    <Input
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      className="p-3"
      placeholder="Search"
      type="text"
    ></Input>
  );
};

export default DashboardSearch;
