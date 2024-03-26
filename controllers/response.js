const { HttpBadRequest } = require("../utils/err/HttpBadRequest");
const responseChat = require("../models/response");

module.exports.generateResponse = async (req, res, next) => {
  try {
    const { response, createdAt } = req.body;
    const owner = req.user._id;
    // figure out what to do with messagew
    const message = req.user.message;
    console.log(message);
    console.log(response);

    const newResponse = await responseChat.create({
      owner,
      response,
      createdAt,
    });

    const responseData = {
      _id: newResponse._id,
      response: newResponse.response,
      createdAt: newResponse.createdAt,
      owner: newResponse.owner,
    };

    return res.send(responseData);
  } catch (e) {
    if (e.name === "ValidationError") {
      return next(new HttpBadRequest("ValidationError", e.message));
    }
    return next(e);
  }
};
