const OpenAI = require("openai");
const thread = require("../models/thread");
const { userMessage, generateResponse } = require("./chat");
const { HttpBadRequest } = require("../utils/err/httpbadrequest");
const { HttpNotFound } = require("../utils/err/httpnotfound");

module.exports.createThread = async (req, res, next) => {
  try {
    const { owner } = req.user._id;
    const { messages, metadata, tool_resources } = req.body;

    let threadData = messages || [];

    const userMessageData = await userMessage(req.body, owner);
    threadData.push(userMessageData);

    const responseMessageData = await generateResponse(req.body, owner);
    threadData.push(responseMessageData);

    const newThread = new thread({
      owner,
      messages: threadData,
      metadata: metadata || {},
      tool_resources: tool_resources || {},
    });

    await newThread.save();

    const responseData = {
      owner: newThread._id,
      messages: newThread.messages,
      metadata: newThread.metadata,
      tool_resources: newThread.tool_resources,
      createdAt: newThread.createdAt,
    };

    return res.send(responseData);
  } catch (e) {
    return next(e);
  }
};
