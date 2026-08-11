import { motion } from "framer-motion"
import {
  CloudRain,
  Droplets,
  Sun,
  Wind,
} from "lucide-react"

const forecast = [
  {
    time: "Now",
    temperature: 28,
    rain: 68,
    wind: 12,
    icon: CloudRain,
  },
  {
    time: "12 PM",
    temperature: 30,
    rain: 54,
    wind: 15,
    icon: CloudRain,
  },
  {
    time: "3 PM",
    temperature: 31,
    rain: 42,
    wind: 18,
    icon: Sun,
  },
  {
    time: "6 PM",
    temperature: 29,
    rain: 35,
    wind: 10,
    icon: CloudRain,
  },
  {
    time: "Tomorrow",
    temperature: 27,
    rain: 24,
    wind: 8,
    icon: Sun,
  },
]

export default function WeatherTimeline() {
  return (
    <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-xl md:p-8">

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          Weather timeline
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          What the field will experience
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Weather signals help determine when field action is safest.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-3">

          {forecast.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-40 rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <p className="text-sm font-semibold text-slate-600">
                  {item.time}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <Icon
                    size={27}
                    className="text-green-700"
                  />

                  <span className="text-2xl font-bold text-slate-900">
                    {item.temperature}°
                  </span>
                </div>

                <div className="mt-5 space-y-3">

                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-slate-500">
                      <CloudRain size={13} />
                      Rain
                    </span>

                    <span className="font-semibold text-slate-700">
                      {item.rain}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Wind size={13} />
                      Wind
                    </span>

                    <span className="font-semibold text-slate-700">
                      {item.wind} km/h
                    </span>
                  </div>

                </div>
              </motion.div>
            )
          })}

        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">

        <div className="flex items-center gap-3 rounded-2xl bg-blue-50 p-4">
          <Droplets
            size={20}
            className="text-blue-600"
          />

          <div>
            <p className="text-xs text-blue-600">
              Weather insight
            </p>

            <p className="mt-1 text-sm font-semibold text-blue-950">
              Rain probability decreases toward tomorrow morning.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-green-50 p-4">
          <Sun
            size={20}
            className="text-green-700"
          />

          <div>
            <p className="text-xs text-green-700">
              Action insight
            </p>

            <p className="mt-1 text-sm font-semibold text-green-950">
              Tomorrow morning offers a better treatment window.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}