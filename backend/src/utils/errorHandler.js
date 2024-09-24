//src/utils/errorHandler.js
const ApiError = require("./apiError");

const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, "Route Not Found");
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    err = new ApiError(400, "Validation Error", messages);
  }

  // Handle Mongoose duplicate key errors
  if (err.code && err.code === 11000) {
    const message = "Duplicate field value entered";
    err = new ApiError(400, message);
  }

  // Handle other Mongoose errors
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    err = new ApiError(404, message);
  }

  // Check if the error is an instance of ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }

  // Log the error for debugging purposes
  console.error(err);

  // Generic error handler for unexpected errors
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
