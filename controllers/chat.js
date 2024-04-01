const { HttpBadRequest } = require("../utils/err/HttpBadRequest");
const chat = require("../models/chat");

// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apikey: process.env.OPEN_AI_KEY,
// });

// const openai = new OpenAIApi(configuration);

// async function main() {
//   const chatCompletion = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: "What is the capital of Georgia" }],
//   });
//   console.log(chatCompletion.data.choices[0].message.content);
// }

// main();

module.exports.userMessage = async (req, res, next) => {
  try {
    const owner = req.user._id;

    const newMessage = await chat.create({
      owner,
      text: "fake user message",
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
  // await a users message here, when they add a message
  // generate a response
  try {
    const messages = await chat.find({});
    const owner = req.user._id;

    const newResponse = await chat.create({
      owner,
      text: "fake chatGpt response",
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

    messages.forEach((message) => {
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