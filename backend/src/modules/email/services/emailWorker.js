const emailQueue = require("../../../config/emailQueue");
const transporter = require("../../../config/email");

/**
 * Processes email jobs from the Bull queue.
 */

const processEmailJobs = () => {
  emailQueue.process(async (job, done) => {
    const { mailOptions } = job.data;

    try {
      let info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      done(null, info); // Mark the job as completed
    } catch (error) {
      console.error("Error sending email: ", error);
      done(error); // Mark the job as failed
    }
  });

  console.log("🚀 Email worker started");
};

module.exports = processEmailJobs;
