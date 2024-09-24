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
    await user[0].isPasswordMatch(credentials.password);

    return user[0];
  } catch (error) {
    throw error;
  }
};

const changePassword = async (id, oldPassword, newPassword) => {
  try {
    let getUser = await userService.getUnprotectedUser(id);
    if (!getUser) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const result = await getUser.changePassword(oldPassword, newPassword);
    if (result === false) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect old password");
    }

    return getUser;
  } catch (error) {
    throw error;
  }
};
const sendForgotPasswordEmail = async (user, otp) => {
  try {
    const otpInfo = await otpModel.create({ otp: otp, userId: user._id });
    user.forgotPasswordOTP = otpInfo._id;
    await user.save();

    return otpInfo;
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async (body) => {
  try {
    const { password, otp } = body;
    const otpInfo = await otpModel.findOne({ otp: otp }).populate("userId");

    if (!otpInfo) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid OTP ");
    }

    const user = otpInfo.userId;

    if (!user) {
      throw new ApiError(404, "User not found"); // Throw error if user is not found
    }

    await user.forgotPassword(password);
    await otpModel.findByIdAndDelete(otpInfo._id);

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  register,
  loginByEmail,
  changePassword,
  sendForgotPasswordEmail,
  forgotPassword,
};
