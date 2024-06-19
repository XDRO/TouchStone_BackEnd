const OpenAI = require("openai");
const { HttpBadRequest } = require("../utils/err/httpbadrequest");
const { HttpNotFound } = require("../utils/err/httpnotfound");
const { HttpUnauthorized } = require("../utils/err/httpunauthorized");
const chat = require("../models/chat");
const { v4: uuidv4 } = require("uuid");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports.userMessage = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const { text } = req.body;
    const pairId = uuidv4();

    const newMessage = await chat.create({
      owner,
      text,
      chatType: "message",
      chatId: pairId,
    });

    const messageData = {
      _id: newMessage._id,
      text: newMessage.text,
      owner: newMessage.owner,
      chatType: newMessage.chatType,
      createdAt: newMessage.createdAt,
      chatId: newMessage.chatId,
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
      return next(new HttpNotFound("No user message found"));
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
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
      chatId: lastestUserMessage.chatId,
    });

    const responseData = {
      _id: newResponse._id,
      text: newResponse.text,
      owner: newResponse.owner,
      chatType: newResponse.chatType,
      createdAt: newResponse.createdAt,
      chatId: newResponse.chatId,
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

// come back to later
// this function will be used to summarize the users text, instead of using
// the first few letters
// module.exports.summarizer = async (req, res, next) => {
//   try {
//     const latestUserMessage = await chat.findOne({}).sort({ createdAt: -1 });
//     console.log(latestUserMessage);

//     if (!latestUserMessage) {
//       return next(new HttpNotFound("No user message was found"));
//     }

//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo-0301",
//       messages: [
//         {
//           role: "user",
//           content: `Summarize the following text: ${latestUserMessage.text}`,
//         },
//       ],
//       max_tokens: 50,
//       temperature: 0.5,
//     });

//     const summary = response.choices[0].message.content.trim();

//     return res.status(200).send({ summary });
//   } catch (e) {
//     console.log(e.message);
//     return next(e);
//   }
// };

// get the chat history down here
module.exports.getHistory = async (req, res, next) => {
  try {
    const history = await chat.find({});
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
