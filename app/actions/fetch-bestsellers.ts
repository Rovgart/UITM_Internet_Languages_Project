"use server";
import { BestsellersResponse } from "@/types/types";
import axios, { AxiosError } from "axios";
import { Book } from "@/types/types";
import { cookies } from "next/headers";
export const getBooksAction = async (
  url: string,
  urlParam?: string
): Promise<BestsellersResponse[] | undefined> => {
  try {
    const token = cookies().get("AccessToken")?.value;
    const res = await axios.get(url + `${urlParam ? urlParam : ""}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const bestsellers = res.data.map((book: Book) => {
      const genreArr = book.genre?.split(",");
      const bestsellersObj = {
        id: String(book._id),
        title: book.title,
        description: book.desc,
        img: book.img,
        genre: genreArr.slice(0, 3),
        author: book.author,
        rating: book.rating,
      };
      return bestsellersObj;
    });
    return bestsellers;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
