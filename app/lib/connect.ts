import { Collection, Db } from "mongodb";
import clientPromise from "./mongodb";

let db: Db;
export const getCollection = async (
  collectionName: string
): Promise<Collection> => {
  if (!db) {
    const client = await clientPromise;
    db = client.db("BookStore");
  }
  return db.collection(collectionName);
};
