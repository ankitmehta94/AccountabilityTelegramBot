// Import necessary libraries
import { Telegraf } from "telegraf";
import generateChatCompletion from "./openai.js";
import config from "./env.json";

// Create an instance of the Telegram bot
const bot = new Telegraf(config.TELEGRAM_TOKEN);

// Start listening for messages
bot.start((ctx) => {
  console.log("Heyu");
  ctx.reply(
    "Welcome to the ChatGPT bot! Send me a message and I will generate a response using GPT-3."
  );
});

bot.on("text", async (ctx) => {
  // Get user input
  const userInput = ctx.message.text;

  // Call GPT-3 to generate a response
  const response = await generateChatCompletion(userInput);

  // Send the generated response back to the user
  ctx.reply(response);
});

// Start the bot
bot.startPolling();
