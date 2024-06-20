const mongoose = require("mongoose");
const user = require("./user");

const messagesSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
});

const chatSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  messages: [messagesSchema],
  chatId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("chat", chatSchema);
