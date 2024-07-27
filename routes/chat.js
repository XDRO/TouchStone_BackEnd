const router = require("express").Router();

const auth = require("../middlewares/auth");

const { validateUserMessage } = require("../middlewares/joivalidation");

const { userMessage, getHistory, deleteChat } = require("../controllers/chat");

router.post("/message", auth, validateUserMessage, userMessage);

router.get("/message/:ownerId", auth, getHistory);

router.delete("/message/:messageId", auth, deleteChat);

module.exports = router;
