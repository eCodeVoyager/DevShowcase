const router = require("express").Router();

const projectController = require("../../controllers/projectController");
const authenticate = require("../../../../middleware/authMiddleware");
const validate = require("../../../../middleware/validatorMiddleware");
const projectValidation = require("../../validations/projectValidation");
const upload = require("../../../../middleware/multerMiddleware");

router
  .route("/")
  .get(validate(projectValidation.getProjects), projectController.getProjects)
  .post(
    validate(projectValidation.createProject),
    authenticate,
    upload.array("media", 5),
    projectController.createProject
  );

router.get("/developer/:id", projectController.getProjectsByDeveloper);

router
  .route("/:id")
  .get(projectController.getProject)
  .put(
    validate(projectValidation.updateProject),
    authenticate,
    upload.array("media", 5),
    projectController.updateProject
  )
  .delete(authenticate, projectController.deleteProject);

module.exports = router;
