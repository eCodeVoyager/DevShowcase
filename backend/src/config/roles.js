// src/config/roles.js

const roles = {
  admin: {
    can: ["create", "read", "update", "delete"],
  },
  user: {
    can: ["read"],
  },
};

module.exports = roles;
