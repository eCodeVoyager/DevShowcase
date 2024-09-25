// src/app.js

require("dotenv").config();
const hpp = require("hpp");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const redis = require("./config/redis");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

// Import routes and middlewares
const { users, auth, projects } = require("./index");
const { errorHandler, notFoundHandler } = require("./utils/errorHandler");

// Load environment variables from .env file

const app = express();

// Keep server alive

//Middlewares
const allMiddlewares = [
  morgan(process.env.LOGGER_LEVEL === "development" ? "dev" : "combined"),
  helmet(),
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20000,
  }),
  mongoSanitize(),
  hpp(),
  cookieParser(),
  bodyParser.json(),
  cors(),
];

// Use middlewares
app.use(allMiddlewares);

//base route
app.get("/", (_, res) => {
  res.json({
    message: "Welcome to the DevShowcase API😀",
    status: "Success✅",
    server_status: "Working🆙",
    server_time: `${new Date().toLocaleString()}⌛`,
  });
});
// Use routes
app.use("/api/v1/auth", auth.authRoutes);
app.use("/api/v1/users", users.userRoutes);
app.use("/api/v1/projects", projects.projectRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
