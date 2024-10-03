"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import { cn } from "@/utils/cn";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import SubmitButton from "../buttons/SubmitButton";
import { formSchemas } from "@/schemas/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "@/actions/sign-in";
import { routes } from "constants/routes";
import { MdRememberMe } from "react-icons/md";
const LogForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success("Successfully Registered");
      router.push(routes.dashboard);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  const { signInSchema } = formSchemas();
  return (
    <div className="flex items-center border h-full flex-col justify-center w-full">
      <h1 className="text-4xl font-bold text-midnight_green-700">Sign In</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
        }}
        validationSchema={signInSchema}
        onSubmit={async (values) => {
          console.log(values);
          mutate(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={cn("flex flex-col p-4 gap-2")}>
            <label htmlFor="email">Email</label>
            <Field
              as={TextField}
              name="email"
              variant="outlined"
              fullWidth
              error={touched.email && !!errors.email} // Error handling with Material-UI's TextField
              helperText={touched.email && errors.email} // Display error message
            />

            <label htmlFor="password">Password</label>
            <Field
              as={TextField}
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />

            <div className="flex items-center">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember Me"
                />
              </FormGroup>
            </div>
            <Divider />
            <div>
              <div className="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
            <SubmitButton />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LogForm;
