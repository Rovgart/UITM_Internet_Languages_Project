"use client";
import React, { useState, useEffect } from "react";
import { TextField, useMediaQuery } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import SearchResult from "./searchResult";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { fetchBook } from "@/api/actions";

const SearchForm = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [inputStatus, setInputStatus] = useState({
    isTyping: false,
    isValid: false,
  });
  const searchParams = useSearchParams();
  const [isOpened, setIsOpened] = useState(false);
  const [query, setQuery] = useState("");
  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    const params = new URLSearchParams(searchParams);
    setQuery(term);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    console.log(searchParams.get("q"));
    replace(`${pathname}?${params.toString()}`);
  };

  const smScreen = useMediaQuery("(min-width: 640px)");

  const formValidator = () => {
    if (query.length === 0) {
      setInputStatus({
        isTyping: true,
        isValid: false,
      });
      return false;
    } else {
      setInputStatus({
        isTyping: true,
        isValid: true,
      });
      return true;
    }
  };

  useEffect(() => {
    const init = setTimeout(async () => {
      const formValidatorResult = formValidator();
      if (formValidatorResult) {
        const encodedQuery = encodeURI(searchQuery as string);
        // Fetch data in the client component and update state
        const res = await fetch(`/api/search?q=${encodedQuery}`, {
          headers: { "Content-Type": "application/json" },
          method: "GET",
          body: JSON.stringify({
            query: query,
          }),
        });
        const data = await res.json();
        console.log(data);
      }
      console.log(searchParams);
    }, 500);
    return () => {
      clearTimeout(init);
    };
  }, [query]);

  return (
    <form className="flex gap-4" action="">
      <CiSearch
        onClick={() => setIsOpened((prev) => !prev)}
        className="sm:hidden"
        size={"3rem"}
      />
      <TextField
        className={`${
          isOpened
            ? "absolute top-0 right-0 sm:h-[12vh] h-screen w-screen z-[9999px]"
            : "hidden"
        } text-white bg-midnight_green-900`}
        variant="outlined"
        label="Search"
        type="text"
        name="search"
        value={query}
        onChange={(e) => onChangeSearch(e)}
      />
    </form>
  );
};

export default SearchForm;
