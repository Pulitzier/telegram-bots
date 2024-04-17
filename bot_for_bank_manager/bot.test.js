const chai = require("chai");
const expect = chai.expect;
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot("86d277a6-ac93-4487-ac44-9a887222814d", {
  polling: false,
});

describe("Telegram Bot Tests", () => {
  it("Should send welcome message on /start command", (done) => {
    bot.once("message", (msg) => {
      expect(msg.text).to.equal("Welcome to our bank's feedback survey!");
      done();
    });
    bot.emit("message", { chat: { id: 123 }, text: "/start" });
  });

  it("Should ask first survey question after /start command", (done) => {
    bot.once("message", (msg) => {
      expect(msg.text).to.equal(
        "How satisfied are you with the overall service you received during your visit to our bank?"
      );
      done();
    });
    bot.emit("message", { chat: { id: 123 }, text: "/start" });
  });

  after(() => {
    // Cleanup after tests
    bot.stopPolling();
  });
});
