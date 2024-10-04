"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import CategoryChipList from "../Chip/CategoryChipList";
import { useQuery } from "@tanstack/react-query";
import { useGetBooks } from "@/hooks/useGetBooks";

const DashboardBookItem = ({
  id,
  title,
  image,
  author,
  categories,
}: {
  id: string;
  title: string;
  image: string;
  author: string;
  categories: string[];
}) => {
  return (
    <div
      data-book-id={id}
      className="flex flex-col w-full max-w-[340px] gap-2 border p-4 mx-auto sm:items-center"
    >
      <div className="w-full aspect-square relative">
        <Button className="w-full h-full">
          <Image
            fill
            src={image}
            alt={title}
            className="object-cover cursor-pointer"
          />
        </Button>
      </div>
      <div className="w-full max-w-[240px]">
        <h1 className="truncate text-lg font-semibold">{title}</h1>
        <span className="truncate text-gray-400 block">{author}</span>
      </div>
      <CategoryChipList categories={categories} />
    </div>
  );
};

export default DashboardBookItem;
