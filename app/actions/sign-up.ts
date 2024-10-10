"use server";
import { signUpUrl } from "@/lib/urls";
import axios from "axios";

export const signUp = async (formValues: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(signUpUrl, formValues);
  return response.data;
};
