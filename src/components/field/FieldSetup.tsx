import {
  Loader2,
  MapPin,
  Sprout,
  Layers3,
  CloudSun,
} from "lucide-react"

import { useField } from "./FieldContext"

export default function FieldSetup() {
  const {
    crop,
    location,
    cropStage,
    setCrop,
    setLocation,
    setCropStage,
    loadWeather,
    loadingWeather,
    weather,
    locationData,
    weatherError,
  } = useField()

  return (
    <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-xl md:p-8">

      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">
          Field profile
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Tell us about your field
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          We use your field location to retrieve live weather
          conditions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">

        {/* Crop */}
        <label className="rounded-2xl bg-slate-50 p-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Sprout
              size={17}
              className="text-green-700"
            />
            Crop
          </span>

          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
          >
            <option>Tomato</option>
            <option>Rice</option>
            <option>Cotton</option>
            <option>Chilli</option>
            <option>Groundnut</option>
            <option>Maize</option>
          </select>
        </label>

        {/* Location */}
        <label className="rounded-2xl bg-slate-50 p-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <MapPin
              size={17}
              className="text-green-700"
            />
            Location
          </span>

          <input
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            placeholder="Enter city or village"
            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
          />
        </label>

        {/* Crop Stage */}
        <label className="rounded-2xl bg-slate-50 p-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Layers3
              size={17}
              className="text-green-700"
            />
            Crop stage
          </span>

          <select
            value={cropStage}
            onChange={(e) =>
              setCropStage(e.target.value)
            }
            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
          >
            <option>Seedling</option>
            <option>Vegetative</option>
            <option>Flowering</option>
            <option>Fruiting</option>
            <option>Harvest</option>
          </select>
        </label>

      </div>

      {/* Fetch Weather */}
      <button
        onClick={loadWeather}
        disabled={loadingWeather || !location.trim()}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-800 px-5 py-4 text-sm font-bold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loadingWeather ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Fetching field weather...
          </>
        ) : (
          <>
            <CloudSun size={18} />
            Get Live Field Conditions
          </>
        )}
      </button>

      {/* Location Result */}
      {locationData && (
        <div className="mt-5 rounded-2xl bg-green-50 p-4">

          <div className="flex items-center gap-2">
            <MapPin
              size={18}
              className="text-green-700"
            />

            <div>
              <p className="text-sm font-bold text-green-950">
                {locationData.name}
              </p>

              <p className="text-xs text-green-700">
                {locationData.admin1
                  ? `${locationData.admin1}, `
                  : ""}
                {locationData.country}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Live Weather */}
      {weather && (
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              Temperature
            </p>

            <p className="mt-1 text-xl font-bold">
              {weather.current.temperature}°C
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              Humidity
            </p>

            <p className="mt-1 text-xl font-bold">
              {weather.current.humidity}%
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              Rain
            </p>

            <p className="mt-1 text-xl font-bold">
              {weather.current.rain} mm
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              Wind
            </p>

            <p className="mt-1 text-xl font-bold">
              {weather.current.windSpeed} km/h
            </p>
          </div>

        </div>
      )}

      {/* Error */}
      {weatherError && (
        <div className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">
          {weatherError}
        </div>
      )}

    </section>
  )
}