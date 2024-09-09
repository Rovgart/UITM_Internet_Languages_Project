import { TextField, useMediaQuery } from "@mui/material";
import React, { ReactEventHandler } from "react";
import { CiSearch } from "react-icons/ci";
import SearchForm from "./searchForm";
import SearchResult from "./searchResult";
const Search = ({
  searchStateProp,
  searchParamsProps,
}: {
  searchStateProp: boolean;
  searchParamsProps: { query?: string; page?: string };
}) => {
  const smScreen = useMediaQuery("(min-width: 640px)");

  return (
    <form className="flex gap-4 " action={""}>
      <SearchForm />
    </form>
  );
};

export default Search;
