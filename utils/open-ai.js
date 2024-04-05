const OpenAI = require("openai");
<<<<<<< HEAD
const readlineSync = require("readline-sync");
const colors = require("colors");
const { HttpBadRequest } = require("./err/HttpBadRequest");

=======
>>>>>>> 1130afc093e4b547d7d23084b84afa763e3ba9be
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

<<<<<<< HEAD
async function chat(req, res, next) {
  console.log(colors.bold.green(`Welcome to TouchStone, powered by openai`));
  console.log(colors.bold.green(`Start a chat with TouchStone`));

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));
    try {
      // call the API with the user input
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [{ role: "user", content: userInput }],
      });

      // get complettion text/content
      console.log(completion.choices[0].message.content);
      const completionText = completion.choices[0].message.content;

      if (userInput.toLowerCase() === "exit") {
        return;
      }

      console.log(colors.green("Bot: " + completionText));
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

chat();
=======
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
>>>>>>> 1130afc093e4b547d7d23084b84afa763e3ba9be
