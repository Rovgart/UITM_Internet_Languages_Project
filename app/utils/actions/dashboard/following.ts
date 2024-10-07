"use server";

import { booksOfFollowingAuthors } from "@/lib/urls";
import { followingAuthorsT } from "@/types/types";
import axios, { AxiosError } from "axios";
import { cookies, headers } from "next/headers";

export const fetchFollowing = async (followingAuthors: followingAuthorsT[]) => {
  try {
    const token = cookies().get("AccessToken")?.value;
    const response = await axios.post(
      booksOfFollowingAuthors + followingAuthors,
      {
        headers: {
          Authorization: "Bearer" + token,
        },
        params: {
          followedAuthors: followingAuthors,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
