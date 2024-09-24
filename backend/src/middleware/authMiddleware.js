//src/middleware/authMiddleware.js

const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const { verifyAccessToken } = require("../utils/jwtToken");
const userService = require("../modules/users/services/userService");

function extractToken(req) {
  let token = null;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers["authorization"]) {
    const authHeader = req.headers["authorization"];
    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  } else if (req.headers["x-access-token"]) {
    token = req.headers["x-access-token"];
  }

  return token;
}

/**
 * The authentication middleware.
 * @param {Object} req - The request object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<Object>} The promise object that represents the next middleware function.
 *
 */
const authenticate = async (req, _, next) => {
  const tokenRaw = extractToken(req);

  if (!tokenRaw) {
    return next(
      new ApiError(httpStatus.UNAUTHORIZED, "Access denied. No token provided")
    );
  }

  try {
    const decoded = verifyAccessToken(tokenRaw);
    const user = await userService.getUser(decoded.id);
    if (!user) {
      return next(
        new ApiError(httpStatus.UNAUTHORIZED, "Invalid token provided")
      );
    }
    req.user = decoded;
    next();
  } catch (err) {
    return next(
      new ApiError(httpStatus.UNAUTHORIZED, "Invalid token provided")
    );
  }
};

module.exports = authenticate;
