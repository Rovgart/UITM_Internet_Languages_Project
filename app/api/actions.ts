"use server";
import { cookies } from "next/headers";

export const displayCookieAlert = () => {
  const consent = cookies().get("cookie_consent");
  if (!consent) {
    return true;
  }
};
export const handleAccept = () => {
  cookies().set("cookie_consent", "accepted", { expires: 365 });
  return false;
};
export const fetchBook = async (bookName: string) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ q: bookName }),
    };
    const response = await fetch(`http://localhost:3000/api/search`, options);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data ${response.status}: ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log(response);
    console.log(data);
    if (data) {
      return data;
    }
  } catch (error: any) {
    console.error(error);
    return null;
  }
};
