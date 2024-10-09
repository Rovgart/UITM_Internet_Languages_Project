"use server";
import { signUpUrl } from "@/lib/urls";
import axios, { Axios, AxiosError } from "axios";
import { routes } from "constants/routes";
import { useRouter } from "next/navigation";

export const signUp = async (formValues: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(signUpUrl, formValues);
    if (response.status === 200) {
      return response.data;
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
