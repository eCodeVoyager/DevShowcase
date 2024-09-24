//src/utils/envChecker.js

const dotenv = require("dotenv");
dotenv.config();

const checkEnvVariables = () => {
  const requiredVariables = [
    "MONGO_URI",
    "REFRESH_TOKEN_SECRET",
    "ACCESS_TOKEN_SECRET",
    "ACCESS_TOKEN_LIFE",
    "REFRESH_TOKEN_LIFE",
    "PORT",
    "LOGGER_LEVEL",
    "EMAIL_SERVICE",
    "EMAIL_HOST",
    "EMAIL_PORT",
    "EMAIL_USER",
    "EMAIL_PASS",
    "REDIS_HOST",
    "REDIS_PORT",
    "REDIS_PASSWORD",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ];

  const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable]
  );

  if (missingVariables.length > 0) {
    console.log(
      `⚠️  Missing environment variables: ${missingVariables.join(", ")}`
    );
  } else {
    console.log("✅ All required environment variables are set.");
  }
};

module.exports = checkEnvVariables;
