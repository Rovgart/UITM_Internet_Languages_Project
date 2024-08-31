"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import { cn } from "@/utils/cn";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import SubmitButton from "../buttons/SubmitButton";
import { formSchemas } from "@/schemas/auth";
import { signIn } from "@/actions/sign-in";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LogForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: signIn, // The mutation function to be called
    onSuccess: (data) => {
      console.log(data);
      toast.success("Successfully Registered");
      router.push("/home");
    },
    onError: (error) => {
      toast.error("Invalid email or password");
    },
  });
  const { signInSchema } = formSchemas();
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={signInSchema} // Pass the Yup validation schema
        onSubmit={async (values) => {
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

            <SubmitButton />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LogForm;
