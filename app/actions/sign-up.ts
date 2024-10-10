"use server";
import { signUpUrl } from "@/lib/urls";
import axiosInstance from "@/utils/axiosInstance";
import { Axios, AxiosError } from "axios";

export const signUp = async (formValues: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post(signUpUrl, formValues);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
  }
};
