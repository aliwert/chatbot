"use strict";
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const apiKey = process.env.API_KEY;
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

async function callGPT(promptContent, systemContent, previousChat) {
  try {
    const messages = [
      { role: "system", content: systemContent },
      { role: "user", content: promptContent },
      { role: "assistant", content: previousChat },
    ];

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Adjust the model if needed
      messages,
    });

    const botMessage = response.data.choices[0].message.content;
    console.log("GPT Response:", botMessage);
    return botMessage;
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return `Failed to generate response: ${error.message}`;
  }
}

module.exports = { callGPT };
