const joi = require("joi");
const { canTreatArrayAsAnd } = require("sequelize/lib/utils");

const createProject = {
  body: joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    features: joi
      .array()
      .items(
        joi.object().keys({
          title: joi.string().required(),
          description: joi.string().required(),
        })
      )
      .required(),
    tech_stack: joi.array().items(joi.string()).required(),
    repo_url: joi.string().uri().required(),
    live_url: joi.string().uri(),
    tags: joi.array().items(joi.string()),
    is_featured: joi.boolean(),
    category: joi.string().required(),
  }),
};

const getProjects = {
  query: joi.object().keys({
    page: joi.number().min(1),
    limit: joi.number().min(1),
    id: joi.string().length(24),
    title: joi.string().min(3).max(30),
    developer: joi.string().length(24),
    is_featured: joi.boolean(),
  }),
};

const updateProject = {
  body: joi.object().keys({
    title: joi.string(),
    description: joi.string(),
    features: joi.array().items(
      joi.object().keys({
        title: joi.string(),
        description: joi.string(),
      })
    ),
    tech_stack: joi.array().items(joi.string()),
    repo_url: joi.string().uri(),
    live_url: joi.string().uri(),
    tags: joi.array().items(joi.string()),
    is_featured: joi.boolean(),
    category: joi.string(),
  }),
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
};
