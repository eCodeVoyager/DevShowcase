// src/modules/auth/routes/authRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const userValidation = require("../../validations/userValidation");
const validate = require("../../../../middleware/validatorMiddleware");
const authenticate = require("../../../../middleware/authMiddleware");

router.use(authenticate);
router
  .route("/")
  .get(validate(userValidation.getUsers), userController.getUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .put(validate(userValidation.updateUser), userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
