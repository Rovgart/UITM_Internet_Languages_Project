"use server";
import { getUserUrl } from "@/lib/urls";
import axiosInstance from "@/utils/axiosInstance";

export const getCurrentUser = async () => {
  const response = await axiosInstance.get(getUserUrl);
  return response.data;
};
