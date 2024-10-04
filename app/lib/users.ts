import { decrypt, getSession } from "./lib";

export const getUser = async (token: string) => {
  try {
    const user = await decrypt(token);
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
};
