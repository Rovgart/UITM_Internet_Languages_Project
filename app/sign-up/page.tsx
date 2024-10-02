"use client";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Dancing_Script, Roboto } from "next/font/google";
import booksSVG from "../images/books.svg";
import Image from "next/image";
import { login, register } from "@/lib/lib";
import { redirect, useRouter } from "next/navigation";
import SubmitButton from "@/components/buttons/SubmitButton";
import { Formik, Form, Field } from "formik";
import { formSchemas } from "@/schemas/auth";
import { signUp } from "@/actions/sign-up";
import { routes } from "constants/routes";
import toast from "react-hot-toast";
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
  const router = useRouter();
  const { signUpSchema } = formSchemas();
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
        <Formik
          onSubmit={async (values) => {
            console.log(values);
            const validSignUp = await signUp(values);
            if (validSignUp) {
              toast.success("Your account has been successfully created ");
              router.push(routes.signIn);
            }
          }}
          validationSchema={signUpSchema}
          initialValues={{
            email: "",
            password: "",
            repeatPassword: "",
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex sm:w-1/2 w-full items-center sm:justify-center  flex-col gap-4">
              <Field
                id="outlined-basic"
                label="Email"
                name="email"
                variant="outlined"
                va
                className="text-reseda_green-100 outline-reseda_green-400 focus:outline-reseda_green-900 sm:w-full w-1/2"
                as={TextField}
                error={errors.email && touched.email}
                helperText={touched.email && errors.email}
              />
              <Field
                className="w-1/2 sm:w-full"
                name="password"
                type={"password"}
                id="standard-basic"
                label="Password"
                variant="outlined"
                as={TextField}
                error={errors.password && touched.password}
                helperText={touched.password && errors.password}
              />
              <Field
                className="w-1/2 sm:w-full"
                name="repeatPassword"
                type="password"
                id="standard-basic"
                label="Repeat password"
                variant="outlined"
                as={TextField}
                error={errors.repeatPassword && touched.repeatPassword}
                helperText={touched.repeatPassword && errors.repeatPassword}
              />
              <SubmitButton />
            </Form>
          )}
        </Formik>
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
