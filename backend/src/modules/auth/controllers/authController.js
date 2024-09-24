// src/modules/auth/controllers/authController.js

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
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Invalid email/phone or password"
      );
    }

    // Generate tokens
    const accessToken = jwt.generateAccessToken(user);
    const refreshToken = jwt.generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    // Respond with user details and tokens
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
    const decoded = verifyRefreshToken(refreshToken);
    const user = await userService.getUserById(decoded.id);

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
    }

    const accessToken = generateAccessToken(user);
    return res.json(new ApiResponse(httpStatus.OK, { accessToken }));
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

    await authService.changePassword(req.user.id, oldPassword, newPassword);
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
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    const otp = otpGen();
    await authService.sendForgotPasswordEmail(user, otp);
    await sendEmail(email, "Forgot Password", "resetPassword", { otp });

    return res.json(
      new ApiResponse(httpStatus.OK, null, "Email sent successfully")
    );
  } catch (error) {
    next(error);
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
    await authService.forgotPassword(req.body);
    return res.json(
      new ApiResponse(httpStatus.OK, null, "Password reset successfully")
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
};
