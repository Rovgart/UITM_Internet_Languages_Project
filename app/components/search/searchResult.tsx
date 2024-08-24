import { fetchBook } from "@/api/actions";
import { Book } from "@/types/types";
import React from "react";
import PreviewButton from "../buttons/PreviewButton";
import StarRating from "../StarRating/StarRating";

type Props = {};

const SearchResult = async ({ query }: { query: string }) => {
  const books: Book[] = await fetchBook(query);
  return (
    <ul>
      {/* render search results */}
      {books.map((book) => (
        <li className="flex items-center">
          <div className="flex flex-col">
            <h2>{book.title}</h2>
            <span>{book.author}</span>
            <StarRating rating={book.rating} />
          </div>
          {/* Preview Button */}
          <PreviewButton book_id={book._id} />
        </li>
      ))}
    </ul>
  );
};

export default SearchResult;
