const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const user = require("../models/user");

const { HttpBadRequest } = require("../utils/err/HttpBadRequest");
const { HttpNotFound } = require("../utils/err/HttpNotFound");
const { HttpConflict } = require("../utils/err/HttpConflict");
const { HttpUnauthorized } = require("../utils/err/HttpUnauthorized");

const { JWT_SECRET } = require("../utils/config");

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const hash = await bcrypt.hash(password, confirmPassword, 10);

    const newUser = await user.create({
      name,
      email,
      password: hash,
      confirmPassword: hash,
    });

    const resData = {
      newUser: {
        name: newUser.name,
        email: newUser.email,
      },
    };

    return res.send(resData);
  } catch (e) {
    if (e.name === "ValidationError") {
      return next(new HttpBadRequest("Validation Error"));
    }
    if (e.code === 11000) {
      return next(new HttpConflict("Duplicate email error"));
    }
    return next(e);
  }
};
