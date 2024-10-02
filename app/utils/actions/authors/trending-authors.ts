"use server";
import { trendingAuthorsUrl } from "@/lib/urls";
import { TrendingAuthorsT } from "@/types/types";
import axios from "axios";
export const fetchTrendingAuthors = async (): Promise<TrendingAuthorsT[]> => {
  const res = await axios.get(trendingAuthorsUrl);
  console.log(res);
  return res.data.authors;
};
