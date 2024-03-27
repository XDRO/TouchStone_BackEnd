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

module.exports = mongoose.model("responseChat", responseSchema);

// module.exports.generateResponse = async (req, res, next) => {
//   try {
//     const { message, response, createdAt } = req.body;
//     const owner = req.user._id;
//     console.log(response);

//     const newChat = await chat.create({
//       owner,
//       message,
//       response,
//       createdAt,
//     });

//     const responseData = {
//       _id: newChat._id,
//       message: newChat.message,
//       response: newChat.response,
//       createdAt: newChat.createdAt,
//       owner: newChat.owner,
//     };

//     return res.send(responseData);
//   } catch (e) {
//     if (e.name === "ValidationError") {
//       return next(new HttpBadRequest("ValidationError", e.message));
//     }
//     return next(e);
//   }
// };

// module.exports.getChatHistory = async (req, res, next) => {
//   try {
//     const chatHistory = await chat.find({});
//     return res.status(200).send(chatHistory);
//   } catch (e) {
//     return next(e);
//   }
// };
