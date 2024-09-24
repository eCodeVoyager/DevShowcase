const userModel = require("../models/userModel");

/**
 * The user service.
 *
 * @module userService
 */

/**
 * Gets all users.
 *
 * @returns {Promise<Object>} The promise object that represents the users.
 */

/**
 * Creates a new user.
 *
 * @param {Object} userBody - The user object.
 * @returns {Promise<Object>} The promise object that represents the new user.
 */

const createUser = async (userBody) => {
  try {
    return (user = await userModel.create(userBody));
  } catch (error) {
    throw error;
  }
};

/**
 * Gets all users.
 * @param {Object} filter - The filter object.
 * @param {Object} select - The select object.
 * @returns {Promise<Object>} The promise object that represents the users.
 */

const getUsers = async (filter, select) => {
  try {
    return (users = await userModel.find(filter).select(select));
  } catch (error) {
    throw error;
  }
};

/**
 * Get a user by id.
 *
 * @param {string} id - The user id.
 * @returns {Promise<Object>} The promise object that represents the user.
 */

const getUser = async (id) => {
  try {
    return (user = await userModel.findById(id));
  } catch (error) {
    throw error;
  }
};

/**
 * Updates a user.
 * @param {string} id - The user id.
 * @param {Object} userBody - The user object.
 * @returns {Promise<Object>} The promise object that represents the updated user.
 */

const updateUser = async (id, userBody) => {
  try {
    return await userModel.findByIdAndUpdate(id, userBody, { new: true });
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes a user.
 * @param {string} id - The user id.
 * @returns {Promise<Object>} The promise object that represents the deleted user.
 */

const deleteUser = async (id) => {
  try {
    return await userModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
