"use client";

import BookPreviewLayout from "@/components/books/BookPreviewLayout/BookPreviewLayout";
import { Skeleton } from "@mui/material";
import { useGetBook } from "@/hooks/useGetBook";
import React from "react";

const BookPreviewPage = ({ params }: { params: { _id: string } }) => {
  const { data: book, isFetching, isLoading } = useGetBook(params._id);
  return (
    <>
      {isFetching || isLoading ? (
        <div className="flex justify-center items-center w-full h-full ">
          <div className="flex flex-col sm:flex-row w-full h-[600px] max-w-[1000px] border rounded-lg shadow-lg bg-white">
            {/* Skeleton for Image */}
            <Skeleton
              variant="rectangular"
              width={415}
              height={600}
              className="rounded-t-lg sm:rounded-l-lg"
            />

            {/* Skeleton for Content */}
            <div className="sm:w-1/2 w-full p-8  flex flex-col justify-between ">
              <div className="flex flex-col ">
                {/* Skeleton for Title */}
                <Skeleton
                  variant="text"
                  width="60%"
                  height={70}
                  className="text-4xl font-robotoSzef"
                />

                {/* Skeleton for Author */}
                <Skeleton
                  variant="text"
                  width="40%"
                  height={40}
                  className="text-gray-400 text-2xl"
                />
              </div>
              {/* Skeleton for Description */}
              <div className="flex flex-col gap-3 h-[300px] overflow-y-scroll">
                <Skeleton
                  variant="text"
                  width="90%"
                  height={20}
                  className="text-gray-600"
                />
                <Skeleton
                  variant="text"
                  width="80%"
                  height={20}
                  className="text-gray-600"
                />
                <Skeleton
                  variant="text"
                  width="85%"
                  height={20}
                  className="text-gray-600"
                />
                <Skeleton
                  variant="text"
                  width="70%"
                  height={20}
                  className="text-gray-600"
                />
              </div>

              {/* Skeleton for Buttons */}
              <div className="flex justify-center mt-4">
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={40}
                  className="rounded-lg"
                />
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={40}
                  className="rounded-lg ml-4"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <BookPreviewLayout
          bookId={book?._id}
          bookTitle={book?.title}
          bookDescription={book?.desc}
          bookImage={book?.img}
          bookAuthor={book?.author}
          bookRating={book?.rating}
          totalRatings={book?.totalratings}
          bookGenres={book?.genre}
        />
      )}
    </>
  );
};

export default BookPreviewPage;
