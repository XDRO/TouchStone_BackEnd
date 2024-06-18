// const OpenAI = require("openai");
// const fs = require("fs");
// const path = require("path");

// const { userMessage, generateResponse } = require("./chat");

// const thread = require("../models/thread");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const uploadfile = async () => {
//   try {
//     const filePath = path.resolve(__dirname, "./chat.js");

//     if (!fs.existsSync(filePath)) {
//       throw new Error(`File not found: ${filePath}`);
//     }

//     const fileResponse = await openai.files.create({
//       file: fs.createReadStream(filePath),
//       purpose: "assistants",
//     });
//     return fileResponse;
//   } catch (e) {
//     throw new Error(`File upload failed: ${e.message}`);
//   }
// };

// module.exports.createThread = async (req, res, next) => {
//   try {
//     const owner = req.user;
//     const { messages, metadata, tool_resources } = req.body;
//     const fileResponse = await uploadfile();
//     const fileId = fileResponse.id;

//     let threadData = await openai.beta.threads.create({
//       messages: [
//         {
//           role: "user",
//           content:
//             "Create 3 data visualizations based on the trends in this file.",
//           attachments: [
//             {
//               files: [fileId],
//               tools: [{ type: "code_interpreter" }],
//             },
//           ],
//         },
//       ],
//     });

//     const userMessageData = await userMessage(req.body, owner);
//     threadData.push(userMessageData);

//     const responseMessageData = await generateResponse(req.body, owner);
//     threadData.push(responseMessageData);

//     const newThread = new thread({
//       owner,
//       messages: threadData,
//       metadata: metadata || {},
//       tool_resources: tool_resources || {},
//     });

//     await newThread.save();

//     const responseData = {
//       owner: newThread._id,
//       messages: newThread.messages,
//       metadata: newThread.metadata,
//       tool_resources: newThread.tool_resources,
//       createdAt: newThread.createdAt,
//     };

//     return res.send(responseData);
//   } catch (e) {
//     return next(e);
//   }
// };
