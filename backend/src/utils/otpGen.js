//src/utils/otpGen.js

/**
 * Generates a six-digit OTP.
 * @returns {number} - A six-digit OTP.
 *
 */
const otpGen = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

module.exports = otpGen;
