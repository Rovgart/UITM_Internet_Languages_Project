import React from "react";
import Books from "@/components/books/Books";
import { cn } from "@/utils/cn";

type Props = {};

const page = () => {
  return (
    <main
      className={cn(" gap-6 p-4 grid grid-cols-bestseller_container ")}
    ></main>
  );
};

export default page;
