const { HttpBadRequest } = require("../utils/err/HttpBadRequest");
const responseChat = require("../models/response");

// I may need to potentially ref this line below somehow
// const messageChat = require("../models/message");
// const messageData = await messageChat.findById(newResponse.message._id);

module.exports.generateResponse = async (req, res, next) => {
  try {
    const { response, createdAt } = req.body;
    const owner = req.user._id;

    const newResponse = await responseChat.create({
      owner,
      response,
      createdAt,
    });

    const responseData = {
      responseId: newResponse._id,
      response: newResponse.response,
      createdAt: newResponse.createdAt,
      owner: newResponse.owner,
    };
    console.log(messageData);
    return res.send(responseData);
  } catch (e) {
    if (e.name === "ValidationError") {
      return next(new HttpBadRequest("ValidationError", e.message));
    }
    return next(e);
  }
};
