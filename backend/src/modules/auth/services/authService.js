//src/modules/auth/services/authService.js

const httpStatus = require("http-status");
const ApiError = require("../../../utils/apiError");
const otpModel = require("../../auth/model/otpModel");
const userService = require("../../users/services/userService");

/**
 * Registers a new user.
 * @param {Object} userBody - The user object.
 * @returns {Promise<Object>} The promise object that represents the new user.
 */
const register = async (userBody) => {
  try {
    const user = await userService.createUser(userBody);
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Logs in a user by email.
 * @param {Object} credentials - The user credentials.
 * @returns {Promise<Object>} The promise object that represents the user.
 */
const loginByEmail = async (credentials) => {
  try {
    const user = await userService.getUsers(
      { email: credentials.email },
      "+password"
    );
    return user[0];
  } catch (error) {
    throw error;
  }
};

const changePassword = async (userEmail) => {
  try {
    const user = await userService.getUsers({ email: userEmail }, "+password");
    return user[0];
  } catch (error) {
    throw error;
  }
};

const saveOTP = async (user, otp) => {
  try {
    await otpModel.create({
      userId: user._id,
      otp,
    });
  } catch (error) {
    throw error;
  }
};

const verifyOTP = async (user, otp) => {
  try {
    const otpData = await otpModel.findOne({ userId: user._id, otp });
    if (!otpData) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid OTP");
    }

    await otpModel.deleteOne({ userId: user._id, otp });
  } catch (error) {
    throw error;
  }
};
module.exports = {
  register,
  loginByEmail,
  changePassword,
  saveOTP,
  verifyOTP,
};
