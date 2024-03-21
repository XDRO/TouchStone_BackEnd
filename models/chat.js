const mongoose = require("mongoose");
const user = require("./user");

const chatSchema = new mongoose.Schema({
  owner: {
    type: mongoose.schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  object: {
    type: String,
  },
  createdAt: {
    type: String,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("chat", chatSchema);
