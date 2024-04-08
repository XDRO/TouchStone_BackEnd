const OpenAI = require("openai");
const readlineSync = require("readline-sync");
const colors = require("colors");
require("dotenv").config();
const { HttpBadRequest } = require("../utils/err/HttpBadRequest");
const { HttpNotFound } = require("../utils/err/HttpNotFound");
const { HttpUnauthorized } = require("../utils/err/HttpUnauthorized");

const chat = require("../models/chat");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

module.exports.userMessage = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const { text } = req.body;

    const newMessage = await chat.create({
      owner,
      text,
      chatType: "message",
    });

    const messageData = {
      _id: newMessage._id,
      text: newMessage.text,
      owner: newMessage.owner,
      chatType: newMessage.chatType,
      createdAt: newMessage.createdAt,
    };

    return res.send(messageData);
  } catch (e) {
    return next(new HttpBadRequest(e.message));
  }
};

module.exports.generateResponse = async (req, res, next) => {
  try {
    const owner = req.user._id;

    const lastestUserMessage = await chat.findOne({}).sort({ createdAt: -1 });

    if (!lastestUserMessage) {
      console.log(lastestUserMessage);
      return next(new HttpNotFound("No user message found"));
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "user",
          content: lastestUserMessage.text,
        },
        {
          role: "assistant",
          content: "fake chatGpt response",
        },
      ],
    });

    const completionText = completion.choices[0].message.content;

    const newResponse = await chat.create({
      owner,
      text: completionText,
      chatType: "response",
    });

    const responseData = {
      _id: newResponse._id,
      text: newResponse.text,
      owner: newResponse.owner,
      chatType: newResponse.chatType,
      createdAt: newResponse.createdAt,
    };

    let ownerMatchFound = false;

    const eachMessage = await chat.find({});

    eachMessage.forEach((message) => {
      if (message.owner.equals(responseData.owner)) {
        ownerMatchFound = true;
      } else {
        return next(e);
      }
    });

    if (ownerMatchFound) {
      return res.send(responseData);
    }

    return next(e);
  } catch (e) {
    if (e.name === "ValidationError") {
      return next(new HttpBadRequest(e.message));
    }
    console.log("err at catch");
    return next(e);
  }
};

// get the chat history down here
module.exports.getHistory = async (req, res, next) => {
  try {
    const history = await chat.find({});
    console.log(history);
    return res.status(200).send(history);
  } catch (e) {
    return next(e);
  }
};

// Add delete items controller
module.exports.deleteChat = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const reqUser = req.user._id;
    const userChat = await chat.findById(messageId);

    if (userChat === null) {
      return next(new HttpNotFound("chat not found"));
    }

    const { owner } = userChat;

    if (!owner.equals(reqUser)) {
      return next(new HttpUnauthorized("Not Authorized"));
    }

    await chat.deleteOne({ _id: messageId });

    return res.status(200).json({ message: "Chat deleted" });
  } catch (e) {
    console.error(e);
    if (e.name === "CastError") {
      return next(new HttpBadRequest(e.message));
    }
    return next(e);
  }
};

// previous generate response controller before integration
// module.exports.generateResponse = async (req, res, next) => {
//   // await a users message here, when they add a message
//   // generate a response
//   try {
//     const messages = await chat.find({});
//     const owner = req.user._id;

//     const newResponse = await chat.create({
//       owner,
//       text: "fake chatGpt response",
//       chatType: "response",
//     });

//     const responseData = {
//       _id: newResponse._id,
//       text: newResponse.text,
//       owner: newResponse.owner,
//       chatType: newResponse.chatType,
//       createdAt: newResponse.createdAt,
//     };

//     let ownerMatchFound = false;

//     messages.forEach((message) => {
//       if (message.owner.equals(responseData.owner)) {
//         ownerMatchFound = true;
//       } else {
//         return next(e);
//       }
//     });

//     if (ownerMatchFound) {
//       return res.send(responseData);
//     }
//     return next(e);
//   } catch (e) {
//     if (e.name === "ValidationError") {
//       return next(new HttpBadRequest(e.message));
//     }
//     console.log("err at catch");
//     return next(e);
//   }
// };
