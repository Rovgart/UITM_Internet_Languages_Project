import { followAuthorUrl } from "@/lib/urls";
import axios, { AxiosError } from "axios";
import { cookies, headers } from "next/headers";

export async function followAuthor(id: string) {
  const token = cookies().get("AccessToken")?.value;
  try {
    const response = await axios.post(followAuthorUrl, {
      headers: {
        Authorization: "Bearer" + token,
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
