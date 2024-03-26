const mongoose = require("mongoose");
const user = require("./user");

const chatSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  response: {
    choices: [
      {
        text: {
          type: String,
          required: true,
        },
        finish_reason: {
          type: String,
          required: true,
        },
      },
    ],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("chat", chatSchema);
