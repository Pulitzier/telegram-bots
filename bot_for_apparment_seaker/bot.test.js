const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const TelegramBot = require("node-telegram-bot-api");
const sinon = require("sinon");

chai.use(chaiHttp);

const bot = new TelegramBot("482e9e3d-6483-4bfa-842e-cb00a0ac6439");

describe("Telegram Bot Tests", () => {
  // Mock bot message handler
  beforeEach(() => {
    sinon.stub(bot, "sendMessage");
  });

  afterEach(() => {
    bot.sendMessage.restore();
  });

  // Test for /start command
  it("should respond to /start command", () => {
    const msg = { chat: { id: 123 } };
    bot.emit("message", msg);
    expect(bot.sendMessage.calledOnce).to.be.true;
    expect(bot.sendMessage.firstCall.args[1]).to.equal(
      "Welcome to the Apartment Finder Bot! Let's get started by asking you a few questions."
    );
  });

  // Test asking budget question
  it("should ask budget question", () => {
    const msg = { chat: { id: 123 }, text: "start" };
    bot.emit("message", msg);
    expect(bot.sendMessage.calledTwice).to.be.true;
    expect(bot.sendMessage.secondCall.args[1]).to.equal(
      "What is your budget for purchasing an apartment?"
    );
  });

  // Cleanup after each test
  afterEach(() => {});
});
