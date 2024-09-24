const path = require("path");
const handlebars = require("handlebars");
const fs = require("fs");
const emailQueue = require("../../../config/emailQueue");

/**
 * Sends an email by adding it to the Bull queue.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} templateName - The name of the template file (without extension).
 * @param {Object} context - The context to be used in the email template.
 * @returns {Promise<void>}
 */
const sendEmail = async (to, subject, templateName, context) => {
  console.log(to);
  const templatePath = path.join(
    __dirname,
    "../templates",
    `${templateName}.html`
  );
  const source = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(source);
  const html = template(context);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    let info;
    if (process.env.REDIS_HOST) {
      info = await emailQueue.add({ mailOptions });
      console.log("Email service using Redis");
      return info;
    } else {
      info = await transporter.sendMail(mailOptions);
      console.log("Email service using Nodemailer");
      return info;
    }
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

module.exports = sendEmail;
