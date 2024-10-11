"use client";
import React from "react";

import TrendingAuthorFollow from "./TrendingAuthorFollow";
import { fetchTrendingAuthors } from "@/utils/actions/authors/trending-authors";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";

function TrendingAuthorsCard() {
  const { data: TrendingAuthors, isFetching } = useQuery({
    queryKey: ["trendingAuthors"],
    queryFn: () => fetchTrendingAuthors(),
  });

  return (
    <section className="flex flex-col border col-[3/4] row-[1/2] p-6">
      {isFetching
        ? Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              animation="wave"
              width={200}
              height={50}
              style={{ marginBottom: "1rem" }}
            />
          ))
        : TrendingAuthors?.map((trendingAuthor, index) => (
            <TrendingAuthorFollow
              key={index}
              authorName={trendingAuthor.authorName}
            />
          ))}
    </section>
  );
}

export default TrendingAuthorsCard;
