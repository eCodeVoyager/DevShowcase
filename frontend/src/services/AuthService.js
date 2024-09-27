import requests from "./httpRequest";

const AuthService = {
  registerUser: async (body) => {
    return requests.post("/auth/register", body);
  },
  sendVerifyOtp: async (body) => {
    return requests.post("/auth/send-verify-otp", body);
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
