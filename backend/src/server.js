// src/server.js

// Imports
const app = require("./app");
const ConnectDB = require("./config/db");
const server = require("http").createServer(app);
const checkEnvVariables = require("./utils/envChecker");
const processEmailJobs = require("./modules/email/services/emailWorker");
const keepServerAlive = require("keep-alive-package");
// Connect to Database
ConnectDB();

// Environment variables checker
checkEnvVariables();

//Redis Proccess Jobs
processEmailJobs();

keepServerAlive(process.env.BACKEND_SERVER_URL, "10m");

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
