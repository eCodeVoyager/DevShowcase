//src/config/email.js
const nodemailer = require("nodemailer");
/**
 * Email configuration object.
 * @type {Object}
 * @property {string} service - The email service to use (e.g., 'gmail').
 * @property {string} host - The SMTP host.
 * @property {number} port - The SMTP port.
 * @property {boolean} secure - Whether to use SSL/TLS.
 * @property {Object} auth - The authentication object.
 * @property {string} auth.user - The email user.
 * @property {string} auth.pass - The email password.
 * @property {boolean} pool - Whether to use connection pooling.
 * @property {number} maxConnections - Maximum number of connections.
 * @property {number} maxMessages - Maximum number of messages per connection.
 */
const emailConfig = {
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool: process.env.EMAIL_POOL === "true",
  maxConnections: parseInt(process.env.EMAIL_MAX_CONNECTIONS, 10),
  maxMessages: parseInt(process.env.EMAIL_MAX_MESSAGES, 10),
};

const transporter = nodemailer.createTransport(emailConfig);

module.exports = transporter;
