const router = require("express").Router();

const { HttpNotFound } = require("../utils/err/HttpNotFound");

const auth = require("../middlewares/auth");

// const {
//   validateUserInfoBody, // createuser
//   validateUserLogin, //login
//   validateMessageBody, //generateResponse
// } = require("../middlewares/joivalidation");

const {
  validateNewUserInfo,
  validateUserLogin,
} = require("../middlewares/joivalidation");

const { createUser, login, getUser } = require("../controllers/user");

const { generateResponse, getChatHistory } = require("../controllers/chat");

router.post("/signup", validateNewUserInfo, createUser);

router.post("/signin", validateUserLogin, login);

router.get("/users/me", auth, getUser);

// chat items routers

router.post("/items", auth, generateResponse);

router.get("/items", getChatHistory);

router.use((req, res, next) => next(new HttpNotFound("Router not found")));

module.exports = router;
