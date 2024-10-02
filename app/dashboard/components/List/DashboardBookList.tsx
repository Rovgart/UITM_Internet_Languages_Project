"use client";
import { getBooks } from "@/lib/books";
import { Box } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import DashboardBookItem from "./DashboardBookItem";
import { fetchBestsellers } from "@/actions/fetch-bestsellers";
import { useRouter } from "next/navigation";
import { fetchBook } from "@/api/actions";

function DashboardBookList() {
  const { data: Books } = useQuery({
    queryKey: ["popular"],
    queryFn: () => fetchBestsellers(),
  });

  const { data, mutate } = useMutation({ mutationFn: fetchBook });
  const router = useRouter();
  const previewBookHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const bookId = target.dataset.bookId;
    if (bookId) {
      console.log("Selected book", bookId);
      router.push(`/dashboard/book/${bookId}`);
    }
  };
  return (
    <Box>
      {Books &&
        Books.map((book, index) => (
          <DashboardBookItem
            key={index}
            image={book.img}
            id={0}
            author={book.author}
            title={book.title}
          />
        ))}
    </Box>
  );
}

export default DashboardBookList;
