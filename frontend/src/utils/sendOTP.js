import AuthService from "../services/AuthService";

export const sendOtp = (email) => {
  return AuthService.sendVerifyOtp({
    email,
  });
};

export const sendForgotPasswordOtp = (email) => {
  return AuthService.sendVerifyOtpForResetPassword({
    email,
  });
};
