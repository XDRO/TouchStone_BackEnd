const router = require("express").Router();

const { HttpNotFound } = require("../utils/err/httpnotfound");

const auth = require("../middlewares/auth");

const {
  validateNewUserInfo,
  validateUserLogin,
  validateUserMessage,
} = require("../middlewares/joivalidation");

const { createUser, login, getUser } = require("../controllers/user");

const {
  userMessage,
  generateResponse,
  getHistory,
  deleteChat,
  // summarizer,
  // createThread,
} = require("../controllers/chat");

// const {  } = require("../controllers/thread");

router.post("/signup", validateNewUserInfo, createUser);

router.post("/signin", validateUserLogin, login);

router.get("/users/me", auth, getUser);

// validateMessage removed from userMessage route
router.post("/message", auth, validateUserMessage, userMessage);

router.get("/message", getHistory);

// validateResponse removed from generateResponse route
router.post("/response", auth, generateResponse);

// create thread
// router.post("/threads", createThread);

// use later
// router.post("/summarizer", summarizer);
// delete
router.delete("/message/:messageId", auth, deleteChat);

router.use((req, res, next) => next(new HttpNotFound("Router not found")));

module.exports = router;
