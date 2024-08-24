import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from "../lib/mongodb";
export async function connect(
  db: Db,
  client: MongoClient,
  collectionName: string,
  databaseName: string
) {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db(databaseName);
    collectionName = db.collection(collectionName);
  } catch (err: any) {
    console.error(err.message);
  }
}
