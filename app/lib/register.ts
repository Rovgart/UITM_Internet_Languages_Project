import { RegisterResponse } from "@/types/types";
import { Collection, Db } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "./mongodb";
import bcrypt from "bcrypt";
let db: Db;
let users: Collection;
let client;
export async function connect() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db("BookStore");
    users = db.collection("users");
  } catch (err: any) {
    console.error(err.message);
  }
}
(async () => {
  await connect();
})();
export const registerUserToDatabase = async (
  email: string,
  password: string
) => {
  await connect();
  const userCollection = db.collection("users");
  const user = { email, password };

  if (!user.email || !user.password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "That email is already registered" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      hashedPassword,
      createdAt: new Date(),
    };

    const UserSendToDb = await userCollection.insertOne(newUser);
    return NextResponse.json(UserSendToDb, { status: 200 });
  } catch (error: any) {
    console.error(error?.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
