import { login } from "@/lib/lib";
import { Button, TextField } from "@mui/material";
import { Dancing_Script } from "next/font/google";
import { redirect } from "next/navigation";
import React from "react";
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
          const LoginValid = await login(formData);
          if (LoginValid) {
            console.log(LoginValid);
            return LoginValid;
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
            fullWidth
            className="w-full"
            InputLabelProps={{
              className: "text-midnight_green-900",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            className="bg-robin_egg_blue-500 text-white hover:bg-robin_egg_blue-700"
          >
            Sign In
          </Button>
        </div>
      </form>
    </>
  );
};

export default LogForm;
