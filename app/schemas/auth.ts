import * as Yup from "yup";

export const formSchemas = () => {
  const signInSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    rememberMe: Yup.boolean(),
  });

  const signUpSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Please confirm your password"),
  });
  return { signInSchema, signUpSchema };
};
