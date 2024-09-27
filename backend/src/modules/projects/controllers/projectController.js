const projectService = require("../services/projectService");
const ApiResponse = require("../../../utils/apiResponse");
const ApiError = require("../../../utils/apiError");
const httpStatus = require("http-status");
const cloudinaryUpload = require("../../../utils/uploadUtils");

const createProject = async (req, res, next) => {
  try {
    let imageUrls = [];
    let videoUrl;

    if (req.files && req.files.length > 0) {
      const imageFiles = req.files.filter((file) =>
        file.mimetype.startsWith("image/")
      );
      if (imageFiles.length > 0) {
        const imageResults = await cloudinaryUpload.uploadMultipleFiles(
          imageFiles,
          {
            resource_type: "image",
          }
        );
        imageUrls = imageResults.map((result) => result.secure_url);
      }

      const videoFile = req.files.filter((file) =>
        file.mimetype.startsWith("video/")
      );
      if (videoFile.length > 0) {
        const videoResults = await cloudinaryUpload.uploadMultipleFiles(
          videoFile,
          {
            resource_type: "video",
          }
        );
        videoUrl = videoResults.map((result) => result.secure_url);
      }
    }

    const project = await projectService.createProject({
      ...req.body,
      developer: req.user.id,
      images: imageUrls,
      video: videoUrl[0],
    });

    return res.json(
      new ApiResponse(
        httpStatus.CREATED,
        project,
        "Project created successfully"
      )
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    let projects = await projectService.getProjects({ ...req.query });
    if (Object.keys(req.query).length !== 0) {
      projects = projects[0];
    }
    if (projects.length === 0) {
      return next(new ApiError(httpStatus.NOT_FOUND, "No projects found"));
    }
    return res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(
          httpStatus.OK,
          projects,
          "Projects retrieved successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

const getProjectsByDeveloper = async (req, res, next) => {
  try {
    const projects = await projectService.getProjectsByDeveloper(req.params.id);
    return res.json(
      new ApiResponse(
        httpStatus.OK,
        projects,
        "Projects retrieved successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await projectService.getProject(req.params.id);
    return res.json(
      new ApiResponse(httpStatus.OK, project, "Project retrieved successfully")
    );
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    let project = await projectService.getProject(req.params.id);
    if (project.developer.toString() !== req.user.id) {
      return next(
        new ApiError(httpStatus.FORBIDDEN, "You are not authorized to do this")
      );
    }
    project = await projectService.updateProject(req.params.id, req.body);
    return res.json(
      new ApiResponse(httpStatus.OK, project, "Project updated successfully")
    );
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await projectService.getProject(req.params.id);
    if (project.developer.toString() !== req.user.id) {
      return next(
        new ApiError(httpStatus.FORBIDDEN, "You are not authorized to do this")
      );
    }

    await projectService.deleteProject(req.params.id);
    return res.json(
      new ApiResponse(httpStatus.OK, null, "Project deleted successfully")
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByDeveloper,
};
