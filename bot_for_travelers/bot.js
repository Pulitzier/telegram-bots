// Telegram bot for travelers
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot("889baef2-3009-4070-8d4e-bb9d219065e1", {
  polling: true,
});

// Object to store user's answers
const answers = {};

// Question and answer pairs
const questions = [
  "What are the ages of your children?",
  "Do any of your children have special needs or preferences we should consider?",
  "What type of vacation experience are you looking for? (e.g., relaxing beach getaway, adventurous city exploration, cultural immersion)",
  "Are you interested in domestic or international travel?",
  "Do you have any preferred travel dates or duration for your trip?",
  "Are there any specific destinations you have in mind?",
  "Are you looking for a destination with family-friendly activities and attractions?",
  "Are you interested in exploring nature, historical sites, theme parks, or other specific attractions?",
  "What type of accommodation are you looking for? (e.g., hotel, resort, vacation rental)",
  "Do you prefer a specific location or neighborhood?",
  "Are you looking for family-friendly amenities such as a pool, playground, or kids' club?",
  "What is your budget for accommodation and activities?",
  "Are there any must-have amenities or features you're looking for in a hotel or resort?",
  "Do you have any dietary restrictions or preferences we should consider when recommending dining options?",
  "How do you plan to travel to your destination? (e.g., flying, driving)",
  "Are you interested in transportation options for exploring the destination, such as car rentals or guided tours?",
  "Are you concerned about safety and security in your chosen destination?",
  "Do you have any health concerns or medical conditions we should be aware of?",
  "Are there any additional services or activities you would like assistance with, such as booking excursions or arranging childcare services?",
  "Do you have any special celebrations or events during your trip that we can help plan for?",
];

// Event listener for "/start" command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Send the first question
  sendNextQuestion(chatId);
});

// Event listener for when a message is received
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Store the user's answer
  const questionIndex = Object.keys(answers).length;
  answers[questions[questionIndex]] = messageText;

  // If there are more questions, send the next one
  if (questionIndex < questions.length - 1) {
    sendNextQuestion(chatId);
  } else {
    // Send recommendations when all questions are answered
    sendRecommendations(chatId);
  }
});

// Function to send the next question
function sendNextQuestion(chatId) {
  const questionIndex = Object.keys(answers).length;
  const question = questions[questionIndex];
  bot.sendMessage(chatId, question);
}

// Function to send recommendations based on user's answers
function sendRecommendations(chatId) {
  const recommendations = `
Based on your answers, we recommend the following destinations for your family vacation:

1. Destination: Maldives
   Description: A tropical paradise with stunning beaches, crystal-clear waters, and plenty of family-friendly activities.
   Recommended Hotel: [Lux* South Ari Atoll](https://www.luxresorts.com/en/hotel-maldives/luxsouthariatoll)
   Travel Guide: [Maldives Travel Guide](https://www.lonelyplanet.com/maldives)

2. Destination: Hawaii, USA
   Description: Explore the beautiful islands of Hawaii with its lush landscapes, active volcanoes, and rich cultural heritage.
   Recommended Hotel: [Four Seasons Resort Maui at Wailea](https://www.fourseasons.com/maui/)
   Travel Guide: [Hawaii Travel Guide](https://www.lonelyplanet.com/usa/hawaii)

3. Destination: Costa Rica
   Description: Experience the biodiversity of Costa Rica with its rainforests, wildlife, and adventure activities like zip-lining and surfing.
   Recommended Hotel: [Nayara Gardens](https://www.nayarasprings.com/)
   Travel Guide: [Costa Rica Travel Guide](https://www.lonelyplanet.com/costa-rica)

4. Destination: Cancun, Mexico
   Description: Enjoy the beautiful beaches, vibrant culture, and archaeological sites of Cancun, Mexico.
   Recommended Hotel: [The Ritz-Carlton, Cancun](https://www.ritzcarlton.com/en/hotels/mexico/cancun)
   Travel Guide: [Cancun Travel Guide](https://www.lonelyplanet.com/mexico/yucatan-peninsula/cancun)

5. Destination: Phuket, Thailand
   Description: Explore the stunning beaches, vibrant nightlife, and cultural attractions of Phuket, Thailand.
   Recommended Hotel: [The Nai Harn](https://www.thenaiharn.com/)
   Travel Guide: [Phuket Travel Guide](https://www.lonelyplanet.com/thailand/phuket-province/phuket)
`;
  bot.sendMessage(chatId, recommendations, { parse_mode: "Markdown" });
}
