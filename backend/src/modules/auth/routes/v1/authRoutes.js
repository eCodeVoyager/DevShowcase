//src/modules/auth/routes/authRoutes.js

const router = require("express").Router();
const authController = require("../../controllers/authController");
const authValidation = require("../../validations/authValidation");
const validate = require("../../../../middleware/validatorMiddleware");
const authMiddleware = require("../../../../middleware/authMiddleware");

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
router.post("/login", validate(authValidation.login), authController.login);
router.post(
  "/refresh-tokens",
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);
router.post(
  "/change-password",
  authMiddleware,
  validate(authValidation.changePassword),
  authController.changePassword
);

router.post(
  "/forgot-password",
  validate(authValidation.forgotPassword),
  authController.sendForgotPasswordEmail
);
router.post(
  "/forgot-password-verify",
  validate(authValidation.forgotPasswordVerify),
  authController.forgotPassword
);
module.exports = router;
