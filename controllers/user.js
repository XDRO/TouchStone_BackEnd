const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const user = require("../models/user");

const { HttpBadRequest } = require("../utils/err/HttpBadRequest");
const { HttpNotFound } = require("../utils/err/HttpNotFound");
const { HttpConflict } = require("../utils/err/HttpConflict");
// const { HttpUnauthorized } = require("../utils/err/HttpUnauthorized");

const { JWT_SECRET } = require("../utils/config");

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    const newUser = await user.create({
      name,
      email,
      password: hash,
      confirmPassword,
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
      return next(new HttpBadRequest("Validation Error", e.message));
    }
    if (e.code === 11000) {
      return next(new HttpConflict("Duplicate email error"));
    }
    return next(e);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await user.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: foundUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.send({ token });
  } catch (e) {
    if (e.name === "INVALID_EMAIL_PASSWORD") {
      return next(new HttpBadRequest("Invalid email or password"));
    }
    return next(e);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const userData = await user.findById(_id).orFail();

    if (!userData) {
      return next(new HttpNotFound("User not found"));
    }

    return res.json(userData);
  } catch (e) {
    return next(e);
  }
};

// possibly add update user controller
// if you decide to add an avatar
