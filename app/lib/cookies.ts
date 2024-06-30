import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "v8";

type options = {
  maxAge: number;
  expires: Date | number;
  path: string;
  domain: string;
  secure: boolean;
  httpOnly: boolean;
};
function parseCookies(req: NextApiRequest) {
  return req ? req.headers.cookie || "" : document.cookie;
}
// Sets cookie in response header
export function setCookie(
  res: NextApiResponse,
  name: string,
  value: string,
  options: options
) {
  const stringValue =
    typeof value == "object" ? `j:${JSON.stringify(value)}` : String(value);
  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }
  res.setHeader("Set-Cookie", serialize(name, String(value), options));
}
export default parseCookies;
