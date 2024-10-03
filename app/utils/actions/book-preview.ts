import { getBookUrl } from "@/lib/urls";
import axios, { AxiosError } from "axios";
export const fetchBookPreview = async (id: string) => {
  try {
    const response = await axios.get(getBookUrl, {
      params: id,
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
