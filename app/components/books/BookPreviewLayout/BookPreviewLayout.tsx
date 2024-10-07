import StarRating from "@/components/StarRating/StarRating";
import useColor, { Color } from "color-thief-react";
import Image from "next/image";
import React from "react";
import SampleCover from "../../../assets/enceladus.avif";
import { BookItemProps } from "../bookItem";
import BookPreviewButtons from "../BookPreviewButtons/BookPreviewButtons";
const BookPreviewLayout = ({
  bookTitle,
  bookAuthor,
  bookRating,
  bookImage,
  bookDescription,
}: BookItemProps) => {
  return (
    <>
      <article className="flex  justify-center w-full h-full border-red-500">
        <picture>
          <Image width={400} height={600} src={bookImage} alt={bookTitle} />
        </picture>
        <aside className=" sm:w-1/2 w-full p-8 flex items flex-col gap-5 justify-around border  text-center sm:text-start">
          <div>
            <h2 className="text-4xl font-robotoSzef">{bookTitle}</h2>
            <p className="text-gray-400 text-2xl">{bookAuthor}</p>
          </div>
          <StarRating rating={bookRating} />
          <div className="flex flex-col gap-3 h-[300px] overflow-y-scroll">
            <blockquote>
              <p className="text-gray-600 text-sm leading-relaxed text-center sm:text-start">
                {bookDescription}
              </p>
            </blockquote>
          </div>
          <BookPreviewButtons />
        </aside>
      </article>
    </>
  );
};

export default BookPreviewLayout;
