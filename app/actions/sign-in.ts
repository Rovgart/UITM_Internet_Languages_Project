"use server";
import { signInUrl } from "@/lib/urls";
import { formSchemas } from "@/schemas/auth";
import { axiosInstance } from "@/utils/axiosInstance";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { validateYupSchema } from "formik";
import { cookies } from "next/headers";
export async function signIn(formValues: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  const { signInSchema } = formSchemas();
  const validatedFields = await signInSchema.validate(formValues);
  try {
    const user = {
      email: validatedFields.email,
      password: validatedFields.password,
      rememberMe: validatedFields.rememberMe,
    };
    const response = await axiosInstance.post(signInUrl, user);
    if (response.status === 200) {
      cookies().set("AccessToken", response.data?.accessToken);
      if (user.rememberMe) {
        cookies().set("RefreshToken", response.data?.refreshToken);
      }
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
}
