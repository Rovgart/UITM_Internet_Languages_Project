"use server";
import { followAuthorUrl } from "@/lib/urls";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";

export async function followAuthor(id: string) {
  try {
    const response = await axiosInstance.post(followAuthorUrl, {
      id,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
}
