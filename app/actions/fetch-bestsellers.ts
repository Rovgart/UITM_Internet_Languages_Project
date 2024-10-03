import { getPopularBooks } from "@/lib/urls";
import { BestsellersResponse } from "@/types/types";
import axios, { AxiosError } from "axios";
import { Book } from "@/types/types";
export const fetchBestsellers = async (): Promise<
  BestsellersResponse[] | undefined
> => {
  try {
    const res = await axios(getPopularBooks);
    if (res.data) {
      const bestsellers = res.data.map((book: Book) => {
        const genreArr = book.genre?.split(",");
        const bestsellersObj = {
          id: book._id,
          title: book.title,
          description: book.desc,
          img: book.img,
          genre: genreArr.slice(0, 3),
          author: book.author,
          rating: book.rating,
        };
        return bestsellersObj;
      });
      console.log(bestsellers[0].genre.slice(0, 3));
      return bestsellers;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
