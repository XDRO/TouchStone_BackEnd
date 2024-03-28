const { HttpBadRequest } = require("../utils/err/HttpBadRequest");
const responseChat = require("../models/response");

// I may need to potentially ref this line below somehow
// const messageChat = require("../models/message");
const { getMessageHistory } = require("../controllers/message");

module.exports.generateResponse = async (req, res, next) => {
  try {
    const { response, createdAt } = req.body;
    const owner = req.user._id;

    const newResponse = await responseChat.create({
      owner,
      response,
      createdAt,
    });

    const message = await getMessageHistory();
    console.log(message);

    const responseData = {
      _id: newResponse._id,
      response: newResponse.response,
      message: newResponse.message,
      createdAt: newResponse.createdAt,
      owner: newResponse.owner,
    };
    console.log(responseData);
    return res.send(responseData);
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

// removed from responseData
// messageid: messageData._id,
// message: messageData.message,
