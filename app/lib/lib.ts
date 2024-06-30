import { serialize } from "cookie";
import { jwtDecrypt, JWTPayload, jwtVerify, SignJWT } from "jose";
import { KeyLike } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Collection, Db } from "mongodb";
import clientPromise from "./mongodb";
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

export async function login(formData: FormData) {
  // Validate user credentials
  const user = {
    email: formData.get("email") || "",
    password: formData.get("password") || "",
  };
  const email = user.email;
  await connect();
  const userExists = db.collection("users").find({ email });
  if (userExists) {
    // Create session
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires });
    // Save the session in the cookie
    cookies().set("session", session, { expires: new Date(0), httpOnly: true });
    return session;
  }
  throw new Error(`User ${user.email} already exists`);
}
export const logout = async () => {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
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
    const options = {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("http://localhost:3000/api/register", options);
    if (!response.ok) {
      throw new Error(
        `Error while registering ${response.status}: ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
};
