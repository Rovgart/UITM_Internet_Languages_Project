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
  getTopRatedBooksUrl,
  topSellingBooksUrl,
} from "@/lib/urls";
import { getBooksAction } from "@/actions/fetch-bestsellers";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function DashboardBookList() {
  const { currentTab } = useDashboardStore();
  const pathname = usePathname();
  const router = useRouter();

  const getQueryKey = () => {
    switch (currentTab) {
      case "popular":
        return ["books", "popular"];
      case "top_selling":
        return ["books", "top_selling"];
      case "top_rated":
        return ["books", "top_rated"];
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
      case "top_rated":
        return () => getBooksAction(getTopRatedBooksUrl);
      case "following":
        return () => getBooksAction(booksOfFollowingAuthors);
      default:
        return () => getBooksAction(getPopularBooksUrl); // Default to top selling if currentTab is not valid
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
    console.log(target);
    if (bookId) {
      router.push(pathname + `/book/${bookId}`);
    }
  };
  if (books?.length === 0 || !books) {
    return (
      <div className="flex items-center justify-center  col-[1/-1] text-gray-400 w-full h-full">
        No books available{" "}
      </div>
    );
  }
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
          "h-[620px]",
          "w-full",
          "gap-4"
        )}
      >
        {isFetching && isLoading ? (
          <div className="w-full h-full col-[1/-1] flex justify-center">
            <Skeleton variant="rectangular" width="90%" height={600} />
          </div>
        ) : (
          books?.map((book) => (
            <DashboardBookItem
              key={book.id}
              id={book.id}
              title={book.title}
              image={book.img}
              author={book.author}
              categories={book.genre}
              rating={book.rating}
              totalRatings={book?.totalratings}
            />
          ))
        )}
      </div>
    </Container>
  );
}

export default DashboardBookList;
