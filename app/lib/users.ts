import { Collection, Db } from "mongodb";
import clientPromise from "./mongodb";
import { getSession } from "./lib";
import { user } from "@nextui-org/react";
import { connect } from "./connect";

export const getUser = async () => {
  try {
    const usersCollection = await connect("users");
    const userId = await getSession();
    if (!userId) return null;
    console.log(userId);
    return userId;
  } catch (error: any) {
    console.error(error?.message);
  }
};
