"use server";
import { updateBookStatusUrl } from "@/lib/urls";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { routes } from "constants/routes";
import { revalidatePath } from "next/cache";

export async function updateBookStatus(id: string) {
  try {
    const response = await axiosInstance.post(updateBookStatusUrl, { id });
    console.log(id);
    revalidatePath(routes.dashboard);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
}
