const { expect } = require("chai");
const { TelegramBot } = require("node-telegram-bot-api");
const chaiHttp = require("chai-http");
const express = require("express");

const app = express();

const botToken = "92c5436f-21c6-493e-bd1d-b44f55e42fbc";
const bot = new TelegramBot(botToken, { polling: true });

// Use chai-http to simulate HTTP requests
chai.use(chaiHttp);

describe("Telegram Bot Tests", function () {
  it("should return a welcome message when /start command is sent", function (done) {
    chai
      .request(app)
      .post(`/bot${botToken}/sendMessage`)
      .send({
        chat_id: "123456", // Replace with a valid chat_id
        text: "/start",
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("ok").to.be.true;
        expect(res.body).to.have.property("result");
        expect(res.body.result.text).to.equal(
          "Welcome to CarBot! Let's find the perfect car for you."
        );
        done();
      });
  });
});
