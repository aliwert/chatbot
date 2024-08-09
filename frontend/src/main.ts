// Get references to the DOM elements
const chat = document.getElementById("body") as HTMLElement;
const inputField = document.getElementById("user-input") as HTMLInputElement;
const sendBttn = document.getElementById("send") as HTMLButtonElement;

// initialize variables to manage chatbot typing indicator and interval

let isBotTyping = false;
let typingInterval: ReturnType<typeof setInterval> | null = null;
let typingMessage = "Typing";

// display the user message in chat

const addUserMessage = (message: string): void => {
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.innerText = message;
  chat.appendChild(userMsg);

  //scroll to bottom of the chat show the latest message
  chat.scrollTop = chat.scrollHeight;
};

// display the bot message in chat
const addBotMessage = (message: string): void => {
  if (isBotTyping) {
    if (typingInterval) {
      clearInterval(typingInterval);
    }
    const typingIndicator = chat.querySelector(
      ".typing-indicator"
    ) as HTMLElement;
    if (typingIndicator) {
      chat.removeChild(typingIndicator);
    }
    isBotTyping = false;
  }
  const chatbotMessage = document.createElement("div");
  chatbotMessage.className = "message";
  chatbotMessage.innerText = message;
  chat.appendChild(chatbotMessage);
  chat.scrollTop = chat.scrollHeight;
};
