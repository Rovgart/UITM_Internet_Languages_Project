"use client";
import { Container, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import DashboardBookItem from "./DashboardBookItem";
import { cn } from "@/utils/cn";
import { useMutation } from "@tanstack/react-query";
import { fetchBook } from "@/api/actions";
import useDashboardStore from "@/store/dashboardStore";
import {
  booksOfFollowingAuthors,
  getPopularBooksUrl,
  topSellingBooksUrl,
} from "@/lib/urls";
import { getBooksAction } from "@/actions/fetch-bestsellers";

function DashboardBookList() {
  const { mutate } = useMutation({ mutationFn: fetchBook });
  const { currentTab } = useDashboardStore();

  const getQueryKey = () => {
    switch (currentTab) {
      case "popular":
        return ["books", "popular"];
      case "top_selling":
        return ["books", "top_selling"];
      case "following":
        return ["books", "following"];
      default:
        return ["books", "popular"];
    }
  };

  const getQueryFn = () => {
    switch (currentTab) {
      case "popular":
        return () => getBooksAction(getPopularBooksUrl);
      case "top_selling":
        return () => getBooksAction(topSellingBooksUrl);
      case "following":
        return () => getBooksAction(booksOfFollowingAuthors);
      default:
        return () => getBooksAction(getPopularBooksUrl);
    }
  };

  const {
    data: books,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: getQueryKey(),
    queryFn: getQueryFn(),
  });

  const previewBookHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const bookId = target.dataset.bookId;
    if (bookId) {
      mutate(bookId);
    }
  };

  return (
    <Container className={cn("col-span-full")}>
      <div
        onClick={previewBookHandler}
        className={cn(
          "grid",
          "grid-gap-4",
          "grid-cols-1",
          "sm:grid-cols-2",
          "md:grid-cols-2",
          "overflow-y-scroll",
          "h-[620px]"
        )}
      >
        {isFetching && isLoading ? (
          <Skeleton variant="rectangular" width={573} height={900} />
        ) : (
          books?.map((book) => (
            <DashboardBookItem
              key={book.id}
              id={book.id}
              title={book.title}
              image={book.img}
              author={book.author}
              categories={book.genre}
            />
          ))
        )}
      </div>
    </Container>
  );
}

export default DashboardBookList;
