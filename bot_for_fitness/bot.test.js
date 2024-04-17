const { expect } = require("chai");
const { generateFitnessProgram } = require("./bot");
const {
    setUserState,
    getUserState,
    getUserData,
  } = require("./bot");
const sinon = require("sinon");
const TelegramBot = require("node-telegram-bot-api");
const {
  setUserState,
  getUserState,
  getUserData,
} = require("./bot");

describe("generateFitnessProgram", () => {
  it("should generate a fitness program with at least 5 items for 2 days in a week", () => {
    const userData = {
      fitnessGoals: ["weight loss", "improved cardiovascular health"],
      exercisePreferences: ["cardio"],
      workoutDaysPerWeek: 2,
    };
    const fitnessProgram = generateFitnessProgram(userData);
    expect(fitnessProgram).to.be.an("array");
    expect(fitnessProgram).to.have.length.greaterThanOrEqual(5); // Ensure at least 5 items
  });

  it("should generate a fitness program with correct exercise categories", () => {
    const userData = {
      fitnessGoals: ["muscle gain"],
      exercisePreferences: ["strength training"],
      workoutDaysPerWeek: 3,
    };
    const fitnessProgram = generateFitnessProgram(userData);
    const categories = fitnessProgram.map(
      (item) => item.exercise.split("-")[0]
    ); // Extract exercise category
    expect(categories).to.include("strength"); // Ensure only strength training exercises are included
  });

  it("should generate a fitness program with correct exercise durations", () => {
    const userData = {
      fitnessGoals: ["muscle gain"],
      exercisePreferences: ["strength training"],
      workoutDaysPerWeek: 3,
    };
    const fitnessProgram = generateFitnessProgram(userData);
    for (const item of fitnessProgram) {
      if (item.exercise.includes("cardio")) {
        expect(item.duration).to.equal(30); // Cardio sessions should have a duration of 30 minutes
      } else if (item.exercise.includes("strength")) {
        expect(item.duration).to.equal(45); // Strength training sessions should have a duration of 45 minutes
      }
    }
  });
});

describe("User State Management", () => {
  // Initialize user state before each test
  beforeEach(() => {
    setUserState({ userId: "user123", state: {} });
  });

  // Test setUserState function
  describe("setUserState", () => {
    it("should set user state", () => {
      setUserState({ userId: "user123", state: { name: "John", age: 30 } });
      const userState = getUserState("user123");
      expect(userState).to.deep.equal({ name: "John", age: 30 });
    });
  });

  // Test getUserState function
  describe("getUserState", () => {
    it("should return user state", () => {
      setUserState({ userId: "user123", state: { name: "Alice", age: 25 } });
      const userState = getUserState("user123");
      expect(userState).to.deep.equal({ name: "Alice", age: 25 });
    });

    it("should return undefined for non-existing user", () => {
      const userState = getUserState("nonExistingUser");
      expect(userState).to.be.undefined;
    });
  });

  // Test getUserData function
  describe("getUserData", () => {
    it("should return user data", () => {
      setUserState({ userId: "user123", state: { name: "Bob", age: 35 } });
      const userData = getUserData("user123");
      expect(userData).to.have.keys(["userId", "state"]);
      expect(userData.userId).to.equal("user123");
      expect(userData.state).to.deep.equal({ name: "Bob", age: 35 });
    });

    it("should return undefined for non-existing user", () => {
      const userData = getUserData("nonExistingUser");
      expect(userData).to.be.undefined;
    });
  });
});

describe("Telegram Bot Tests", () => {
  let bot;
  let botOnTextStub;
  let botOnMessageStub;

  beforeEach(() => {
    bot = new TelegramBot("YOUR_TELEGRAM_BOT_TOKEN", { polling: true });
    botOnTextStub = sinon.stub(bot, "onText");
    botOnMessageStub = sinon.stub(bot, "on");
  });

  afterEach(() => {
    botOnTextStub.restore();
    botOnMessageStub.restore();
  });

  describe("Handle /start command", () => {
    it("should send welcome message when /start command is received", () => {
      botOnTextStub.withArgs(/\/start/).callsArgWith(1, { chat: { id: 123 } });
      // Assert welcome message is sent
    });
  });

  describe("Handle /begin command", () => {
    it("should send start message when /begin command is received", () => {
      botOnTextStub.withArgs(/\/begin/).callsArgWith(1, { chat: { id: 123 } });
      // Assert start message is sent
    });

    it("should start asking questions when /begin command is received", () => {
      botOnTextStub.withArgs(/\/begin/).callsArgWith(1, { chat: { id: 123 } });
      // Assert questions are asked
    });
  });

  describe("Handle incoming messages", () => {
    it("should store user answers when answering questions", () => {
      const msg = { chat: { id: 123 }, text: "Answer" };
      setUserState(123, "asking_questions", 0); // Set user state to simulate asking questions
      getUserData.returns({ questionIndex: 0 }); // Simulate current question index
      botOnMessageStub.callsArgWith(1, msg); // Simulate message event
      // Assert user answer is stored
    });

    it("should generate recommendation when all questions are answered", () => {
      const msg = { chat: { id: 123 }, text: "Answer" };
      setUserState(123, "asking_questions", questions.length - 1); // Set user state to simulate last question
      getUserData.returns({ questionIndex: questions.length - 1 }); // Simulate current question index
      botOnMessageStub.callsArgWith(1, msg); // Simulate message event
      // Assert recommendation is generated
    });

    it("should handle messages during recommendation generation", () => {
      const msg = { chat: { id: 123 }, text: "Message" };
      setUserState(123, "generating_recommendation"); // Set user state to simulate generating recommendation
      botOnMessageStub.callsArgWith(1, msg); // Simulate message event
      // Assert message is handled during recommendation generation
    });
  });
});
