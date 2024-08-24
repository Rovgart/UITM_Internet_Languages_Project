import { serialize } from "cookie";
import { jwtDecrypt, JWTPayload, jwtVerify, SignJWT } from "jose";
import { KeyLike } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Collection, Db } from "mongodb";
import clientPromise from "./mongodb";
import { compare } from "bcrypt";
import bcrypt from "bcrypt";

let client;
let db: Db;
let users: Collection;
const SECRET_KEY = "secret";
const key = new TextEncoder().encode(SECRET_KEY);
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
  await connect();
  const { email, password } = user;
  console.log(user);
  const userExist = await users.findOne({ email: user.email });

  if (userExist && (await compare(password, userExist.password))) {
    // Create session
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ email, expires });
    // Save the session in the cookie
    cookies().set("session", session, {
      expires: expires,
      httpOnly: true,
    });
    return { token: session, user: userExist };
  }

  console.error("Invalid email or password");
  return null;
}

export const logout = async () => {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(Date.now() + 15000) });
};

export const getSession = async () => {
  // get session from cookie
  const session = cookies().get("session")?.value;
  // If session not found, return null
  if (!session) return null;
  return await decrypt(session);
};

export const updateSessions = async (request: NextRequest) => {
  // Checking if session exists
  const session = cookies().get("session")?.value;
  if (!session) return null;

  // Refresh session if it doesn't expire

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

export const register = async (formData: FormData) => {
  try {
    await connect();
    const user = {
      email: formData.get("email") || "",
      password: formData.get("password") || "",
    };
    if (!user.email || !user.password) {
      throw new Error("Email and password are required");
    }
    const existingUser = await users.findOne({ email: user.email });
    if (existingUser) {
      throw new Error("That email is already registered");
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = {
      email: user.email,
      password: hashedPassword,
      createdAt: new Date(Date.now()),
    };

    console.log("Successfully registered");
  } catch (error: any) {
    console.error(error.message);
  }
};
