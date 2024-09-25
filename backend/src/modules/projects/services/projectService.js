const projectModel = require("../models/projectModel");

const createProject = async (project) => {
  try {
    return (project = await projectModel.create(project));
  } catch (error) {
    throw error;
  }
};

const getProjects = async (filter, select) => {
  try {
    return (projects = await projectModel.find(filter).select(select));
  } catch (error) {
    throw error;
  }
};

const getProjectsByDeveloper = async (developerId) => {
  try {
    return (projects = await projectModel.find({ developer: developerId }));
  } catch (error) {
    throw error;
  }
};

const getProject = async (id) => {
  try {
    return (project = await projectModel.findById(id));
  } catch (error) {
    throw error;
  }
};

const updateProject = async (id, updateBody) => {
  try {
    return await projectModel.findByIdAndUpdate(id, updateBody, { new: true });
  } catch (error) {
    throw error;
  }
};

const deleteProject = async (id) => {
  try {
    await projectModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectsByDeveloper,
};
