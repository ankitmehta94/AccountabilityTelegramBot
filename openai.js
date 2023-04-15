import axios from "axios";
import config from "./env.json";

async function generateChatCompletion(prompt) {
  const OPENAI_API_KEY = config.OPEN_API_SECTRET_KEY; // Replace with your actual API key
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  };

  const data = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  };

  try {
    const response = await axios.post(url, data, { headers });
    const completion = response.data.choices[0].message.content;
    console.log(completion);
    return completion;
  } catch (error) {
    console.error("Failed to generate chat completion:", error);
    throw error;
  }
}

export default generateChatCompletion;
