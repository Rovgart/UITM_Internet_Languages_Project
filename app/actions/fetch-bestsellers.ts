import { BestsellersResponse } from "@/types/types";
export const fetchBestsellers = async (): Promise<
  BestsellersResponse[] | undefined
> => {
  try {
    const res = await fetch("http://localhost:3000/api/popularbooks", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data ${res.status}: ${res.statusText}`);
    }
    const data: Book[] = await res.json();
    console.log(data);
    if (data) {
      const bestsellers = data.map((book) => {
        const genreArr = book.genre.split(",");
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
    console.error(error);
  }
};
