import { Collection, Db, ObjectId } from "mongodb";
import clientPromise from "./mongodb";
import { getCollection } from "./connect";
import { followingAuthorsT } from "@/types/types";

export async function getBooks() {
  try {
    const books = await getCollection("books");
    const result = await books.find().limit(20).toArray();
    return { movies: result };
  } catch (err: any) {
    console.error(err.message);
  }
}

export const getBooksCategories = async () => {
  try {
    const books = await getCollection("books");
    const genresCursor = books.find({}, { projection: { genre: 1, _id: 0 } });
    const genres = new Set();
    await genresCursor.forEach((doc) => {
      if (Array.isArray(doc.genre)) {
        doc.genre.forEach((g) => genres.add(g));
      } else if (doc.genre) {
        genres.add(doc.genre);
      }
    });

    const genreArray = Array.from(genres);
    console.log("All genres:", genreArray);
    return genreArray;
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};
export const getCategory = async (category: string) => {
  try {
    const books = await getCollection("books");
    const result = await books.find({ genre: category }).limit(20).toArray();
    return { movies: result };
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

export const getTopSellingBooks = async () => {
  try {
    // Connect to the database
    const books = await getCollection("books");

    // Query the books collection to find all books,
    // sort them by the number of reviews in descending order,
    // limit the result to 3 books, and convert the result to an array
    const result = await books
      .find({})
      .sort({ reviews: -1 })
      .limit(10)
      .toArray();

    return result; // Return the array of popular books
  } catch (error: any) {
    console.error("Error fetching popular books", error);
    throw new Error("Failed to fetch popular books", error);
  }
};
export const getBook = async (book_id: string) => {
  try {
    const books = await getCollection("books");
    const book = await books.findOne({ _id: new ObjectId(book_id) });
    console.log(book);
    return book;
  } catch (error: any) {
    console.error("Error fetching book", error);
    throw new Error("Failed to fetch book");
  }
};
export const getTopRated = async () => {
  try {
    const books = await getCollection("books");
    const newReleases = await books
      .find({})
      .sort({ rating: -1 })
      .limit(10)
      .toArray();
    console.log("Top rated books:", newReleases);
    return newReleases;
  } catch (error) {
    console.error("Error fetching top rated books", error);
  }
};
export const getBooksByFollowedAuthors = async (
  followedAuthors: followingAuthorsT[]
) => {
  try {
    const books = await getCollection("books");
    const followedBooks = await Promise.all(
      followedAuthors.map(async (author) => {
        const authorBooks = await books
          .find({ author: author.authorId })
          .toArray();
        return {
          author: author.authorName,
          books: authorBooks,
        };
      })
    );
    return followedBooks;
  } catch (error) {
    console.error("Error fetching books for followed authors", error);
    throw new Error("Failed to get books by followed authors");
  }
};
