"use server";
import { signInUrl } from "@/lib/urls";
import { formSchemas } from "@/schemas/auth";
import { axiosInstance } from "@/utils/axiosInstance";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { validateYupSchema } from "formik";
import { cookies } from "next/headers";
export async function signIn(formValues: { email: string; password: string }) {
  const { signInSchema } = formSchemas();
  const validatedFields = await signInSchema.validate(formValues);
  try {
    const user = {
      email: validatedFields.email,
      password: validatedFields.password,
    };
    const response = await axiosInstance.post(signInUrl, user);
    console.log(response.data);
    if (response.status === 200) {
      cookies().set("access_token", response.data?.token);
    }
    return response.data;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw new Error(error.message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
}
