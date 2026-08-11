import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"

import {
  getWeather,
  searchLocation,
  type LocationData,
  type WeatherData,
} from "../../services/weatherService"

interface FieldContextType {
  crop: string
  location: string
  cropStage: string

  locationData: LocationData | null
  weather: WeatherData | null

  loadingWeather: boolean
  weatherError: string | null

  setCrop: (value: string) => void
  setLocation: (value: string) => void
  setCropStage: (value: string) => void

  loadWeather: () => Promise<void>
}

const FieldContext =
  createContext<FieldContextType | undefined>(undefined)

export function FieldProvider({
  children,
}: {
  children: ReactNode
}) {
  const [crop, setCrop] = useState("Tomato")
  const [location, setLocation] = useState("Vijayawada")
  const [cropStage, setCropStage] = useState("Flowering")

  const [locationData, setLocationData] =
    useState<LocationData | null>(null)

  const [weather, setWeather] =
    useState<WeatherData | null>(null)

  const [loadingWeather, setLoadingWeather] =
    useState(false)

  const [weatherError, setWeatherError] =
    useState<string | null>(null)

  const loadWeather = async () => {
    try {
      setLoadingWeather(true)
      setWeatherError(null)

      const foundLocation =
        await searchLocation(location)

      setLocationData(foundLocation)

      const weatherData = await getWeather(
        foundLocation.latitude,
        foundLocation.longitude
      )

      setWeather(weatherData)
    } catch (error) {
      setWeatherError(
        error instanceof Error
          ? error.message
          : "Unable to load weather"
      )
    } finally {
      setLoadingWeather(false)
    }
  }

  return (
    <FieldContext.Provider
      value={{
        crop,
        location,
        cropStage,

        locationData,
        weather,

        loadingWeather,
        weatherError,

        setCrop,
        setLocation,
        setCropStage,

        loadWeather,
      }}
    >
      {children}
    </FieldContext.Provider>
  )
}

export function useField() {
  const context = useContext(FieldContext)

  if (!context) {
    throw new Error(
      "useField must be used inside FieldProvider"
    )
  }

  return context
}