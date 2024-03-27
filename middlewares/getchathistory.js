const messageChat = require("../models/message");
const responseChat = require("../models/response");

const getMessageHistory = () => {
  return messageChat.find({}).exec();
};

const getResponseHistory = () => {
  return responseChat.find({}).exec();
};

module.exports.getChatHistory = async (req, res, next) => {
  // wrap async ops in promises
  try {
    const [messages, response] = await Promise.all([
      getMessageHistory(),
      getResponseHistory(),
    ]);
    const chatHistory = { messages, response };
    res.send(chatHistory);
  } catch (e) {
    next(e);
  }
};
