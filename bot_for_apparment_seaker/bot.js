const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot("482e9e3d-6483-4bfa-842e-cb00a0ac6439", {
  polling: true,
});

// Start command handler
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome to the Apartment Finder Bot! Let's get started by asking you a few questions."
  );
  askBudget(msg.chat.id);
});

// Function to ask budget question
function askBudget(chatId) {
  bot.sendMessage(chatId, "What is your budget for purchasing an apartment?");
}

// Function to ask location question
function askLocation(chatId) {
  bot.sendMessage(
    chatId,
    "What is your preferred location or neighborhood for the apartment?"
  );
}

// Function to ask bedrooms and bathrooms question
function askBedroomsBathrooms(chatId) {
  bot.sendMessage(
    chatId,
    "How many bedrooms and bathrooms are you looking for?"
  );
}

// Function to ask apartment size question
function askApartmentSize(chatId) {
  bot.sendMessage(
    chatId,
    "What is your preferred apartment size or square footage?"
  );
}

// Function to ask new construction or existing apartments question
function askNewOrExisting(chatId) {
  bot.sendMessage(
    chatId,
    "Are you interested in new construction or existing apartments?"
  );
}

// Function to ask amenities question
function askAmenities(chatId) {
  bot.sendMessage(
    chatId,
    "Do you have any specific amenities or features you are looking for in the apartment building?"
  );
}

// Function to ask deal-breakers question
function askDealBreakers(chatId) {
  bot.sendMessage(
    chatId,
    "Are there any deal-breakers or must-have requirements for the apartment?"
  );
}

// Function to ask renovation question
function askRenovation(chatId) {
  bot.sendMessage(
    chatId,
    "Are you open to considering apartments that may need some renovations or updates?"
  );
}

// Function to ask move-in timeline question
function askMoveInTimeline(chatId) {
  bot.sendMessage(
    chatId,
    "How soon are you looking to move into the apartment?"
  );
}

// Function to ask mortgage or cash question
function askMortgageOrCash(chatId) {
  bot.sendMessage(
    chatId,
    "Have you been pre-approved for a mortgage or do you plan to pay cash for the purchase?"
  );
}

// Function to ask other agents or properties question
function askOtherAgents(chatId) {
  bot.sendMessage(
    chatId,
    "Are you working with any other real estate agents or have you previously viewed any properties?"
  );
}

// Function to ask layout or design question
function askLayoutDesign(chatId) {
  bot.sendMessage(
    chatId,
    "Are there any specific preferences or concerns regarding the layout or design of the apartment?"
  );
}

// Function to ask pet requirements question
function askPetRequirements(chatId) {
  bot.sendMessage(
    chatId,
    "Do you have any pets or specific requirements related to pet-friendliness?"
  );
}

// Function to ask outdoor space question
function askOutdoorSpace(chatId) {
  bot.sendMessage(
    chatId,
    "Are you interested in apartments with a balcony, terrace, or outdoor space?"
  );
}

// Function to ask usage purpose question
function askUsagePurpose(chatId) {
  bot.sendMessage(
    chatId,
    "Are you planning to use the apartment as a primary residence, investment property, or vacation home?"
  );
}

// Function to generate recommendation based on user answers
function generateRecommendation(answers) {
  // Generate link to real estate site in Sweden with filters based on user answers
  const recommendation =
    "Here is a link to real estate listings in Sweden based on your preferences: [Link to real estate site]";
  return recommendation;
}

// Bot message handler
bot.on("message", (msg) => {
  // Handle user's answers to each question
  const chatId = msg.chat.id;
  const answer = msg.text;

  // Store user's answers in data structure
  // You can use a switch statement to determine which question the user is answering
  if (!userAnswers.budget) {
    userAnswers.budget = answer;
    askLocation(chatId);
  } else if (!userAnswers.location) {
    userAnswers.location = answer;
    // Continue asking other questions...
  } else {
    // All questions answered, generate recommendation
    const recommendation = generateRecommendation(userAnswers);
    bot.sendMessage(chatId, recommendation, { parse_mode: "Markdown" });

    // Clear user answers for the next conversation
    userAnswers = {};
  }
});
