import "dotenv/config"

import express from "express"
import cors from "cors"

import { createDemoDiagnosis } from "./ai/diagnosis.js"
import { analyzeLeafWithGemini } from "./ai/geminiDiagnosis.js"

const app = express()

app.use(cors())

app.use(
  express.json({
    limit: "10mb",
  }),
)

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Krishi Shield AI",
    ai: "Gemini",
  })
})

app.post("/api/diagnose", async (req, res) => {
  try {
    const { crop, image } = req.body

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Leaf image is required",
      })
    }

    console.log("🌿 Leaf image received")
    console.log("🌱 Crop:", crop || "Unknown")
    console.log("🧠 Sending image to Gemini...")

    try {
      const diagnosis = await analyzeLeafWithGemini(
        image,
        crop || "Unknown",
      )

      console.log("✅ Gemini diagnosis completed")

      return res.json({
        success: true,
        source: "gemini",
        diagnosis,
      })
    } catch (aiError) {
      console.error(
        "⚠️ Gemini diagnosis failed:",
        aiError,
      )

      console.log(
        "🔄 Using safe demo fallback...",
      )

      const fallbackDiagnosis =
        createDemoDiagnosis(crop || "Tomato")

      return res.json({
        success: true,
        source: "fallback",
        diagnosis: fallbackDiagnosis,
        warning:
          "AI analysis was temporarily unavailable. Demo diagnosis returned.",
      })
    }
  } catch (error) {
    console.error(
      "❌ Diagnosis endpoint error:",
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        "Unable to analyze the field image",
    })
  }
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(
    `🌱 Krishi Shield AI server running on port ${PORT}`,
  )
})