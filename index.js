// Import necessary libraries
import { Telegraf } from "telegraf";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage } from "langchain/schema";
import config from "./env.json" assert { type: "json" };

// Create an instance of the Telegram bot
const bot = new Telegraf(config.TELEGRAM_TOKEN);
const chat = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: config.OPEN_API_SECTRET_KEY,
});
// Start listening for messages
bot.start((ctx) => {
  ctx.reply(
    "Welcome to the ChatGPT bot! Send me a message and I will generate a response using GPT-3."
  );
});

bot.on("text", async (ctx) => {
  // Get user input
  const userInput = ctx.message.text;

  // Call GPT-3 to generate a response
  const response = await chat.call([new HumanChatMessage(userInput)]);

  // Send the generated response back to the user
  ctx.reply(response.text);
});

// Start the bot
bot.startPolling();
