const router = require("express").Router();

const { HttpNotFound } = require("../utils/err/HttpNotFound");

const auth = require("../middlewares/auth");

const {
  validateNewUserInfo,
  validateUserLogin,
  validateMessage,
  validateResponse,
} = require("../middlewares/joivalidation");

const { createUser, login, getUser } = require("../controllers/user");

const {
  userMessage,
  generateResponse,
  getHistory,
} = require("../controllers/chat");

router.post("/signup", validateNewUserInfo, createUser);

router.post("/signin", validateUserLogin, login);

router.get("/users/me", auth, getUser);

// chat items routers
// add delete routes
// router.post("/items", auth, validateMessage, userMessage);

// router.get("/items", getMessageHistory);

// // chat response routers
// // add delete routes
// router.post("/response", auth, validateResponse, generateResponse);

// router.get("/response", getResponseHistory);

router.post("/message", auth, validateMessage, userMessage);

router.get("/message", getHistory);

router.post("/response", auth, validateResponse, generateResponse);

router.use((req, res, next) => next(new HttpNotFound("Router not found")));

module.exports = router;
