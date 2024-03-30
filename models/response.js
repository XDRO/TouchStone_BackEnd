const mongoose = require("mongoose");
const user = require("./user");
const message = require("./message");

const responseSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  response: {
    type: String,
    ref: message,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("responseChat", responseSchema);
