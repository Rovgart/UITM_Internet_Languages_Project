import StarRating from "@/components/StarRating/StarRating";
import Image from "next/image";
import React from "react";
import { BookItemProps } from "../bookItem";
import BookPreviewButtons from "../BookPreviewButtons/BookPreviewButtons";

const BookPreviewLayout = ({
  bookTitle,
  bookAuthor,
  bookRating,
  totalRatings,
  bookImage,
  bookDescription,
}: BookItemProps) => {
  return (
    <>
      <article className="flex md:flex-row flex-col justify-center w-full h-[570px]">
        <picture className="">
          {bookImage !== undefined ? (
            <Image width={374} height={300} src={bookImage} alt={bookImage} />
          ) : (
            <div className="text-pretty text-xl flex w-full h-full justify-center items-center">
              Missing image
            </div>
          )}
        </picture>
        <aside className="sm:w-1/2 w-full p-8 flex flex-col gap-5 justify-around border text-center sm:text-start bg-background-default">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-robotoSzef">{bookTitle}</h2>
            <p className="text-gray-400 text-xl w-full">{bookAuthor}</p>
          </div>
          <div className="flex flex-col gap-3 h-[300px] overflow-y-scroll">
            <blockquote>
              <p className="text-gray-600 text-sm leading-relaxed text-center sm:text-start">
                {bookDescription}
              </p>
            </blockquote>
          </div>
          <StarRating rating={bookRating} totalRatings={totalRatings} />
          <BookPreviewButtons />
        </aside>
      </article>
    </>
  );
};

export default BookPreviewLayout;
