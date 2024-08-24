import React from "react";

import { fetchBestsellers } from "@/actions/fetch-bestsellers";
import BookItem from "./bookItem";
import { Container } from "@mui/material";
import { cn } from "@/utils/cn";
type Props = {};

async function Books({}: Props) {
  const Bestsellers = await fetchBestsellers();

  return (
    <>
      <Container className="grid md:col-[2/3] col-[1/-1] md:grid-cols-2 gap-4">
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
