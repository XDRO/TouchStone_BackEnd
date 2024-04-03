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
  deleteChat,
} = require("../controllers/chat");

router.post("/signup", validateNewUserInfo, createUser);

router.post("/signin", validateUserLogin, login);

router.get("/users/me", auth, getUser);

// validateMessage removed from userMessage route
router.post("/message", auth, userMessage);

router.get("/message", getHistory);

// validateResponse removed from generateResponse route
router.post("/response", auth, generateResponse);

// delete
router.delete("/message/:messageId", auth, deleteChat);

router.use((req, res, next) => next(new HttpNotFound("Router not found")));

module.exports = router;
