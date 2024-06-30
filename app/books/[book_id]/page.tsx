import BookPreviewFooter from "@/components/books/BookPreviewFooter/BookPreviewFooter";
import BookPreviewLayout from "@/components/books/BookPreviewLayout/BookPreviewLayout";
import BookPreviewNav from "@/components/books/BookPreviewNav/BookPreviewNav";
import React from "react";

const Page = async ({ params }: { params: { book_id: string } }) => {
  const fetchBook = async (book_id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/get_book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ book_id }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Book data:", data);
        return data;
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const book = await fetchBook(params.book_id);
  console.log(book);

  return (
    <main className="bg-mint_cream-800 font-sans grid sm:grid-cols-book_preview_grid grid-cols-1 ">
      <BookPreviewNav />
      <BookPreviewLayout
        bookAuthor={book?.author}
        bookDescription={book?.desc}
        bookGenres={book?.genres}
        bookRating={book?.rating}
        bookTitle={book?.title}
        bookImage={book?.img}
      />
      <BookPreviewFooter />
    </main>
  );
};

export default Page;
