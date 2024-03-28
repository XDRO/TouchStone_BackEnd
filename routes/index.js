const router = require("express").Router();

const { HttpNotFound } = require("../utils/err/HttpNotFound");

const auth = require("../middlewares/auth");

// const {
//   validateMessageBody, //generateResponse
// } = require("../middlewares/joivalidation");

const {
  validateNewUserInfo,
  validateUserLogin,
  validateMessage,
  // validateResponse,
} = require("../middlewares/joivalidation");

const { createUser, login, getUser } = require("../controllers/user");

const { userMessage, getMessageHistory } = require("../controllers/message");

const {
  generateResponse,
  getResponseHistory,
} = require("../controllers/response");

router.post("/signup", validateNewUserInfo, createUser);

router.post("/signin", validateUserLogin, login);

router.get("/users/me", auth, getUser);

// chat items routers
// refactor this
router.post("/items", auth, validateMessage, userMessage);

router.get("/items", getMessageHistory);

// chat response routers

router.post("/response", auth, generateResponse);

router.get("/response", getResponseHistory);

// create middleware for this

router.use((req, res, next) => next(new HttpNotFound("Router not found")));

module.exports = router;
