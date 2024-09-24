// src/modules/users/validations/userValidation.js

const Joi = require("joi");

const updateUser = {
  body: Joi.object().keys({
    full_name: Joi.string().min(3).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    username: Joi.string().min(3).max(30),
    bio: Joi.string().min(3).max(100),
    profile_image: Joi.string().uri(),
    social_links: Joi.object().keys({
      github: Joi.string().uri(),
      linkedin: Joi.string().uri(),
      twitter: Joi.string().uri(),
    }),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
    id: Joi.string().length(24),
    email: Joi.string().email(),
    username: Joi.string().min(3).max(30),
  }),
};

module.exports = {
  updateUser,
  getUsers,
};
