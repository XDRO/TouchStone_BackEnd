const OpenAI = require("openai");
const readlineSync = require("readline-sync");
const colors = require("colors");
const { HttpBadRequest } = require("./err/HttpBadRequest");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

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
