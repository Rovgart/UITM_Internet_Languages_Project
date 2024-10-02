"use client";
import BookItem from "@/components/books/bookItem";
import { fetchBookPreview } from "@/utils/actions/book-preview";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  const { data: book } = useQuery({
    queryKey: ["book", params.slug],
    queryFn: () => fetchBookPreview(params.slug),
  });
  return (
    <div>
      <BookItem bookAuthor={book?.author} bookDescription={book?.description} />
    </div>
  );
};

export default page;
