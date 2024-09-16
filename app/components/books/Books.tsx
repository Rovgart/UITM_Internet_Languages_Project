import React from "react";

import { fetchBestsellers } from "@/actions/fetch-bestsellers";
import { Container } from "@mui/material";
import { cn } from "@/utils/cn";
import BookItem from "./bookItem";
BookItem;
type Props = {};

async function Books() {
  const Bestsellers = await fetchBestsellers();

  return (
    <>
      <Container className={cn("w-full flex col-[1/-1]")}>
        {Bestsellers.map((book) => (
          <BookItem
            bookId={book.id}
            key={book.id}
            bookTitle={book.title}
            bookDescription={book.description}
            bookImage={book.img}
            bookGenres={book.genre}
            bookAuthor={book.author}
            bookRating={book.rating}
          />
        ))}
      </Container>
    </>
  );
}

export default Books;
