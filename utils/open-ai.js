// const OpenAI = require("openai");
// const readlineSync = require("readline-sync");
// const colors = require("colors");
// require("dotenv").config();

// "openai": "node ./utils/open-ai.js" add this to package.json to run this in terminal

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// async function chat(req, res, next) {

//   const chatHistory = []; // store

//   while (true) {
//     const userInput = readlineSync.question(colors.yellow("You: "));
//     try {
//       // Construct messages by iterating over the history
//       const messages = chatHistory.map(([role, content]) => ({
//         role,
//         content,
//       }));

//       // add lastest user input
//       messages.push({ role: "user", content: userInput });

//       // call the API with the user input
//       const completion = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo-0125",
//         messages: messages,
//       });

//       // get complettion text/content
//       const completionText = completion.choices[0].message.content;

//       if (userInput.toLowerCase() === "exit") {
//         return;
//       }

//       // console.log(colors.green("Bot: " + completionText));

//       // Update history with user input and assistant response
//       chatHistory.push(["user", userInput]);
//       chatHistory.push(["assistant", completionText]);
//     } catch (error) {
//       console.error(colors.red(error));
//     }
//   }
// }

// chat();
