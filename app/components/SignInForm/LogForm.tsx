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

const LogForm = () => {
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
          await signIn(values);
          console.log(values);
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
