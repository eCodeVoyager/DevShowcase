// src/modules/auth/controllers/authController.js
require("dotenv").config();
const jwt = require("../../../utils/jwtToken");
const httpStatus = require("http-status");
const otpGen = require("../../../utils/otpGen");
const ApiError = require("../../../utils/apiError");
const authService = require("../services/authService");
const ApiResponse = require("../../../utils/apiResponse");
const sendEmail = require("../../email/services/emailService");
const userService = require("../../users/services/userService");

/**
 * Registers a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {Promise<Object>} The promise object that represents the new user.
 */
const register = async (req, res, next) => {
  try {
    let existingUser;
    await userService.getUsers({ email: req.body.email }).then((user) => {
      existingUser = user[0];
    });
    if (existingUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
    }
    await userService.getUsers({ username: req.body.username }).then((user) => {
      existingUser = user[0];
    });
    if (existingUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Username already exists");
    }

    let user = await authService.register(req.body);
    await sendEmail(user.email, "Welcome", "welcome", {
      UploadProjectURL: process.env.UPLOAD_PROJECT_URL,
    });

    user = user.toObject();
    delete user.password;
    return res
      .status(httpStatus.CREATED)
      .json(new ApiResponse(httpStatus.CREATED, user));
  } catch (error) {
    next(error);
  }
};

/**
 * Logs in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {Promise<Object>} The promise object that represents the user.
 */
const login = async (req, res, next) => {
  try {
    const user = await authService.loginByEmail(req.body);
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid email or password");
    }

    const isMatch = await user.isPasswordMatch(req.body.password);
    if (isMatch === false) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid email or password");
    }

    const accessToken = jwt.generateAccessToken(user);
    const refreshToken = jwt.generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return res.json(
      new ApiResponse(
        httpStatus.OK,
        {
          email: user.email,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Refreshes the access token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {Promise<Object>} The promise object that represents the new access token.
 */
const refreshTokens = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const decoded = jwt.verifyRefreshToken(refreshToken);
    let user = await userService.getUsers(
      { email: decoded.email },
      "+refreshToken"
    );
    user = user[0];
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
    }

    if (user.refreshToken !== refreshToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
    }

    const accessToken = jwt.generateAccessToken(user);
    const newRefreshToken = jwt.generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();
    return res.json(
      new ApiResponse(
        httpStatus.OK,
        { accessToken, refreshToken: newRefreshToken },
        "Token refreshed successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Changes the password of the user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<Object>} The promise object that represents the result.
 *
 */
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await authService.changePassword(req.user.email, {
      oldPassword,
      newPassword,
    });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid request");
    }
    const isMatch = await user.changePassword(oldPassword, newPassword);
    if (isMatch === false) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid old password");
    }
    return res.json(
      new ApiResponse(httpStatus.OK, null, "Password changed successfully")
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Sends a forgot password email to the user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<Object>} The promise object that represents the result.
 */

const sendForgotPasswordEmail = async (req, res, next) => {
  try {
    let user = await userService.getUsers({ email: req.body.email });
    user = user[0];
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    const otp = otpGen();
    await authService.saveOTP(user, otp);
    await sendEmail(user.email, "Forgot Password", "forgotPassword", { otp });

    return res.json(
      new ApiResponse(httpStatus.OK, null, "Email sent successfully")
    );
  } catch (error) {
    next(error);
    console.log(error);
  }
};
/**
 * Resets the password of the user with OTP.
 *  @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {Promise<Object>} The promise object that represents the result.
 */

const forgotPassword = async (req, res, next) => {
  try {
    let user = await userService.getUsers({ email: req.body.email });
    user = user[0];
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    await authService.verifyOTP(user, req.body.otp);

    user.password = req.body.password;
    await user.save();

    return res.json(
      new ApiResponse(httpStatus.OK, null, "Password reset successfully")
    );
  } catch (error) {
    next(error);
  }
};

const sendVerificationEmail = async (req, res, next) => {
  try {
    let user = await userService.getUsers({ email: req.body.email });
    user = user[0];
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    if (user.isVerified === true) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already verified");
    }
    const otp = otpGen();
    await authService.saveOTP(user, otp);
    await sendEmail(user.email, "Please verify your email", "verifyEmailOTP", {
      otp,
    });

    return res.json(
      new ApiResponse(httpStatus.OK, null, "Email sent successfully")
    );
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    let user = await userService.getUsers({ email: req.body.email });
    user = user[0];
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    await authService.verifyOTP(user, req.body.otp);

    user.isVerified = true;
    await user.save();

    await sendEmail(user.email, "Email verified", "emailVerified", {});

    return res.json(
      new ApiResponse(httpStatus.OK, null, "Email verified successfully")
    );
  } catch (error) {
    next(error);
  }
};
const loggedInUser = async (req, res, next) => {
  try {
    const user = await userService.getUsers({ email: req.user.email });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return res.json(
      new ApiResponse(httpStatus.OK, user, "User fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};
module.exports = {
  register,
  login,
  refreshTokens,
  changePassword,
  sendForgotPasswordEmail,
  forgotPassword,
  loggedInUser,
  sendVerificationEmail,
  verifyEmail,
};
