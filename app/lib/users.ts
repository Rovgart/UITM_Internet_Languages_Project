import { Collection, Db, ObjectId } from "mongodb";
import clientPromise from "./mongodb";

let db: Db;
let client;
let users: Collection;
export const connect = async () => {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db("BookStore");
    users = db.collection("users");
  } catch (error: any) {
    console.error(error?.message);
  }
};
async () => {
  await connect();
};

export const getUser = async (user_id: string) => {
  try {
    await connect();
    const user = await users.findOne({ _id: new ObjectId(user_id) });
    return user;
  } catch (error: any) {
    console.error(error?.message);
  }
};
