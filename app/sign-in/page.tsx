import React from "react";
import LogForm from "../components/SignInForm/LogForm";
import Image from "next/image";
import booksvg from "@/assets/books-svgrepo-com.svg";
const Page = () => {
  return (
    <article className="w-screen h-screen flex  items-center bg-midnight_green-900">
      <aside className="h-full w-full flex border border-red-500 flex-col items-center bg-tea_green-700">
        <div className="flex flex-col gap-4 w-3/4 items-center">
          <Image
            className="size-[500px] mx-auto border"
            src={booksvg}
            alt="books.svg"
          />
          <h1 className="md:text-2xl font-semibold">
            Journey through world of books
          </h1>
          <span className="text-center text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            aspernatur suscipit culpa repellat? Quisquam corporis asperiores
            exercitationem delectus porro iste consectetur, ex soluta eaque
            adipisci quis odio ut labore iusto perspiciatis praesentium.
          </span>
        </div>
      </aside>
      <LogForm />
    </article>
  );
};

export default Page;
