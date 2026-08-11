import "dotenv/config"
import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

async function checkModels() {
  try {
    console.log("🔍 Checking Gemini models available to your API key...\n")

    const response = await ai.models.list()

    for await (const model of response) {
      console.log(model.name)
    }
  } catch (error) {
    console.error("❌ Unable to list Gemini models:")
    console.error(error)
  }
}

checkModels()