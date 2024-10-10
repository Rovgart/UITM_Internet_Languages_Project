"use server";
import { logoutUrl } from "@/lib/urls";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export const logoutUser = async () => {
  try {
    const token = cookies().get("AccessToken");
    if (token) {
      const response = await axios.post(logoutUrl, {
        headers: {
          Authorization: "Bearer" + token,
        },
      });
      cookies().delete("RefreshToken");
      cookies().delete("AccessToken");
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
