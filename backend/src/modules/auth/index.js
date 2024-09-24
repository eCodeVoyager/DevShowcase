// src/ modules/auth/index.js
/**
 * Module index file for the auth module.
 *
 * @params {Object} authController - The auth controller.
 * @params {Object} authRoutes - The auth routes.
 * @params {Object} authService - The auth service.
 * @params {Object} authValidation - The auth validation.
 * @exports {Object} - The auth module
 *
 * @module auth
 */

const authController = require("./controllers/authController");
const authRoutes = require("./routes/v1/authRoutes");
const authService = require("./services/authService");
const authValidation = require("./validations/authValidation");

module.exports = {
  authController,
  authRoutes,
  authService,
  authValidation,
};
