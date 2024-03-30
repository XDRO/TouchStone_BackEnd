const mongoose = require("mongoose");
const user = require("./user");

const messageSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
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

module.exports = mongoose.model("messageChat", messageSchema);

// removed from response
// choices: [
//   {
//     text: {
//       type: String,
//       required: true,
//     },
//     finish_reason: {
//       type: String,
//       required: true,
//     },
//   },
// ],
