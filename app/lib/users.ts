import { Collection, Db } from "mongodb";
import clientPromise from "./mongodb";
import { getSession } from "./lib";
import { user } from "@nextui-org/react";

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

export const getUser = async () => {
  try {
    await connect();
    const userId = await getSession();
    if (!userId) return null;
    console.log(userId);
    return userId;
  } catch (error: any) {
    console.error(error?.message);
  }
};
