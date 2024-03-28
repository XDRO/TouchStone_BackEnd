const { HttpBadRequest } = require("../utils/err/HttpBadRequest");
const responseChat = require("../models/response");

// I may need to potentially ref this line below somehow
const messageChat = require("../models/message");

module.exports.generateResponse = async (req, res, next) => {
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

// removed from responseData
// messageid: messageData._id,
// message: messageData.message,

//  removed from generate response
// accessess the message owner by index
// if (messages[0].owner === responseData.owner) {
//   consolelog("success");
//   return res.send(responseData);
// } else {
//   console.log("message", messages[0].owner);
//   console.log("response owner", responseData.owner);
//   return res.send("Couldn't find a message that equals the response");
// }

// iterates over the messages variable to return data
// messages.forEach((message) => {
//   if (message.owner.toJSON() === responseData.owner.toJSON()) {
//     console.log("success");
//     return res.send(responseData);
//   } else {
//     console.log("message owner:", message.owner);
//     console.log("response owner:", responseData.owner);
//     return res.send("fail");
//   }
// });
