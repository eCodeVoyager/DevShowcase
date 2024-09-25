import * as Y from "yup";

export const RegisterValidator = Y.object({
  email: Y.string().email().required("Email is required"),
  username: Y.string().required("Username is required"),
  password: Y.string().required("Password is required"),
  confirmPassword: Y.string()
    .oneOf([Y.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const LoginValidator = Y.object({
  email: Y.string().email().required("Email is required"),
  password: Y.string().required("Password is required"),
});
