"use server";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Collection, Db, ObjectId } from "mongodb";
import clientPromise from "./mongodb";
import { compare } from "bcrypt";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { getCollection } from "./connect";
import { getBook } from "./books";
dotenv.config();

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
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
};

export async function login(user: { email: string; password: string }) {
  try {
    await connect();
    const { password } = user;
    const userExist = await users.findOne({ email: user.email });
    if (!userExist || !(await compare(password, userExist?.password))) {
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
    throw error;
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
  try {
    const session = cookies().get("AccessToken")?.value;
    if (!session) {
      return null;
    }
    const { payload } = await jwtVerify(session, ACCESS_TOKEN_SECRET, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("JWT verification error: ", error);
    return null;
  }
};
export const updateSessions = async () => {
  try {
    const session = cookies().get("RefreshToken")?.value;
    if (!session) return null;
    const parsed = await jwtVerify(session, REFRESH_TOKEN_SECRET, {
      algorithms: ["HS256"],
    });
    parsed.payload.exp = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      expires: parsed.expires,
      httpOnly: true,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const register = async (data: { email: string; password: string }) => {
  try {
    const { email, password } = data;
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

    return { success: true, userId: result.insertedId.toString() };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getUser = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, ACCESS_TOKEN_SECRET, {
      algorithms: ["HS256"],
    });
    const retrievedUser = payload?.userId;
    if (!retrievedUser) {
      return null;
    }
    console.log(retrievedUser);

    let query;
    if (typeof retrievedUser === "string" && ObjectId.isValid(retrievedUser)) {
      query = { _id: new ObjectId(retrievedUser) };
    } else {
      query = { _id: retrievedUser };
    }

    const user = await users.findOne(query);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "JWSSignatureVerificationFailed") {
        console.error("Token signature verification failed");
      } else if (error.name === "JWTExpired") {
        console.error("Token has expired");
      } else {
        console.error("JWT verification error:", error.message);
      }
    } else {
      console.error("An unknown error occurred");
    }
    throw error;
  }
};
export const markBookAsRead = async (bookId: string, token: string) => {
  try {
    const session = await jwtVerify(token, ACCESS_TOKEN_SECRET, {
      algorithms: ["HS256"],
    });
    console.log(session);

    const book = await getBook(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    const users = await getCollection("users");

    const result = await users.updateOne(
      { _id: new ObjectId(session?.payload?.userId) },
      {
        $addToSet: {
          readBooks: {
            ...book,
          },
        },
      }
    );

    console.log(result);
    if (result.modifiedCount === 0) {
      console.log("No changes made; the book may already be in readBooks.");
    } else {
      console.log("Book marked as read successfully.");
    }
    return result;
  } catch (error) {
    console.error("Error marking book as read:", error);
    throw error;
  }
};
export const retrieveReadBooksByUser = async (token: string) => {
  try {
    const session = await jwtVerify(token, ACCESS_TOKEN_SECRET, {
      algorithms: ["HS256"],
    });
    console.log(session);

    const users = await getCollection("users");
    const user = await users.findOne({
      _id: new ObjectId(session?.payload?.userId),
    });

    if (!user) {
      throw new Error("User not found");
    }
    return user.readBooks;
  } catch (error) {
    console.error("Error retrieving read books:", error);
    throw error;
  }
};

export const verifyProtectedRoute = async (token: string) => {
  try {
    const verification = await jwtVerify(token, ACCESS_TOKEN_SECRET, {
      algorithms: ["HS256"],
    });
    if (verification.payload) {
      return true;
    }
  } catch (error) {
    throw error;
  }
};
