// Telegram bot for bank managers and managers working with client feedback
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot("86d277a6-ac93-4487-ac44-9a887222814d", {
  polling: true,
});

// Object to store user answers
const answers = {};

// Survey questions
const questions = [
  "How satisfied are you with the overall service you received during your visit to our bank?",
  "Did our staff greet you promptly upon arrival?",
  "Were you assisted promptly upon request?",
  "Did you find our staff to be knowledgeable and helpful?",
  "How would you rate the cleanliness and organization of our bank premises?",
  "Did you face any difficulties or challenges during your visit that our staff were able to assist you with?",
  "Were you satisfied with the waiting time for services, such as opening an account or seeking financial advice?",
  "Did you find our range of banking products and services to meet your needs?",
  "How likely are you to recommend our bank to friends or family based on your experience today?",
  "Do you have any additional comments or suggestions for how we can improve our services?",
];

// Final message for improvement recommendations
const improvementMessage = `
Improvement Recommendations:
1. Improve staff training for better customer service.
2. Reduce waiting times for services.
3. Enhance cleanliness and organization of premises.
4. Expand range of banking products and services.
5. Act on customer feedback for continuous improvement.
`;

// Start command handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Welcome to our bank's feedback survey!");
  askQuestion(chatId, 0);
});

// Function to ask questions
function askQuestion(chatId, index) {
  if (index < questions.length) {
    bot.sendMessage(chatId, questions[index]).then(() => {
      bot.once("message", (msg) => {
        answers[msg.chat.id] = answers[msg.chat.id] || [];
        answers[msg.chat.id].push(msg.text);
        askQuestion(chatId, index + 1);
      });
    });
  } else {
    sendFinalMessage(chatId);
  }
}

// Function to send final message with improvement recommendations
function sendFinalMessage(chatId) {
  bot.sendMessage(chatId, improvementMessage);
}

// Run the bot
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === "/start") {
    askQuestion(chatId, 0);
  }
});
