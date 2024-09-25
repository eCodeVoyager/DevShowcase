import requests from "./httpRequest";

const AuthSearvice = {
  sendOtpEmail: async (body) => {
    return requests.post("/auth/send-otp/email", body);
  },
  sendOtpPhone: async (body) => {
    return requests.post("/auth/send-otp/phone", body);
  },
  verifyOtp: async (body) => {
    return requests.post("/auth/verify-otp", body);
  },
  setPassword: async (body) => {
    return requests.post("/auth/set-password", body);
  },
  loginWithPass: async (body) => {
    return requests.post("/auth/login", body);
  },
  me: async () => {
    return requests.get("/auth/me");
  },
};

export default AuthSearvice;
