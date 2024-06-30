import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Dancing_Script, Roboto } from "next/font/google";
import booksSVG from "../images/books.svg";
import Image from "next/image";
import { login, register } from "@/lib/lib";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/buttons/SubmitButton";
type Props = {};
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dancingScript",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto",
});
const SignUp = () => {
  return (
    <main className="min-h-[88vh] grid sm:grid-cols-register_grid overflow-hidden">
      <div className="sm:flex w-screen sm:w-auto sm:items-center sm:justify-around flex-col flex gap-5  relative bg-reseda_green-900 text-reseda_green-500 h-full justify-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-2">
          <picture>
            {/* Bookify Logo Here */}
            <Image
              className="sm:size-40 size-24 "
              src={booksSVG}
              alt="Books Logo"
            />
          </picture>

          <h1
            className={`text-6xl ${dancingScript.variable} font-robotoSzef text-midnight_green-600`}
          >
            Bookjourney
          </h1>
          <h1
            className={` ${roboto.variable} font-roboto text-xl text-midnight_green-600`}
          >
            Create an account
          </h1>
        </div>
        {/* Sign Up Form */}
        <form
          action={async (formData: FormData) => {
            "use server";
            const RegisterValid = await register(formData);
            return RegisterValid;
          }}
          className="flex sm:w-1/2 w-full items-center sm:justify-center  flex-col gap-4"
        >
          <TextField
            id="outlined-basic"
            label="Email"
            name="email"
            variant="outlined"
            className="text-reseda_green-100 outline-reseda_green-400 focus:outline-reseda_green-900 sm:w-full w-1/2"
          />
          <TextField
            className="w-1/2 sm:w-full"
            name="password"
            type={"password"}
            id="standard-basic"
            label="Password"
            variant="outlined"
          />
          <SubmitButton />
        </form>
        {/* Social Media Sign In */}
        <span className="absolute bottom-0 pb-2 flex justify-center gap-1 italic tracking-tight">
          Already have an account ?
          <Link className="tracking-tight text-midnight_green-00" href={"/"}>
            Log In
          </Link>
        </span>
      </div>
      <aside className="bg-[url('./images/books_background.jpeg')] bg-center  saturate-50 sm:flex sm:flex-col sm:justify-center hidden  bg-reseda_green-900">
        <div className=" p-2 w-full h-full justify-center backdrop-brightness-50  text-maize text-center flex flex-col gap-4 ">
          <h1 className="sm:text-5xl text-naples_yellow-400 drop-shadow-xl  ">
            Read. Explore. Enjoy
          </h1>
          <span className="text-xl text-naples_yellow-800 ">
            With a vast collection of books across numerous genres, Bookify
            ensures that everyone can find something they love.
          </span>
        </div>
      </aside>
    </main>
  );
};

export default SignUp;
