// const mongoose = require("mongoose");
const { HttpBadRequest } = require("../utils/err/HttpBadRequest");
const messageChat = require("../models/message");

module.exports.userMessage = async (req, res, next) => {
  try {
    const { message, createdAt } = req.body;
    const owner = req.user._id;

    const newMessage = await messageChat.create({
      owner,
      message,
      createdAt,
    });

    const messageData = {
      _id: newMessage._id,
      message: newMessage.message,
      createdAt: newMessage.createdAt,
      owner: newMessage.owner,
    };

    return res.send(messageData);
  } catch (e) {
    return next(new HttpBadRequest(e.message));
  }
};

// delete item controller
// and possibly like and dislike controllers

module.exports.getMessageHistory = async (req, res, next) => {
  try {
    const messageHistory = await messageChat.find({});
    console.log(messageHistory);
    return res.status(200).send(messageHistory);
  } catch (e) {
    return next(e);
  }
};
