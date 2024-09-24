const projectModel = require("./models/projectModel");
const projectController = require("./controllers/projectController");
const projectRoutes = require("./routes/v1/projectRoutes");
const projectService = require("./services/projectService");
const projectValidation = require("./validations/projectValidation");
module.exports = {
  projectModel,
  projectController,
  projectRoutes,
  projectService,
  projectValidation,
};
