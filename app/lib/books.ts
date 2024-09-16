import { Collection, Db, ObjectId } from "mongodb";
import clientPromise from "./mongodb";
import { getCollection } from "./connect";

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

export const getMostPopularBooks = async () => {
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
    return book;
  } catch (error: any) {
    console.error("Error fetching book", error);
    throw new Error("Failed to fetch book");
  }
};
