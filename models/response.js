const mongoose = require("mongoose");
const user = require("./user");
const message = require("./message");

const responseSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: message,
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

module.exports = mongoose.model("response", responseSchema);
