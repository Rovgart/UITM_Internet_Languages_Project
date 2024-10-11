"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import CategoryChipList from "../Chip/CategoryChipList";
import { useMutation } from "@tanstack/react-query";
import StarRating from "@/components/StarRating/StarRating";
import MarkAsReadButton from "../Buttons/MarkAsReadButton";
import { updateBookStatus } from "@/utils/actions/books/update-book-status";
import toast from "react-hot-toast";

const DashboardBookItem = ({
  id,
  title,
  image,
  author,
  categories,
  rating,
  totalRatings,
}: {
  id: string;
  title: string;
  image: string;
  author: string;
  categories: string[];
  rating: number;
  totalRatings: number;
}) => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationKey: ["book", id],
    mutationFn: () => updateBookStatus(id),
    onSuccess: () => {
      toast.success("Book marked as read");
    },
  });
  const handleUpdateStatus = () => {
    mutate(id);
  };
  return (
    <div className="flex  flex-col w-full bg-background-default rounded-xl shadow-sm shadow-primary-main max-w-[340px] gap-2 border p-4 mx-auto sm:items-center relative">
      <div className="w-full aspect-square relative border">
        {!image ? (
          <span className="text-sm text-gray-400">Missing Image</span>
        ) : (
          <Button className="w-full h-full">
            <Image
              fill
              src={image}
              alt={title}
              data-book-id={id}
              className="object-cover cursor-pointer"
            />
          </Button>
        )}
      </div>
      <div className="w-full max-w-[240px]">
        <h1 className="truncate text-lg font-semibold">{title}</h1>
        <span className="truncate text-gray-400 block">{author}</span>
      </div>
      <div className="flex flex-col justify-between gap-2 h-full">
        <CategoryChipList categories={categories} />
        <StarRating rating={rating} totalRatings={totalRatings} />
      </div>
      <MarkAsReadButton
        handleReadClick={handleUpdateStatus}
        isPending={isPending}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default DashboardBookItem;
