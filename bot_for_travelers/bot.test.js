const { expect } = require("chai");
const { TelegramBot } = require("node-telegram-bot-api");
const chaiHttp = require("chai-http");
const express = require("express");

const app = express();

const botToken = "889baef2-3009-4070-8d4e-bb9d219065e1";
const bot = new TelegramBot(botToken, { polling: true });

describe("Telegram Bot Tests", () => {
  it("Successfully answers questions and provides recommendations", () => {
    // Visit the Telegram Web application
    cy.visit("https://web.telegram.org");

    // Replace these values with your actual Telegram credentials
    const phoneNumber = "789724529";
    const code = "48";

    // Log in to Telegram (Assuming already logged in, you may need to adjust this part)
    cy.get('input[name="phone_number"]').type(phoneNumber);
    cy.get('button[type="submit"]').click();
    cy.get('input[name="phone_code"]').type(code);
    cy.get('button[type="submit"]').click();

    // Wait for login to complete and redirect to the chat
    cy.url().should("include", "/im");

    // Start the bot conversation by sending the /start command
    cy.get(".im_editable").type("/start{enter}");

    // Answer all questions
    cy.get(".im_editable").each(($input, index) => {
      cy.wrap($input).type(`Mock Answer ${index + 1}{enter}`);
    });

    // Wait for the bot to send recommendations
    cy.get(".im_message_text").should(
      "contain",
      "Based on your answers, we recommend"
    );

    // Validate recommendations
    cy.get(".im_message_text").should("contain", "Destination: Maldives");
    cy.get(".im_message_text").should(
      "contain",
      "Recommended Hotel: Lux* South Ari Atoll"
    );
    cy.get(".im_message_text").should(
      "contain",
      "Travel Guide: Maldives Travel Guide"
    );
  });
});
