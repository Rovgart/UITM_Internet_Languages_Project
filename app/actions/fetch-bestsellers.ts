"use server";
import { BestsellersResponse } from "@/types/types";
import axios, { AxiosError } from "axios";
import { Book } from "@/types/types";
import { cookies } from "next/headers";
export const getBooksAction = async (
  url: string,
  urlParam?: string
): Promise<BestsellersResponse[] | null> => {
  try {
    const token = cookies().get("AccessToken")?.value;

    // Fetching data from the API
    const res = await axios.get(url + (urlParam ? urlParam : ""), {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!res.data || res.data.length === 0) {
      return null;
    }

    // Map over the data if it's not empty
    const books = res.data.map((book: Book) => {
      const genreArr = book.genre?.split(",");
      const bookModified = {
        id: String(book._id),
        title: book.title,
        description: book.desc,
        img: book.img,
        genre: genreArr.slice(0, 3),
        author: book.author,
        rating: book.rating,
        totalratings: book.totalratings,
      };
      return bookModified;
    });

    console.log(res.data);
    return books;
  } catch (error) {
    // Handle Axios errors specifically
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    } else {
      // Throw any other unhandled errors
      throw error;
    }
  }
};
