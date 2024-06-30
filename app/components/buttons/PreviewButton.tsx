"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const PreviewButton = ({ book_id }: { book_id: string }) => {
  return (
    <>
      <Link href={`/books/${book_id}`}>
        <Button className="bg-midnight_green-500 w-full " variant="contained">
          Preview
        </Button>
      </Link>
    </>
  );
};

export default PreviewButton;
