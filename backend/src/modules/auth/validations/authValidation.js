//src/modules/auth/validations/authValidation.js

const Joi = require("joi");

const register = {
  body: Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(6).required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(6).required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};
const forgotPasswordSet = {
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};
const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
};

const verifyEmail = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    otp: Joi.number().required(),
  }),
};
const verifyForgotPasswordOTP = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    otp: Joi.number().required(),
  }),
};
module.exports = {
  register,
  login,
  refreshTokens,
  forgotPassword,
  changePassword,
  forgotPasswordSet,
  verifyEmail,
  verifyForgotPasswordOTP,
};
