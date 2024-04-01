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

router.post("/message", auth, validateMessage, userMessage);

router.get("/message", getHistory);

router.post("/response", auth, validateResponse, generateResponse);

router.use((req, res, next) => next(new HttpNotFound("Router not found")));

module.exports = router;
