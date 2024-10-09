"use server";
import { serialize } from "cookie";
import { jwtDecrypt, JWTPayload, jwtVerify, SignJWT } from "jose";
import { KeyLike } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Collection, Db, ObjectId } from "mongodb";
import clientPromise from "./mongodb";
import { compare } from "bcrypt";
import bcrypt from "bcrypt";

let client;
let db: Db;
let users: Collection;
const SECRET_KEY = process.env.SECRET_KEY;
const key = new TextEncoder().encode(SECRET_KEY);
const ACCESS_TOKEN_SECRET = new TextEncoder().encode(
  process.env.ACCESS_TOKEN_SECRET
);
const REFRESH_TOKEN_SECRET = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET
);

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
export const encrypt = async (payload: JWTPayload) => {
  const encoded = await new SignJWT(payload)
    .setIssuedAt()
    .setExpirationTime("10 secs from now")
    .setProtectedHeader({ alg: "HS256" })
    .sign(key);
  return encoded;
};
export const decrypt = async (input: string): Promise<any> => {
  const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
  return payload;
};

export async function login(user: { email: string; password: string }) {
  try {
    await connect();
    const { email, password } = user;
    const userExist = await users.findOne({ email: user.email });
    if (!userExist || !(await compare(password, userExist?.hashedPassword))) {
      return null;
    }
    const accessToken = await new SignJWT({ userId: userExist._id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("5m") // Set to 5 minutes
      .sign(ACCESS_TOKEN_SECRET);
    const refreshToken = await new SignJWT({ userId: userExist._id })
      .setExpirationTime("7d")
      .setProtectedHeader({ alg: "HS256" })
      .sign(REFRESH_TOKEN_SECRET);
    await users.updateOne(
      { _id: new ObjectId(userExist._id) },
      { $set: { refreshTokens: [refreshToken] } }
    );
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Invalid email or password");
  }
}
export const logout = async (access_token: string) => {
  try {
    const payload = await decrypt(access_token);
    cookies().set("session", "", { expires: new Date(Date.now() + 15000) });
    console.log(payload);
    console.log(
      "Logout successful. Refresh token removed and session cleared."
    );
    return payload;
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("Logout failed. Please try again.");
  }
};
export const getSession = async () => {
  const session = cookies().get("AccessToken")?.value;
  console.log("Session", session);
  if (!session) return null;
  return await decrypt(session);
};
export const updateSessions = async () => {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    expires: parsed.expires,
    httpOnly: true,
  });
  return res;
};

export const register = async (data: { email: string; password: string }) => {
  try {
    const { email, password } = data;

    if (typeof email !== "string" || typeof password !== "string") {
      throw new Error("Email and password must be strings");
    }

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      throw new Error("That email is already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = {
      email,
      password: hashedPassword,
      createdAt: new Date(),
      readBooks: [],
    };
    const result = await users.insertOne(createdUser);
    console.log("Insert result:", result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
    throw error;
  }
};
export const getUser = async (token: string) => {
  try {
    const payload = await decrypt(token);
    console.log(payload);
    return payload;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
