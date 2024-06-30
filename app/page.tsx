import RootLayout from "./layout";
import BookItem from "./components/books/bookItem";
import { BestsellersResponse, Book } from "./types/types";
const fetchBestsellers = async (): Promise<BestsellersResponse[]> => {
  try {
    const res = await fetch("http://localhost:3000/api/popularbooks", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data ${res.status}: ${res.statusText}`);
    }
    const data: Book[] = await res.json();
    console.log(data);
    if (data) {
      const bestsellers = data.map((book) => {
        const genreArr = book.genre.split(",");
        console.log(book);
        console.log(book.genre);
        console.log(book.author);
        console.log(genreArr);
        const bestsellersObj = {
          id: book._id,
          title: book.title,
          description: book.desc,
          img: book.img,
          genre: genreArr.slice(0, 3),
          author: book.author,
          rating: book.rating,
        };
        return bestsellersObj;
      });
      console.log(bestsellers[0].genre.slice(0, 3));
      return bestsellers;
    }
  } catch (error) {
    console.error(error);
  }
};
export default async function Home() {
  const Bestsellers = await fetchBestsellers();
  return (
    <main className="grid sm:p-8 sm:place-self-center sm:grid-cols-bestseller_grid grid-cols-1 gap-16 grid-flow-row auto-cols-[50px]  ">
      {Bestsellers.map((book) => (
        <BookItem
          bookId={book.id}
          key={book.id}
          bookTitle={book.title}
          bookDescription={book.description}
          bookImage={book.img}
          bookGenres={book.genre}
          bookAuthor={book.author}
          bookRating={book.rating}
        />
      ))}
    </main>
  );
}
