"use client";
import { getBooks } from "@/lib/books";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import DashboardBookItem from "./DashboardBookItem";
import { fetchBestsellers } from "@/actions/fetch-bestsellers";

function DashboardBookList() {
  const { data: Books } = useQuery({
    queryKey: ["popular"],
    queryFn: () => fetchBestsellers(),
  });
  return (
    <Box>
      {Books &&
        Books.map((book, index) => (
          <DashboardBookItem key={index} image={book.img} />
        ))}
    </Box>
  );
}

export default DashboardBookList;
