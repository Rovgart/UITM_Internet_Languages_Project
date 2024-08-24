"use server";
import { signInUrl } from "@/lib/urls";
import axios, { AxiosError } from "axios";
export async function signIn(formValues: { email: string; password: string }) {
  try {
    const user = {
      email: formValues?.email,
      password: formValues?.password,
    };
    const response = await axios.post(signInUrl, user);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
}
