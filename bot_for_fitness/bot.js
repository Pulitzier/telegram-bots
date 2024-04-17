// Telegram bot for fitness trainer
const TelegramBot = require("node-telegram-bot-api");
const questions = [
  "Do you have any existing medical conditions or injuries that I should be aware of?",
  "Are you currently taking any medications that could affect your exercise routine?",
  "Have you recently undergone any surgeries or medical procedures?",
  "What are your primary fitness goals? (e.g., weight loss, muscle gain, improved cardiovascular health)",
  "Do you have any specific fitness milestones you're working towards?",
  "Are there any particular areas of your body you'd like to focus on?",
  "Have you been regularly exercising before coming to the gym?",
  "What types of exercise or physical activities do you enjoy?",
  "Have you worked with a personal trainer or followed any specific workout programs in the past?",
  "How many days per week are you planning to come to the gym?",
  "How much time can you dedicate to each workout session?",
  "Do you have any time constraints or scheduling preferences?",
  "What does your current diet look like?",
  "Are you following any specific dietary guidelines or restrictions?",
  "How would you describe your sleep quality and stress levels?",
  "Do you have any preferences or aversions when it comes to certain types of exercises?",
  "Are there any exercises or activities you're not comfortable with or unable to perform?",
  "Do you have any mobility issues or physical limitations that I should consider?",
  "What motivates you to prioritize fitness and exercise?",
  "Do you have a support system or accountability partners to help you stay on track with your fitness journey?",
  "Are there any specific challenges or obstacles you anticipate facing along the way?",
  "Are you familiar with proper gym etiquette and safety procedures?",
  "Do you have any questions about using gym equipment or following exercise techniques?",
];

// Create a Telegram bot instance
const bot = new TelegramBot("8acf95e1-ea28-4da7-87de-fb114faa5014", {
  polling: true,
});

// Define a state to keep track of the user's progress in the conversation
const states = {
  START: "start",
  ASKING_QUESTIONS: "asking_questions",
  GENERATING_RECOMMENDATION: "generating_recommendation",
};

// Store user answers
let userAnswers = {};

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome! Let's get started with a fitness assessment. Type /begin when you're ready."
  );
});

// Handle /begin command to start the conversation
bot.onText(/\/begin/, (msg) => {
  const chatId = msg.chat.id;
  userAnswers = {}; // Reset user answers
  bot.sendMessage(chatId, "Let's begin!");

  // Start asking questions
  askQuestion(chatId, 0);
});

// Function to ask a question
function askQuestion(chatId, index) {
  const question = questions[index];
  if (question) {
    bot.sendMessage(chatId, question);
    setUserState(chatId, states.ASKING_QUESTIONS, index); // Set user state to indicate the question being asked
  } else {
    generateRecommendation(chatId); // If all questions have been asked, generate recommendation
  }
}

// Handle incoming messages
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const currentState = getUserState(chatId);
  const answer = msg.text;

  switch (currentState) {
    case states.ASKING_QUESTIONS:
      const questionIndex = getUserData(chatId).questionIndex;
      userAnswers[questionIndex] = answer; // Store user answer
      askQuestion(chatId, questionIndex + 1); // Ask the next question
      break;
    case states.GENERATING_RECOMMENDATION:
      // Handle messages during recommendation generation (if needed)
      break;
    default:
      break;
  }
});

// Function to generate recommendation based on user answers
function generateFitnessProgram(userData) {
  const { fitnessGoals, exercisePreferences, workoutDaysPerWeek } = userData;

  // Map fitness goals to specific exercise categories
  const exerciseCategories = {
    "weight loss": ["cardio", "strength training"],
    "muscle gain": ["strength training"],
    "improved cardiovascular health": ["cardio"],
  };

  // Define available exercises for each category
  const availableExercises = {
    cardio: ["running", "cycling", "jumping rope", "rowing"],
    "strength training": ["push-ups", "squats", "lunges", "deadlifts"],
  };

  // Initialize fitness program
  const fitnessProgram = [];

  // Determine number of workouts per week
  const workoutsPerWeek = Math.min(workoutDaysPerWeek * 2, 5); // At least 5 items for 2 days in a week

  // Generate fitness program items
  for (let i = 0; i < workoutsPerWeek; i++) {
    // Choose a random exercise category based on fitness goals and preferences
    const selectedCategories = Object.keys(exerciseCategories).filter(
      (category) =>
        fitnessGoals.includes(category) &&
        exercisePreferences.includes(category)
    );
    const randomCategory =
      selectedCategories[Math.floor(Math.random() * selectedCategories.length)];

    // Choose a random exercise from the selected category
    const exercises = availableExercises[randomCategory];
    const randomExercise =
      exercises[Math.floor(Math.random() * exercises.length)];

    // Determine duration for the workout session (in minutes)
    const duration = randomCategory === "cardio" ? 30 : 45; // Cardio sessions: 30 minutes, Strength training: 45 minutes

    // Add the workout session to the fitness program
    fitnessProgram.push({ exercise: randomExercise, duration });
  }

  return fitnessProgram;
}

// Define an object to store user states and data
const userStorage = {};

// Helper functions to manage user states and data
function setUserState(chatId, state, data) {
  userStorage[chatId] = { state, data };
}

function getUserState(chatId) {
  if (userStorage[chatId]) {
    return userStorage[chatId].state;
  } else {
    return states.START; // Default state
  }
}

function getUserData(chatId) {
  if (userStorage[chatId]) {
    return userStorage[chatId].data || {};
  } else {
    return {}; // Empty object by default
  }
}
