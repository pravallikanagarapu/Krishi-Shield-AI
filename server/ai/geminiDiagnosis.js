import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

const diagnosisSchema = {
  type: "object",

  properties: {
    crop: {
      type: "string",
    },

    disease: {
      type: "string",
    },

    confidence: {
      type: "number",
    },

    severity: {
      type: "string",
    },

    symptoms: {
      type: "array",
      items: {
        type: "string",
      },
    },

    actions: {
      type: "array",
      items: {
        type: "string",
      },
    },

    explanation: {
      type: "string",
    },
  },

  required: [
    "crop",
    "disease",
    "confidence",
    "severity",
    "symptoms",
    "actions",
    "explanation",
  ],
}

export async function analyzeLeafWithGemini(
  image,
  crop = "Unknown",
) {
  if (!image) {
    throw new Error("Leaf image is required")
  }

  const match = image.match(
    /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/,
  )

  if (!match) {
    throw new Error("Invalid image format")
  }

  const mimeType = match[1]
  const base64Data = match[2]

  const prompt = `
You are Krishi Shield AI, an agricultural
plant-disease analysis assistant.

Analyze the uploaded crop or leaf image.

Farmer-selected crop:
${crop}

Your task is to identify the most likely
visible disease or plant condition.

IMPORTANT RULES:

1. Analyze the actual image carefully.
2. Do not pretend to be certain when the image
   is unclear.
3. If the image is insufficient for diagnosis,
   use "Uncertain" as the disease.
4. Do not invent symptoms that cannot reasonably
   be inferred from the image.
5. Confidence must be between 0 and 100.
6. Severity must be one of:
   Low, Moderate, High, or Uncertain.
7. Give conservative and practical actions.
8. Do not provide pesticide dosage or chemical
   quantities.
9. Explain briefly what visual evidence supports
   the diagnosis.
10. Use simple language suitable for farmers.
11. Return only the requested JSON structure.
`

  console.log("📤 Calling Gemini 3.6 Flash...")

  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",

    input: [
      {
        type: "user_input",

        content: [
          {
            type: "text",
            text: prompt,
          },

          {
            type: "image",
            data: base64Data,
            mime_type: mimeType,
          },
        ],
      },
    ],

    response_format: [
      {
        type: "text",
        mime_type: "application/json",
        schema: diagnosisSchema,
      },
    ],
  })

  console.log("📥 Gemini response received")

  if (!interaction.output_text) {
    throw new Error(
      "Gemini returned an empty diagnosis",
    )
  }

  let diagnosis

  try {
    diagnosis = JSON.parse(
      interaction.output_text,
    )
  } catch (error) {
    console.error(
      "❌ Gemini returned invalid JSON:",
      interaction.output_text,
    )

    throw new Error(
      "Gemini returned invalid diagnosis JSON",
    )
  }

  return diagnosis
}