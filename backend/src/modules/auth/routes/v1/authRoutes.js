//src/modules/auth/routes/authRoutes.js

const router = require("express").Router();
const authController = require("../../controllers/authController");
const authValidation = require("../../validations/authValidation");
const validate = require("../../../../middleware/validatorMiddleware");
const authenticate = require("../../../../middleware/authMiddleware");

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
router.post("/login", validate(authValidation.login), authController.login);
router.post(
  "/refresh-token",
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);
router.post(
  "/change-password",
  authenticate,
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
router.post(
  "/verify-email",
  validate(authValidation.forgotPassword),
  authController.sendVerificationEmail
);
router.post(
  "/verify-email-otp",
  validate(authValidation.verifyEmail),
  authController.verifyEmail
);

router.get("/me", authenticate, authController.loggedInUser);
module.exports = router;
