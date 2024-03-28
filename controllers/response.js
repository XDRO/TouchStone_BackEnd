const { HttpBadRequest } = require("../utils/err/HttpBadRequest");
const responseChat = require("../models/response");
const messageChat = require("../models/message");

module.exports.generateResponse = async (req, res, next) => {
  // await a users message here, when they add a message
  // generate a response
  try {
    const { response, createdAt } = req.body;
    const messages = await messageChat.find({});
    const owner = req.user._id;

    const newResponse = await responseChat.create({
      owner,
      response,
      createdAt,
      message: messages._id,
    });

    const responseData = {
      _id: newResponse._id,
      response: newResponse.response,
      message: newResponse.message,
      createdAt: newResponse.createdAt,
      owner: newResponse.owner,
    };

    let ownerMatchFound = false;

    messages.forEach((message) => {
      if (message.owner.equals(responseData.owner)) {
        ownerMatchFound = true;
      } else {
        return next(e);
      }
    });

    if (ownerMatchFound) {
      return res.send(responseData);
    } else {
      return next(e);
    }
  } catch (e) {
    if (e.name === "ValidationError") {
      console.error(e.message);
      return next(new HttpBadRequest("ValidationError", e.message));
    }
    return next(e);
  }
};

module.exports.getResponseHistory = async (req, res, next) => {
  try {
    const responseHistory = await responseChat.find({});
    return res.status(200).send(responseHistory);
  } catch (e) {
    return next(e);
  }
};
