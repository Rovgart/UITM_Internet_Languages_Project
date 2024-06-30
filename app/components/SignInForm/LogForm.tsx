import { login } from "@/lib/lib";
import { Button, TextField } from "@mui/material";
import { Dancing_Script } from "next/font/google";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import SubmitButton from "../buttons/SubmitButton";
type FormProps = {
  action: () => void;
};
const roboto = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dancingScript",
});

const LogForm = () => {
  return (
    <>
      <form
        action={async (formData: FormData) => {
          "use server";
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(true);
            }, 3000);
          });
          const LoginValid = await login(formData);
          if (LoginValid) {
            console.log(LoginValid);
            cookies().set("session", LoginValid?.token, {
              expires: new Date(0),
              httpOnly: true,
            });
          }
        }}
        className={` ${roboto.className} font-robotoSzef flex flex-col items-center justify-around gap-6 p-6 border border-slate-500 rounded-lg size-2/3 mx-auto bg-midnight_green-600 shadow-md shadow-black`}
      >
        <h1 className="text-6xl font-bold text-midnight_green-900">
          Bookjourney
        </h1>
        <div className="flex flex-col items-center gap-4">
          <TextField
            variant="outlined"
            type="email"
            label="Email"
            name="email"
            fullWidth
            className="w-full"
            InputLabelProps={{
              className: "text-midnight_green-900",
            }}
          />
          <TextField
            variant="outlined"
            type="password"
            label="Password"
            name="password"
            fullWidth
            className="w-full"
            InputLabelProps={{
              className: "text-midnight_green-900",
            }}
          />
          <SubmitButton />
        </div>
      </form>
    </>
  );
};

export default LogForm;
