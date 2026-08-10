import type { FieldAnalysis } from "../types/agriculture"

export const demoFieldAnalysis: FieldAnalysis = {
  crop: "Tomato",

  cropStage: "flowering",

  location: {
    city: "Vijayawada",
    state: "Andhra Pradesh",
    country: "India",
    latitude: 16.5062,
    longitude: 80.648,
  },

  diagnosis: {
    disease: "Early Blight",
    confidence: 94,
    severity: "moderate",

    symptoms: [
      "Dark circular spots visible on older leaves",
      "Yellowing around affected areas",
      "Lower leaves showing progressive infection",
    ],
  },

  weather: {
    temperature: 28,
    humidity: 82,
    rainProbability: 68,
    windSpeed: 12,
    condition: "Partly cloudy with possible rainfall",
  },

  risk: {
    current: 58,
    after24Hours: 71,
    after48Hours: 84,
  },

  recommendation: {
    actions: [
      "Remove and safely dispose of heavily infected leaves",
      "Avoid overhead irrigation",
      "Improve airflow between plants",
      "Apply an appropriate fungicide according to the product label",
    ],

    actionWindow: {
      start: "06:00",
      end: "09:00",
      dateLabel: "Tomorrow morning",
      suitability: "good",
      reason:
        "Lower wind conditions and a lower chance of rainfall provide a better treatment window.",
    },

    urgency: "Treat within the next 24 hours",

    reasoning:
      "The detected symptoms are consistent with Early Blight. High humidity and increasing rainfall probability may increase disease pressure, so acting before the wetter period is preferable.",
  },
}