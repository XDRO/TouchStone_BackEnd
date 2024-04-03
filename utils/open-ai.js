const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// // const { Configuration } = require("openai");
// const { OpenAIApi } = require("openai");
// const dotenv = require("dotenv");
// dotenv.config();

// // const configuration = new Configuration({
// //   apikey: process.env.OPEN_AI_KEY,
// // });

// const openai = new OpenAIApi({
//   apikey: process.env.OPEN_AI_KEY,
// });

module.exports = { openai };
