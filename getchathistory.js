// was in middlewares
// told by tutor to get history seperatly
// const messageChat = require("./models/message");
// const responseChat = require("./models/response");

// const getMessageHistory = () => {
//   return messageChat.find({}).exec();
// };

// const getResponseHistory = () => {
//   return responseChat.find({}).exec();
// };

// module.exports.getChatHistory = async (req, res, next) => {
//   // wrap async ops in promises
//   try {
//     const [messages, responses] = await Promise.all([
//       getMessageHistory(),
//       getResponseHistory(),
//     ]);
//     const chatHistory = { messages, responses };
//     res.send(chatHistory);
//   } catch (e) {
//     next(e);
//   }
// };