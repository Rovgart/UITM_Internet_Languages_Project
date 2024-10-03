import React from "react";

import TrendingAuthorFollow from "./TrendingAuthorFollow";
import { TrendingAuthorsT } from "@/types/types";

function TrendingAuthorsCard({
  trendingAuthors,
}: {
  trendingAuthors: TrendingAuthorsT[];
}) {
  return (
    <section className="flex flex-col border col-[3/4] row-[1/2] p-6">
      {trendingAuthors &&
        trendingAuthors?.map((trendingAuthor, index) => (
          <TrendingAuthorFollow
            key={index}
            authorName={trendingAuthor.authorName}
          />
        ))}
    </section>
  );
}

export default TrendingAuthorsCard;
