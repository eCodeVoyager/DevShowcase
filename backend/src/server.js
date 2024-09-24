// src/server.js

// Imports
const app = require("./app");
const ConnectDB = require("./config/db");
const server = require("http").createServer(app);
const checkEnvVariables = require("./utils/envChecker");
const processEmailJobs = require("./modules/email/services/emailWorker");
// Connect to Database
ConnectDB();

// Environment variables checker
checkEnvVariables();

//Redis Proccess Jobs
processEmailJobs();


// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
