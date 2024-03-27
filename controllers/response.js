const { HttpBadRequest } = require("../utils/err/HttpBadRequest");
// const message = require("../models/message");
const responseChat = require("../models/response");

module.exports.generateResponse = async (req, res, next) => {
  try {
    const { response, createdAt } = req.body;
    const owner = req.user._id;
    // figure out what to do with message
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

// module.exports.generateResponse = async (req, res, next) => {
//   try {
//     const { message, response, createdAt } = req.body;
//     const owner = req.user._id;
//     console.log(response);

//     const newChat = await chat.create({
//       owner,
//       message,
//       response,
//       createdAt,
//     });

//     const responseData = {
//       _id: newChat._id,
//       message: newChat.message,
//       response: newChat.response,
//       createdAt: newChat.createdAt,
//       owner: newChat.owner,
//     };

//     return res.send(responseData);
//   } catch (e) {
//     if (e.name === "ValidationError") {
//       return next(new HttpBadRequest("ValidationError", e.message));
//     }
//     return next(e);
//   }
// };

// module.exports.getChatHistory = async (req, res, next) => {
//   try {
//     const chatHistory = await chat.find({});
//     return res.status(200).send(chatHistory);
//   } catch (e) {
//     return next(e);
//   }
// };