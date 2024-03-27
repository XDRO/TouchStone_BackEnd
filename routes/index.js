const router = require("express").Router();

const { HttpNotFound } = require("../utils/err/HttpNotFound");

const auth = require("../middlewares/auth");

// const {
//   validateMessageBody, //generateResponse
// } = require("../middlewares/joivalidation");

const {
  validateNewUserInfo,
  validateUserLogin,
  validateChat,
  // validateResponse,
} = require("../middlewares/joivalidation");

const { createUser, login, getUser } = require("../controllers/user");

const { userMessage, getMessageHistory } = require("../controllers/message");

const {
  generateResponse,
  getResponseHistory,
} = require("../controllers/response");

// gets both response and message
// const { getChatHistory } = require("../middlewares/getchathistory");

router.post("/signup", validateNewUserInfo, createUser);

router.post("/signin", validateUserLogin, login);

router.get("/users/me", auth, getUser);

// chat items routers
// refactor this
router.post("/items", auth, validateChat, userMessage);

router.get("/items", getMessageHistory);

// chat response routers

router.post("/response", auth, generateResponse);

// create middleware for this

router.use((req, res, next) => next(new HttpNotFound("Router not found")));

module.exports = router;
