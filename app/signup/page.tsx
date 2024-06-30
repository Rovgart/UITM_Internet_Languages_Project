import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Roboto } from "next/font/google";
import booksSVG from "../images/books.svg";
import Image from "next/image";
import { login, register } from "@/lib/lib";
import { redirect } from "next/navigation";
type Props = {};
const roboto = Roboto({ subsets: ["latin"], weight: "400" });
const SignUp = () => {
  return (
    <main className="min-h-[88vh] grid sm:grid-cols-register_grid overflow-hidden">
      <div className="sm:flex w-screen sm:w-auto sm:items-center sm:justify-around flex-col flex gap-5  relative bg-reseda_green-900 text-reseda_green-500 h-full">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <picture>
            {/* Bookify Logo Here */}
            <Image
              className="sm:size-40 size-24"
              src={booksSVG}
              alt="Books Logo"
            />
          </picture>

          <h1 className="text-6xl">Bookify</h1>
          <h1 className="text-4xl">Create an account</h1>
        </div>
        {/* Sign Up Form */}
        <form
          action={async (formData: FormData) => {
            "use server";
            await register(formData);
            redirect("/");
          }}
          className="flex w-full items-center sm:justify-center  flex-col gap-4"
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
          <Button
            variant="contained"
            className="bg-maize-300 w-1/2 sm:w-full hover:bg-maize-200"
            color="primary"
            type="submit"
          >
            Sign In
          </Button>
        </form>
        {/* Social Media Sign In */}
        <span className="absolute bottom-0">
          Already have an account?{" "}
          <Link className="text-color_1" href={"/"}>
            Log In
          </Link>
        </span>
      </div>
      <aside className="bg-[url('./images/books_background.jpeg')] bg-center  saturate-50 sm:flex sm:flex-col sm:justify-center hidden  bg-reseda_green-900">
        <div className=" p-2 w-full h-full justify-center backdrop-brightness-50  text-maize text-center flex flex-col gap-4 ">
          <h1 className="sm:text-5xl">Read. Explore. Enjoy</h1>
          <span className="text-xl ">
            With a vast collection of books across numerous genres, Bookify
            ensures that everyone can find something they love.
          </span>
        </div>
      </aside>
    </main>
  );
};

export default SignUp;
