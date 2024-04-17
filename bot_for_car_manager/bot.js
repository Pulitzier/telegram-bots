// Telegram bot for car buyers
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot("92c5436f-21c6-493e-bd1d-b44f55e42fbc", {
  polling: true,
});

// Questions object with keys as questions and values as arrays of possible answers
const questions = {
  "What is your budget for purchasing a car?": [
    "Less than $10,000",
    "$10,000 - $20,000",
    "More than $20,000",
  ],
  "Are you interested in a new or used car?": ["New", "Used"],
  "What type of vehicle are you looking for?": [
    "Sedan",
    "SUV",
    "Truck",
    "Convertible",
    "Hatchback",
  ],
  "What are your preferred features or specifications?": [
    "Fuel efficiency",
    "Seating capacity",
    "Technology options",
  ],
  "Do you have any specific brand or model preferences?": [
    "Toyota",
    "Honda",
    "Ford",
    "Tesla",
    "BMW",
  ],
  "Will you primarily be using the car for daily commuting, family transportation, or other purposes?":
    ["Daily commuting", "Family transportation", "Other purposes"],
  "Do you have any specific color preferences?": [
    "Black",
    "White",
    "Red",
    "Blue",
    "Silver",
  ],
  "Are you interested in additional options or accessories?": [
    "Navigation system",
    "Sunroof",
    "Towing package",
  ],
  "Do you have any trade-in vehicle that you would like to include in the purchase?":
    ["Yes", "No"],
  "Are you interested in financing options or leasing?": [
    "Financing",
    "Leasing",
  ],
  "Have you considered insurance costs for the vehicle?": ["Yes", "No"],
  "Are there any special promotions or incentives that you are interested in taking advantage of?":
    ["Yes", "No"],
  "Are you concerned about the car's safety features and ratings?": [
    "Yes",
    "No",
  ],
  "Do you have any questions about warranty coverage or maintenance services?":
    ["Yes", "No"],
  "Have you test-driven any vehicles that you are considering?": ["Yes", "No"],
  "Are you open to considering alternative models or options based on your preferences and budget?":
    ["Yes", "No"],
  "Do you have any specific requirements for the car's performance, handling, or driving experience?":
    ["Yes", "No"],
  "Are there any specific features or functionalities that are essential for your driving needs?":
    ["Yes", "No"],
  "Have you researched the resale value and long-term costs of ownership for the car?":
    ["Yes", "No"],
  "Is there anything else I can assist you with or any additional information you need before making a decision?":
    ["Yes", "No"],
};

let answers = {};

// Start command handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome to CarBot! Let's find the perfect car for you."
  );

  // Start asking questions
  askQuestions(chatId, 0);
});

// Function to ask questions sequentially
function askQuestions(chatId, index) {
  const question = Object.keys(questions)[index];
  if (!question) {
    // End of questions, provide recommendations
    provideRecommendations(chatId);
    return;
  }

  bot
    .sendMessage(chatId, question, {
      reply_markup: {
        keyboard: questions[question].map((answer) => [{ text: answer }]),
        one_time_keyboard: true,
      },
    })
    .then(() => {
      // Wait for user's reply
      bot.onText(/.*/, (msg) => {
        const answer = msg.text;
        answers[question] = answer;

        // Ask the next question
        askQuestions(chatId, index + 1);
      });
    });
}

// Function to provide recommendations based on answers
function provideRecommendations(chatId) {
  // Based on the collected answers, generate recommendations
  const recommendation =
    "Based on your preferences, we recommend considering the following cars:\n" +
    "- Toyota Camry: [Link to dealership]\n" +
    "- Honda CR-V: [Link to dealership]\n" +
    "- Ford F-150: [Link to dealership]";

  // Send the recommendation message
  bot.sendMessage(chatId, recommendation);
}
