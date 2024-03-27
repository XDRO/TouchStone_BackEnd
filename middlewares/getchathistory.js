const messageChat = require("../models/message");
const responseChat = require("../models/response");

const getMessageHistory = async (req, res, next) => {
  try {
    const messages = await messageChat.find({});
    req.messageHistory = messages;
    next();
  } catch (e) {
    next(e);
  }
};

const getResponseHistory = async (req, res, next) => {
  try {
    const responses = await responseChat.find({});
    req.responseHistory = responses;
    next(e);
  } catch (e) {
    next(e);
  }
};

module.exports.getChatHistory = async (req, res, next) => {
  try {
    const chatHistory = await Promise.all([
      getMessageHistory(req, res, next),
      getResponseHistory(req, res, next),
    ]);
    // next();
    return res.send(chatHistory);
  } catch (e) {
    next(e);
  }
};

// module.exports.getMessageHistory = async (req, res, next) => {
//   try {
//     const messageHistory = await messageChat.find({});
//     console.log(messageHistory);
//     return res.status(200).send(messageHistory);
//   } catch (e) {
//     return next(e);
//   }
// };

// module.exports.getResponseHistory = async (req, res, next) => {
//   try {
//     const responseHistory = await responseChat.find({});
//     console.log("response");
//     return res.status(200).send(responseHistory);
//   } catch (e) {
//     return next(e);
//   }
// };
