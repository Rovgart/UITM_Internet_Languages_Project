"use server";
import { refreshTokenUrl } from "@/lib/urls";
import axiosInstance from "@/utils/axiosInstance";

export const fetchRefreshToken = async () => {
  const response = await axiosInstance.get(refreshTokenUrl);
  return response.data;
};
