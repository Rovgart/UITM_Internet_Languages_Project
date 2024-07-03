"use client";
import { TextField, useMediaQuery } from "@mui/material";
import React, { ReactEventHandler, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
const Search = ({ searchStateProp }: { searchStateProp: boolean }) => {
  const [query, setQuery] = useState("");
  const [inputStatus, setInputStatus] = useState({
    isTyping: false,
    isValid: false,
  });
  const [isOpened, setIsOpened] = useState(false);
  const onChangeSearch = (e: ReactEventHandler<HTMLInputElement>) => {
    setQuery(e.target.value);
    console.log(e.target.value);
  };
  const smScreen = useMediaQuery("(min-width: 640px)");
  const fetchBook = async (bookName: string) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ q: bookName }),
      };
      const response = await fetch(`http://localhost:3000/api/search`, options);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data ${response.status}: ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log(response);
      console.log(data);
      if (data) {
        return data;
      }
    } catch (error: any) {
      console.error(error);
      return null;
    }
  };
  const formValidator = () => {
    if (query.length === 0) {
      setInputStatus({
        isTyping: true,
        isValid: false,
      });
      return;
    } else {
      setInputStatus({
        isTyping: true,
        isValid: true,
      }); //
      console.log("Form is valid");
      return true;
    }
  };

  useEffect(() => {
    const init = setTimeout(async () => {
      const formValidatorResult = formValidator();
      if (formValidatorResult) {
        const encodedQuery = encodeURI(query);
        await fetchBook(query);
      }
    }, 500);
    return () => {
      console.log("Cleaned search");
      clearTimeout(init);
    };
  }, [query]);
  const { isTyping, isValid } = inputStatus;
  return (
    <form className="flex gap-4 " action={""}>
      <CiSearch
        onClick={() => setIsOpened((prev) => !prev)}
        className="sm:hidden"
        size={"3rem"}
      />

      <TextField
        className={` ${
          isOpened
            ? "absolute top-0 right-0 h-[12vh] w-screen z-[9999px]"
            : "hidden"
        } text-white bg-midnight_green-900`}
        variant="outlined"
        label="Search "
        type={"text"}
        name="search"
        value={query}
        onChange={(e) => onChangeSearch(e)}
      />
      {!isValid && !isTyping && <p>Please enter a search query</p>}
    </form>
  );
};

export default Search;
