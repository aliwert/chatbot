"use strict";

const { callGPT } = require("../services/open");

const system = `Engage in a natural and concise conversation, drawing from prior interactions for context. Focus on understanding the user's questions accurately and responding directly.`;

let chatLog = "Chat Bot: Hello! How can I assist you today?";

async function handleMessage(req, res) {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message cannot be empty." });
  }

  try {
    const response = await callGPT(message, system, chatLog);

    chatLog += `User: ${message}\n`;
    chatLog += `Chat Bot: ${response}\n`;

    return res.json({ message: response });
  } catch (error) {
    console.error("Error processing message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { handleMessage };
