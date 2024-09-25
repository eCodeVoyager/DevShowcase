const router = require("express").Router();

const projectController = require("../../controllers/projectController");
const authenticate = require("../../../../middleware/authMiddleware");
const validate = require("../../../../middleware/validatorMiddleware");
const projectValidation = require("../../validations/projectValidation");

router
  .route("/")
  .get(validate(projectValidation.getProjects), projectController.getProjects)
  .post(
    validate(projectValidation.createProject),
    authenticate,
    projectController.createProject
  );

router.get("/developer/:id", projectController.getProjectsByDeveloper);

router
  .route("/:id")
  .get(projectController.getProject)
  .put(
    validate(projectValidation.updateProject),
    authenticate,
    projectController.updateProject
  )
  .delete(authenticate, projectController.deleteProject);

module.exports = router;
