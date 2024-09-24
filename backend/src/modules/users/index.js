// src/modules/users/index.js

/**
 * Module index file for the users module.
 *
 * @params {Object} userController - The user controller.
 * @params {Object} userModel - The user model.
 * @params {Object} userRoutes - The user routes.
 * @params {Object} userService - The user service.
 * @params {Object} userValidation - The user validation.
 * @exports {Object} - The user module
 *
 * @module users
 */

const userController = require("./controllers/userController");
const userModel = require("./models/userModel");
const userRoutes = require("./routes/v1/userRoutes");
const userService = require("./services/userService");
const userValidation = require("./validations/userValidation");

module.exports = {
  userController,
  userModel,
  userRoutes,
  userService,
  userValidation,
};
