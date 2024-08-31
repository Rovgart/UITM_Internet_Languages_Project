import { Token } from "@/types/types";
import { create } from "zustand";
type UserCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
};
interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (formValues: UserCredentials) => Promise<Token | undefined>;
  refreshAccessToken: () => Promise<void>;
}
const useStore = create<AuthStore>();
