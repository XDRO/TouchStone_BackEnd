const mongoose = require("mongoose");
const user = require("./user");

const chatSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  chatType: {
    type: String,
    enum: ["message", "response"],
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  message: {
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
