"use client";
import React from "react";
import PreviewButton from "../buttons/PreviewButton";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { cn } from "@/utils/cn";
export type BookItemProps = {
  bookId: string;
  bookTitle: string;
  bookDescription: string;
  bookImage: string;
  bookAuthor: string;
  bookRating: number;
  bookGenres: string[];
  totalRatings: number;
};

const BookItem = ({
  bookId,
  bookTitle,
  bookImage,

  bookDescription,
}: BookItemProps) => {
  const getFirstSentence = (bookDesc: string) => {
    const firstSentenceEnd = bookDesc?.indexOf(".") + 1;
    if (firstSentenceEnd === 0) return bookDesc;
    const book = bookDesc?.substring(0, firstSentenceEnd);
    return book;
  };
  return (
    <Card
      sx={{ maxWidth: 345 }}
      className={cn("flex flex-col justify-between")}
    >
      <CardMedia sx={{ height: 140 }} image={bookImage} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {bookTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary" overflow={"hidden"}>
          {getFirstSentence(bookDescription)}
        </Typography>
      </CardContent>
      <CardActions className={cn("self-end ")}>
        <PreviewButton book_id={bookId} />
      </CardActions>
    </Card>
  );
};

export default BookItem;
