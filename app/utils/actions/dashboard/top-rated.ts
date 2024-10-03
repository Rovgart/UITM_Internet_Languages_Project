"use server";
import { topSellingBooksUrl } from "@/lib/urls";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
export const fetchTopRatedBooks = async () => {
  try {
    const token = cookies().get("AccessToken")?.value;
    const response = await axios.get(topSellingBooksUrl, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("Unexpected error occured: ");
    }
  }
};
