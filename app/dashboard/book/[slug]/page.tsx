"use client";
import BookItem from "@/components/books/bookItem";
import { fetchBookPreview } from "@/utils/actions/book-preview";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  const { data } = useQuery({
    queryKey: ["book", params.slug],
    queryFn: () => fetchBookPreview(params.slug),
  });
  return <div>{params.slug}</div>;
};

export default page;
