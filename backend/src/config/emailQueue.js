const Queue = require("bull");

require("dotenv").config();

/**
 * Creates a new Bull queue for handling email jobs.
 * @type {Queue}
 */
const emailQueue = new Queue("emailQueue", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
});

module.exports = emailQueue;
