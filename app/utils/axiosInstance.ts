"use server";
import { BASE_URL } from "@/lib/urls";
import axios, { AxiosRequestConfig, RawAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
// Add a request interceptor
axios.interceptors.request.use(
  function (request) {
    const accessToken = cookies().get("accessToken");
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    // Do something before request is sent
    return request;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
