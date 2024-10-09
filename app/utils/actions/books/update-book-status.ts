"use server";
import { updateBookStatusUrl } from "@/lib/urls";
import axios, { AxiosError, isAxiosError } from "axios";
// import { cookies, headers } from "next/headers";

export async function updateBookStatus(id: string) {
  try {
    // const token = cookies().get("AccessToken")?.value;
    const response = await axios.post(updateBookStatusUrl, {
      headers: {
        Authorization: "Bearer " + "Kuraklajksdjfasldkf",
        "Content-Type": "application/json",
      },
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
