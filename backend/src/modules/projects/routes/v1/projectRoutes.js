const router = require("express").Router();

const projectController = require("../../controllers/projectController");
const authenticate = require("../../../../middleware/authMiddleware");

router
  .route("/")
  .get(projectController.getProjects)
  .post(authenticate, projectController.createProject);

router
  .route("/:id")
  .get(projectController.getProject)
  .put(authenticate, projectController.updateProject)
  .delete(authenticate, projectController.deleteProject);

module.exports = router;
