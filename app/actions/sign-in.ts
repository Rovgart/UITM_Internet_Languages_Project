"use server";
import { signInUrl } from "@/lib/urls";
import { formSchemas } from "@/schemas/auth";
import { axiosInstance } from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function signIn(formValues: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  const { signInSchema } = formSchemas();

  try {
    const validatedFields = await signInSchema.validate(formValues);
    const user = {
      email: validatedFields.email,
      password: validatedFields.password,
      rememberMe: validatedFields.rememberMe,
    };

    const response = await axiosInstance.post(signInUrl, user);

    if (response.status === 200) {
      const accessToken = response.data?.accessToken;
      const refreshToken = response.data?.refreshToken;
      cookies().set("AccessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });

      if (user.rememberMe) {
        cookies().set("RefreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 1 week expiration
        });
      }

      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message || "Login failed");
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
}
