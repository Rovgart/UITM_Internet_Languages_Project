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
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
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
