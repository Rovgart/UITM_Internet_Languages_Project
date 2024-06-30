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
      {/* <Color src={bookImage}>
        <div style={{ backgroundColor: data }}></div>
      </Color> */}
      <article className="flex flex-col sm:flex-row col-[2/3] gap-5 border border-slate-500">
        {/* Book Image */}
        <picture className="h-full self-center sm:self-start">
          <img
            className="w-full h-full object-cover"
            src={`${bookImage}`}
            alt="Book Cover"
          ></img>
        </picture>
        {/* Book Informations */}
        <aside className=" w-1/2 p-8 flex items flex-col gap-5 sm:gap-2 justify-around border border-slate-500 text-center sm:text-start">
          {/* Book Title */}
          <div>
            <h2 className="text-4xl font-robotoSzef">{bookTitle}</h2>
            {/* Book Author */}
            <p className="text-gray-400 text-2xl">{bookAuthor}</p>
          </div>
          {/* Book Rating */}
          <StarRating rating={bookRating} />
          {/* Book Description with Buttons */}
          <div className="flex flex-col gap-3">
            <blockquote>
              <p className="text-gray-600 text-sm leading-relaxed text-center sm:text-start">
                {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Veritatis consequatur ipsam illo, autem architecto officiis at
                expedita! Delectus vel porro quod dolorem vitae? Animi
                voluptatum sit modi numquam libero quidem? Quod, enim? */}
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
