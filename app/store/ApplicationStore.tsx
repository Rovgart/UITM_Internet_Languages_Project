// import { signIn } from "@/actions/sign-in";
// import { Token } from "@/types/types";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import Cookies from "cookies-js";
// type UserCredentials = {
//   email: string;
//   password: string;
//   rememberMe: boolean;
// };
// interface AuthStore {
//   isAuthenticated: boolean;
//   setAuthenticated: () => void;
//   logout: () => void;
//   loginUser: (formValues: UserCredentials) => Promise<Token | undefined>;
// }
// const useAppStore = create(
//   persist<AuthStore>(
//     (set) => {
//       const isAuthenticated = Boolean(Cookies.get("access_token"));

//       const setAuthenticated = () => {
//         Cookies.set("access_token", null);
//         set({ isAuthenticated: false });
//       };
//       const logout = () => {
//         setAuthenticated();
//       };
//       const loginUser = async (formValues: UserCredentials) => {
//         const response = await signIn(formValues);
//         if (response?.token) {
//           Cookies.set("access_token", response.token);
//           set({ isAuthenticated: true });
//           return response.token;
//         }
//         return undefined;
//       };
//       return { isAuthenticated, setAuthenticated, logout, loginUser };
//     },
//     {
//       name: "authStore",
//     }
//   )
// );
// export default useAppStore;
