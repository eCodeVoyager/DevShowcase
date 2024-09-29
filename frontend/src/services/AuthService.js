import requests from "./httpRequest";

const AuthService = {
  registerUser: async (body) => {
    return requests.post("/auth/register", body);
  },
  sendVerifyOtp: async (body) => {
    return requests.post("/auth/verify-email", body);
  },
  verifyOtpEmail: async (body) => {
    return requests.post("/auth/verify-email-otp", body);
  },
  sendVerifyOtpForResetPassword: async (body) => {
    return requests.post("/auth/forgot-password", body);
  },
  verifyForgotPasswordOtp: async (body) => {
    return requests.post("/auth/forgot-password-verify-otp", body);
  },
  forgotPasswordSet: async (body) => {
    return requests.post("/auth/forgot-password-set", body);
  },
  login: async (body) => {
    return requests.post("/auth/login", body);
  },
  setPassword: async (body) => {
    return requests.post("/auth/set-password", body);
  },
  me: async () => {
    return requests.get("/auth/me");
  },
};

export default AuthService;
