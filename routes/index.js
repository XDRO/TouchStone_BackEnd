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

router.post("/signup", validateNewUserInfo, createUser);

router.post("/signin", validateUserLogin, login);

router.get("/users/me", auth, getUser);

// chat items routers
// refactor this
router.post("/items", auth, validateChat, userMessage);

router.post("/items", auth, validateChat, generateResponse);

// create middleware for this
router.get("/items", getMessageHistory, getResponseHistory);

router.use((req, res, next) => next(new HttpNotFound("Router not found")));

module.exports = router;
