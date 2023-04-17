// Import necessary libraries
import { Telegraf } from "telegraf";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";
import { OPEN_API_SECTRET_KEY, TELEGRAM_TOKEN } from "../env.js";

// Create an instance of the Telegram bot
const bot = new Telegraf(TELEGRAM_TOKEN);
const chat = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: OPEN_API_SECTRET_KEY,
});

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
  ),
  new MessagesPlaceholder("history"),
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

const chain = new ConversationChain({
  memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
  prompt: chatPrompt,
  llm: chat,
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
  const { response = `I didn't get a response` } = await chain.call({
    input: userInput,
  });
  console.log(response);
  // Send the generated response back to the user
  ctx.reply(response);
});

// Start the bot
bot.startPolling();
