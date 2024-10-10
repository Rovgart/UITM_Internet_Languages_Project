"use server";
import { BestsellersResponse } from "@/types/types";
import { AxiosError } from "axios";
import { Book } from "@/types/types";

import { axiosInstance } from "@/utils/axiosInstance";
export const getBooksAction = async (
  url: string,
  urlParam?: string
): Promise<BestsellersResponse[] | null> => {
  try {
    // Fetching data from the API
    const res = await axiosInstance.get(url + (urlParam ? urlParam : ""));

    if (!res.data || res.data.length === 0) {
      return null;
    }

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
