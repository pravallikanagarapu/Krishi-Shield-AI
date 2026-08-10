export type CropStage =
  | "seedling"
  | "vegetative"
  | "flowering"
  | "fruiting"
  | "maturity"

export type Severity =
  | "low"
  | "moderate"
  | "high"
  | "critical"

export type RiskLevel =
  | "low"
  | "moderate"
  | "high"
  | "critical"

export interface LocationData {
  city: string
  state: string
  country: string
  latitude: number
  longitude: number
}

export interface WeatherData {
  temperature: number
  humidity: number
  rainProbability: number
  windSpeed: number
  condition: string
}

export interface Diagnosis {
  disease: string
  confidence: number
  severity: Severity
  symptoms: string[]
}

export interface RiskProjection {
  current: number
  after24Hours: number
  after48Hours: number
}

export interface ActionWindow {
  start: string
  end: string
  dateLabel: string
  suitability: "good" | "moderate" | "poor"
  reason: string
}

export interface Recommendation {
  actions: string[]
  actionWindow: ActionWindow
  urgency: string
  reasoning: string
}

export interface FieldAnalysis {
  crop: string
  cropStage: CropStage
  location: LocationData
  diagnosis: Diagnosis
  weather: WeatherData
  risk: RiskProjection
  recommendation: Recommendation
}