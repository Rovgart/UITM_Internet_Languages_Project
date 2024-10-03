"use client";
import { getBooks } from "@/lib/books";

import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import DashboardBookItem from "./DashboardBookItem";
import { fetchBestsellers } from "@/actions/fetch-bestsellers";
import { cn } from "@/utils/cn";
import { useMutation } from "@tanstack/react-query";
import { fetchBook } from "@/api/actions";
import { useRouter } from "next/navigation";

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
    const { data, mutate } = useMutation({ mutationFn: fetchBook });
    const router = useRouter();
    return (
      <Container className={cn("col-span-full ")}>
        <div
          onClick={previewBookHandler}
          className={cn(
            "grid",
            "grid-gap-4",
            "grid-cols-1",
            "sm:grid-cols-2",
            "md:grid-cols-5"
          )}
        >
          {Books?.map((book, index) => (
            <DashboardBookItem
              id={book.id}
              title={book.title}
              image={book.img}
              author={book.author}
            />
          ))}
        </div>
      </Container>
    );
  };
}

export default DashboardBookList;
