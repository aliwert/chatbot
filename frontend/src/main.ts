//! Get references to the DOM elements
const chat = document.getElementById("body") as HTMLElement;
const inputField = document.getElementById("user-input") as HTMLInputElement;
const sendBttn = document.getElementById("send") as HTMLButtonElement;

//! initialize variables to manage chatbot typing indicator and interval
let isBotTyping = false;
let typingInterval: ReturnType<typeof setInterval> | null = null;
let typingMessage = "Typing";

//! to send the user's message and handle bot response
async function sendUserMessage(): Promise<void> {
  const message = inputField.value.trim();
  if (message == "") {
    return;
  }
  addUserMessage(message);

  // clear the input field after sending the message
  inputField.value = "";

  try {
    // show the typing indicator while waiting for the bot's response
    displayTypeIndicator();

    const response = await fetch("http://localhost:5173/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      console.log(response.status);
      throw new Error("Failed to fetch response from the server");
    }

    const data = await response.json();
    const botResponse = data.message as string;
    addBotMessage(botResponse);
  } catch (error) {
    console.error("Error:", error);
  }
}

//! display the user message in chat
const addUserMessage = (message: string): void => {
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.innerText = message;
  chat.appendChild(userMsg);

  //scroll to bottom of the chat show the latest message
  chat.scrollTop = chat.scrollHeight;
};

//! display the bot message in chat
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
//! display a typing indicator for the bot
const displayTypeIndicator = (): void => {
  if (!isBotTyping) {
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "message type-indicator";
    typingIndicator.innerText = typingMessage;
    chat.appendChild(typingIndicator);
    chat.scrollTop = chat.scrollHeight;
    isBotTyping = true;
    // update the typing indicator message periodically
    typingInterval = setInterval(() => {
      if (typingMessage == "Typing...") {
        typingMessage = "Typing";
      } else {
        typingMessage += ".";
      }
      typingIndicator.innerText = typingMessage;
    }, 1000);
  }
};
//! Add event listener to submit button to trigger message sending
sendBttn.addEventListener("click", sendUserMessage);

//! Add event listener to allow sending messages with the "Enter" key
inputField.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendUserMessage();
  }
});
