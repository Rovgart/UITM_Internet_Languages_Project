import { Collection, Db, ObjectId } from "mongodb";
import clientPromise from "./mongodb";
let client;
let db: Db;
let books: Collection;

export async function connect() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db("BookStore");
    books = db.collection("books");
  } catch (err: any) {
    console.error(err.message);
  }
}
(async () => {
  await connect();
})();

export async function getBooks() {
  try {
    await connect();
    const result = await books.find().limit(20).toArray();
    return { movies: result };
  } catch (err: any) {
    console.error(err.message);
  }
}

export const getBooksCategories = async () => {
  try {
    await connect();
    const genresCursor = await books.find(
      {},
      { projection: { genre: 1, _id: 0 } }
    );
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
    await connect();
    const result = await books.find({ genre: category }).limit(20).toArray();
    return { movies: result };
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

export const getMostPopularBooks = async () => {
  try {
    // Connect to the database
    await connect();

    // Query the books collection to find all books,
    // sort them by the number of reviews in descending order,
    // limit the result to 3 books, and convert the result to an array
    const result = await books
      .find({})
      .sort({ reviews: -1 })
      .limit(3)
      .toArray();

    return result; // Return the array of popular books
  } catch (error) {
    console.error("Error fetching popular books", error);
    throw new Error("Failed to fetch popular books");
  }
};
export const getBook = async (book_id: string) => {
  try {
    await connect();
    const book = await books.findOne({ _id: new ObjectId(book_id) });
    return book;
  } catch (error: any) {
    console.error("Error fetching book", error);
    throw new Error("Failed to fetch book");
  }
};
