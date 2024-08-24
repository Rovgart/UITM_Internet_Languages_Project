import BookItem from "@/components/books/bookItem";
import Books from "@/components/books/Books";
import { cn } from "@/utils/cn";
import { Container } from "@mui/material";
import React from "react";
export default async function Home() {
  return (
    <main className={cn(" gap-6 p-4 grid grid-cols-bestseller_container ")}>
      <Books />
    </main>
  );
}
