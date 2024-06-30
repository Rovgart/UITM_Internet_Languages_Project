import { Collection, Db } from "mongodb";
import clientPromise from "./mongodb";
let client;
let db: Db;
let movies: Collection;

export async function connect() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db("sample_mflix");
    movies = db.collection("movies");
  } catch (err: any) {
    console.error(err.message);
  }
}
(async () => {
  await connect();
})();

export async function getMovies() {
  try {
    await connect();
    const result = await movies.find().limit(20).toArray();
    return { movies: result };
  } catch (err: any) {
    console.error(err.message);
  }
}
