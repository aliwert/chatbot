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
  userMsg.className = "user-msg";
  userMsg.innerText = message;
  chat.appendChild(userMsg);

  //scroll to bottom of the chat show the latest message
  chat.scrollTop = chat.scrollHeight;
};
