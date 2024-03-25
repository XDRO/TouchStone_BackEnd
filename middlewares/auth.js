const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { HttpUnauthorized } = require("../utils/err/HttpUnauthorized");

module.exports = async (req, res, next) => {
  const { auth } = req.headers;

  if (!auth || !auth.startsWith("Bearer ")) {
    return next(new HttpUnauthorized("Authorizatio0n header is missing"));
  }

  const token = auth.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch {
    return next(new HttpUnauthorized("Invalid token"));
  }

  return next();
};
