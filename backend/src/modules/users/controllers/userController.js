// src /modules/users/controllers/userController.js

const httpStatus = require("http-status");
const userService = require("../services/userService");
const ApiResponse = require("../../../utils/apiResponse");
const ApiError = require("../../../utils/apiError");

/**
 * The user controller.
 *
 * @module userController
 */

/**
 * Gets user and users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<Object>} The promise object that represents the users.
 */

const getUsers = async (req, res, next) => {
  try {
    let users = await userService.getUsers({ ...req.query });
    if (Object.keys(req.query).length !== 0) {
      users = users[0];
    }
    if (users.length === 0) {
      return next(new ApiError(httpStatus.NOT_FOUND, "No users found"));
    }
    return res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, users, "Users retrieved successfully")
      );
  } catch (error) {
    next(error);
  }
};

/**
 * Get a user by id.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<Object>} The promise object that represents the user.
 */

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);
    return res.json(
      new ApiResponse(httpStatus.OK, user, "User retrieved successfully")
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update a user by id.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<Object>} The promise object that represents the updated user.
 */

const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized user"));
    }
    const user = await userService.updateUser(req.params.id, req.body);
    return res.json(
      new ApiResponse(httpStatus.OK, user, "User updated successfully")
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a user by id.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {Promise<Object>} The promise object that represents the deleted user.
 */

const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized user"));
    }
    const user = await userService.deleteUser(req.params.id);
    return res.json(
      new ApiResponse(httpStatus.OK, user, "User deleted successfully")
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
