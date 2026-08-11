export interface WeatherData {
  latitude: number
  longitude: number
  timezone: string

  current: {
    temperature: number
    humidity: number
    rain: number
    windSpeed: number
  }

  hourly: {
    time: string[]
    temperature: number[]
    humidity: number[]
    rainProbability: number[]
    windSpeed: number[]
  }
}

export interface LocationData {
  name: string
  latitude: number
  longitude: number
  country: string
  admin1?: string
}

export async function searchLocation(
  location: string
): Promise<LocationData> {
  const url =
    `https://geocoding-api.open-meteo.com/v1/search` +
    `?name=${encodeURIComponent(location)}` +
    `&count=1` +
    `&language=en` +
    `&format=json`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Unable to find location")
  }

  const data = await response.json()

  if (!data.results || data.results.length === 0) {
    throw new Error(`Location "${location}" was not found`)
  }

  const result = data.results[0]

  return {
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country,
    admin1: result.admin1,
  }
}

export async function getWeather(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m` +
    `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m` +
    `&forecast_days=3` +
    `&timezone=auto`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Unable to fetch weather")
  }

  const data = await response.json()

  return {
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,

    current: {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      rain: data.current.rain,
      windSpeed: data.current.wind_speed_10m,
    },

    hourly: {
      time: data.hourly.time,
      temperature: data.hourly.temperature_2m,
      humidity: data.hourly.relative_humidity_2m,
      rainProbability:
        data.hourly.precipitation_probability,
      windSpeed: data.hourly.wind_speed_10m,
    },
  }
}