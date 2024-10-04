"use server";
import { topSellingBooksUrl } from "@/lib/urls";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export const fetchTopSellingBooks = async function () {
  const token = cookies().get("AccessToken")?.value;
  try {
    const response = await axios.get(topSellingBooksUrl, {
      headers: {
        Authorization: "Bearer" + token,
      },
    });
    console.log(response.data); // log the response data for debugging purposes
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
