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
