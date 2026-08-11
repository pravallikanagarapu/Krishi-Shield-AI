import { motion } from "framer-motion"
import {
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Gauge,
  Leaf,
  MapPin,
  Thermometer,
  Wind,
  Clock3,
} from "lucide-react"

import { demoFieldAnalysis } from "../../data/demoData"
import { calculateRisk } from "../../engine/riskEngine"
import { calculateActionWindow } from "../../engine/actionWindowEngine"

export default function AnalysisResults() {
  const field = demoFieldAnalysis

  const risk = calculateRisk({
    diagnosis: field.diagnosis,
    weather: field.weather,
  })

  const actionWindow = calculateActionWindow({
    weather: field.weather,
    riskScore: risk.score,
  })

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8 space-y-6"
    >
      {/* Analysis Header */}
      <div className="rounded-[2rem] bg-green-950 p-6 text-white shadow-2xl md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-green-300">
              <CheckCircle2 size={17} />
              ANALYSIS COMPLETE
            </div>

            <h2 className="mt-2 text-3xl font-bold">
              Your field needs attention
            </h2>

            <div className="mt-3 flex flex-wrap gap-3 text-sm text-green-100">
              <span className="flex items-center gap-1">
                <Leaf size={15} />
                {field.crop}
              </span>

              <span>•</span>

              <span className="flex items-center gap-1">
                <MapPin size={15} />
                {field.location.city}
              </span>

              <span>•</span>

              <span>
                {field.cropStage} stage
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-md">
            <p className="text-xs uppercase tracking-wider text-green-300">
              AI confidence
            </p>

            <p className="mt-1 text-3xl font-bold">
              {field.diagnosis.confidence}%
            </p>
          </div>

        </div>
      </div>

      {/* Diagnosis + Weather */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Diagnosis */}
        <article className="rounded-[2rem] bg-white p-6 shadow-xl md:p-8">

          <div className="flex items-start justify-between gap-4">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                AI Diagnosis
              </p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {field.diagnosis.disease}
              </h3>
            </div>

            <div className="rounded-2xl bg-orange-50 p-3 text-orange-600">
              <AlertTriangle size={24} />
            </div>

          </div>

          <div className="mt-6 rounded-2xl bg-orange-50 p-5">
            <p className="text-sm font-semibold text-orange-900">
              {field.diagnosis.severity.toUpperCase()} SEVERITY
            </p>

            <p className="mt-2 text-sm leading-6 text-orange-800">
              The visible symptoms are consistent with the detected
              condition. Early action can help reduce further spread.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-700">
              Observed symptoms
            </p>

            <div className="mt-3 space-y-2">
              {field.diagnosis.symptoms.map((symptom) => (
                <div
                  key={symptom}
                  className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  {symptom}
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Weather */}
        <article className="rounded-[2rem] bg-white p-6 shadow-xl md:p-8">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            Field Conditions
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            Weather pressure
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Current environmental signals affecting disease pressure.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">

            <div className="rounded-2xl bg-slate-50 p-4">
              <Thermometer className="text-orange-500" size={20} />

              <p className="mt-3 text-xs text-slate-500">
                Temperature
              </p>

              <p className="mt-1 text-2xl font-bold">
                {field.weather.temperature}°C
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <Droplets className="text-blue-500" size={20} />

              <p className="mt-3 text-xs text-slate-500">
                Humidity
              </p>

              <p className="mt-1 text-2xl font-bold">
                {field.weather.humidity}%
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <AlertTriangle className="text-yellow-500" size={20} />

              <p className="mt-3 text-xs text-slate-500">
                Rain probability
              </p>

              <p className="mt-1 text-2xl font-bold">
                {field.weather.rainProbability}%
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <Wind className="text-sky-500" size={20} />

              <p className="mt-3 text-xs text-slate-500">
                Wind
              </p>

              <p className="mt-1 text-2xl font-bold">
                {field.weather.windSpeed} km/h
              </p>
            </div>

          </div>
        </article>
      </div>

      {/* Risk */}
      <article className="rounded-[2rem] bg-white p-6 shadow-xl md:p-8">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Crop risk
            </p>

            <div className="mt-2 flex items-center gap-4">
              <span className="text-6xl font-black text-slate-900">
                {risk.score}%
              </span>

              <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold uppercase text-orange-700">
                {risk.level}
              </span>
            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Risk combines disease severity with environmental conditions
              to estimate near-term disease pressure.
            </p>
          </div>

          <div className="w-full max-w-lg">
            <div className="mb-3 flex justify-between text-xs font-medium text-slate-400">
              <span>LOW</span>
              <span>MODERATE</span>
              <span>HIGH</span>
              <span>CRITICAL</span>
            </div>

            <div className="h-5 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${risk.score}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600"
              />
            </div>
          </div>

        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-3">
          {risk.factors.map((factor) => (
            <div
              key={factor}
              className="rounded-2xl bg-orange-50 p-4 text-sm font-medium text-orange-900"
            >
              {factor}
            </div>
          ))}
        </div>
      </article>

      {/* Action Window */}
      <article className="overflow-hidden rounded-[2rem] bg-green-950 text-white shadow-2xl">

        <div className="p-6 md:p-8">

          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-green-300">
            <Clock3 size={18} />
            Recommended action window
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="text-sm text-green-200">
                Best available window
              </p>

              <h3 className="mt-1 text-4xl font-black">
                {actionWindow.dateLabel}
              </h3>

              <p className="mt-2 text-2xl font-semibold text-green-300">
                {actionWindow.start} – {actionWindow.end}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-md">
              <p className="text-xs uppercase tracking-wider text-green-300">
                Suitability
              </p>

              <p className="mt-1 text-xl font-bold uppercase">
                {actionWindow.suitability}
              </p>
            </div>

          </div>

          <div className="mt-7 rounded-2xl bg-white/10 p-5">
            <p className="text-sm leading-6 text-green-100">
              {actionWindow.reason}
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="border-t border-white/10 bg-black/10 p-6 md:p-8">

          <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-300">
            What to do
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">

            {field.recommendation.actions.map((action, index) => (
              <motion.div
                key={action}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-400/20 text-sm font-bold text-green-300">
                  {index + 1}
                </div>

                <p className="text-sm leading-6 text-green-50">
                  {action}
                </p>
              </motion.div>
            ))}

          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-yellow-400/10 p-4 text-sm text-yellow-100">
            <Gauge className="mt-0.5 shrink-0" size={18} />

            <p>
              {field.recommendation.urgency}. Always follow the product
              label and local agronomic guidance for treatment decisions.
            </p>
          </div>
        </div>
      </article>
    </motion.section>
  )
}