// Get references to the DOM elements
const chat = document.getElementById("body") as HTMLElement;
const inputField = document.getElementById("user-input") as HTMLInputElement;
const sendBttn = document.getElementById("send") as HTMLButtonElement;

// initialize variables to manage chatbot typing indicator and interval

let isBotTyping = false;
let typingInterval: ReturnType<typeof setInterval> | null = null;
let typingMessage = "Typing";
