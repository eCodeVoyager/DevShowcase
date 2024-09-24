const Redis = require("ioredis");
require("dotenv").config();

/**
 * Redis configuration
 * @type {Object}
 * @property {string} host - The Redis host.
 * @property {number} port - The Redis port.
 * @property {string} password - The Redis password.
 */

if (process.env.REDIS_HOST) {
  const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  });

  redis.on("connect", () => {
    console.log("🚀 Redis Connected successfully");
  });

  redis.on("error", (error) => {
    console.error(error);
  });

  module.exports = redis;
} else {
  module.exports = null;
  console.log("⚠️  No Redis Configured, Redis is disabled");
}
