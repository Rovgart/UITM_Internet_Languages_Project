"use client";
import React from "react";
import { Formik, Form, Field } from "formik";

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

const LogForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success("Successfully Signed In");
      router.push(routes.dashboard);
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred during sign in");
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
          rememberMe: true,
        }}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          console.log(values);
          mutate(values);
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="flex flex-col p-4 gap-2">
            <label htmlFor="email">Email</label>
            <Field
              as={TextField}
              id="email"
              name="email"
              variant="outlined"
              fullWidth
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />

            <label htmlFor="password">Password</label>
            <Field
              as={TextField}
              id="password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />

            <FormGroup>
              <FormControlLabel
                control={
                  <Field
                    as={Checkbox}
                    type="checkbox"
                    name="rememberMe"
                    checked={values.rememberMe}
                    onChange={() =>
                      setFieldValue("rememberMe", !values.rememberMe)
                    }
                  />
                }
                label="Remember Me"
              />
            </FormGroup>

            <Divider />

            <div>
              <div className="g-signin2" data-onsuccess="onSignIn"></div>
            </div>

            <SubmitButton pending={isPending} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LogForm;
