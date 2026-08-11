import type {
  Diagnosis,
  RiskLevel,
  WeatherData,
} from "../types/agriculture"

interface RiskInput {
  diagnosis: Diagnosis
  weather: WeatherData
}

interface RiskResult {
  score: number
  level: RiskLevel
  factors: string[]
}

export function calculateRisk({
  diagnosis,
  weather,
}: RiskInput): RiskResult {
  let score = 0
  const factors: string[] = []

  // Disease severity
  const severityScore = {
    low: 10,
    moderate: 20,
    high: 30,
    critical: 40,
  }

  score += severityScore[diagnosis.severity]

  if (diagnosis.severity === "high" || diagnosis.severity === "critical") {
    factors.push("Disease severity is elevated")
  }

  // Humidity
  if (weather.humidity >= 80) {
    score += 25
    factors.push("High humidity increases disease pressure")
  } else if (weather.humidity >= 65) {
    score += 15
    factors.push("Moderate humidity may support disease development")
  }

  // Rain probability
  if (weather.rainProbability >= 70) {
    score += 25
    factors.push("High rainfall probability may accelerate disease spread")
  } else if (weather.rainProbability >= 50) {
    score += 15
    factors.push("Rainfall probability is increasing")
  }

  // Temperature
  if (weather.temperature >= 24 && weather.temperature <= 30) {
    score += 10
    factors.push("Temperature is favorable for disease development")
  }

  // Keep score between 0 and 100
  score = Math.min(score, 100)

  let level: RiskLevel

  if (score >= 80) {
    level = "critical"
  } else if (score >= 60) {
    level = "high"
  } else if (score >= 40) {
    level = "moderate"
  } else {
    level = "low"
  }

  return {
    score,
    level,
    factors,
  }
}