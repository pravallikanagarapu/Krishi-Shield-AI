import type {
  ActionWindow,
  WeatherData,
} from "../types/agriculture"

interface ActionWindowInput {
  weather: WeatherData
  riskScore: number
}

export function calculateActionWindow({
  weather,
  riskScore,
}: ActionWindowInput): ActionWindow {
  const isLowWind = weather.windSpeed <= 15
  const isLowRainRisk = weather.rainProbability < 40
  const isModerateRainRisk = weather.rainProbability < 60

  // Best-case treatment conditions
  if (isLowWind && isLowRainRisk) {
    return {
      start: "06:00",
      end: "09:00",
      dateLabel: "Tomorrow morning",
      suitability: "good",
      reason:
        "Low wind and low rainfall probability provide a favorable window for field treatment.",
    }
  }

  // Acceptable but less reliable conditions
  if (isLowWind && isModerateRainRisk) {
    return {
      start: "06:00",
      end: "08:00",
      dateLabel: "Tomorrow morning",
      suitability: "moderate",
      reason:
        "Wind conditions are suitable, but rainfall probability may reduce treatment effectiveness.",
    }
  }

  // High risk or unfavorable weather
  if (riskScore >= 70 || weather.rainProbability >= 60) {
    return {
      start: "06:00",
      end: "08:00",
      dateLabel: "Next available dry morning",
      suitability: "poor",
      reason:
        "Increasing disease pressure and unfavorable weather conditions make immediate treatment less reliable.",
    }
  }

  return {
    start: "06:00",
    end: "09:00",
    dateLabel: "Tomorrow morning",
    suitability: "moderate",
    reason:
      "Conditions are acceptable, but monitoring weather changes before treatment is recommended.",
  }
}