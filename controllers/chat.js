const OpenAI = require("openai");
const { HttpBadRequest } = require("../utils/err/httpbadrequest");
const { HttpNotFound } = require("../utils/err/httpnotfound");
// const { HttpUnauthorized } = require("../utils/err/httpunauthorized");
const { HttpForbidden } = require("../utils/err/httpforbidden");
const chat = require("../models/chat");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports.userMessage = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const { text, chatId } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: text,
        },
      ],
    });

    const userChat = await chat.findById(chatId);

    const completionText = completion.choices[0].message.content;
    if (chatId) {
      const messageData = await chat.findByIdAndUpdate(
        userChat,
        {
          $addToSet: { messages: { message: text, response: completionText } },
        },
        { new: true },
      );

      // return res.send(addMessage);
      return res.status(200).json({ messageData });
    }
    const newMessage = await chat.create({
      owner,
      messages: [
        {
          message: text,
          response: completionText,
        },
      ],
    });

    const messageData = {
      _id: newMessage._id,
      owner: newMessage.owner,
      messages: newMessage.messages,
      createdAt: newMessage.createdAt,
    };

    return res.status(200).json({ messageData });
  } catch (e) {
    if (e.name === "ValidationError") {
      return next(new HttpBadRequest(e.message));
    }

    return next(e);
  }
};

module.exports.getHistory = async (req, res, next) => {
  try {
    const { ownerId } = req.params;

    if (!ownerId) {
      return res.status(400).send({ error: "Owner ID is required" });
    }

    const reqUser = req.user._id;

    if (reqUser.toString() !== ownerId) {
      return res.status(403).send({ error: "Unauthorized" });
    }

    const history = await chat.find({ owner: ownerId });

    return res.status(200).send(history);
  } catch (e) {
    // Pass errors to the next middleware for handling
    return next(e);
  }
};

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
      return next(new HttpForbidden("Forbidden"));
    }

    await chat.deleteOne({ _id: messageId });

    return res.status(200).json({ message: "Chat deleted" });
  } catch (e) {
    if (e.name === "CastError") {
      return next(new HttpBadRequest(e.message));
    }
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
