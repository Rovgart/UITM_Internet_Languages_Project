"use server";
import { getBookUrl } from "@/lib/urls";
import axios, { AxiosError } from "axios";
import { cookies, headers } from "next/headers";
export const fetchBookPreview = async (id: string) => {
  const token = cookies().get("AccessToken");
  try {
    const response = await axios.get(getBookUrl + `/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
