"use client";
import React from "react";
import StarRating from "../StarRating/StarRating";
import { Roboto_Mono } from "next/font/google";
import PreviewButton from "../buttons/PreviewButton";
export type BookItemProps = {
  bookId: string;
  bookTitle: string;
  bookDescription: string;
  bookImage: string;
  bookAuthor: string;
  bookPrice: number;
  bookRating: number;
  bookGenres: string[];
};

const BookItem = ({
  bookId,
  bookTitle,
  bookImage,
  bookAuthor,
  bookRating,
  bookGenres,
}: BookItemProps) => {
  // const price = `${bookPrice.toFixed(2)} zl`;
  return (
    <div
      className={` flex p-8 bg-robin_egg_blue-800 flex-col gap-4 items-center justify-center shadow-xl shadow-midnight_green-100`}
    >
      {/* Book Picture */}
      <picture className="size-1/2">
        <img className="size-full" src={bookImage} alt="" />
      </picture>
      {/* Book Title */}
      <div>
        <h1 className=" text-3xl font-bold text-center">{bookTitle}</h1>
      </div>
      {/* Book author */}
      <div>
        <span className="font-bold">{bookAuthor}</span>
      </div>
      {/* Book description */}
      <div className="flex flex-col items-center gap-6">
        <ul className="flex gap-2">
          {bookGenres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
        {/* Book price */}
        <StarRating rating={bookRating} />
        {/* Preview Button */}
        <PreviewButton book_id={bookId} />
      </div>
    </div>
  );
};

export default BookItem;
