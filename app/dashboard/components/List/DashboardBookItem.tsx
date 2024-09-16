"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";

const DashboardBookItem = ({
  id,
  image,
  author,
  title,
}: {
  id: string;
  image: string;
  author: string;
  title: string;
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
    </div>
  );
};

export default DashboardBookItem;
