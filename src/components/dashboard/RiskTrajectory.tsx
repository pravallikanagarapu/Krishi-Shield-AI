import { motion } from "framer-motion"

export default function RiskTrajectory() {
  const points = [
    { label: "Now", value: 70 },
    { label: "+24h", value: 78 },
    { label: "+48h", value: 84 },
  ]

  return (
    <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-xl md:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        Risk trajectory
      </p>

      <h2 className="mt-2 text-2xl font-bold text-slate-900">
        Disease pressure is rising
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Projected crop risk over the next 48 hours.
      </p>

      <div className="mt-8 space-y-5">
        {points.map((point, index) => (
          <div key={point.label}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600">
                {point.label}
              </span>

              <span className="text-sm font-bold text-slate-900">
                {point.value}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${point.value}%` }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                }}
                className="h-full rounded-full bg-green-700"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}