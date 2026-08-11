import { motion } from "framer-motion"
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShieldAlert,
} from "lucide-react"

import { demoFieldAnalysis } from "../../data/demoData"
import { calculateRisk } from "../../engine/riskEngine"
import { calculateActionWindow } from "../../engine/actionWindowEngine"

export default function DecisionCard() {
  const field = demoFieldAnalysis

  const risk = calculateRisk({
    diagnosis: field.diagnosis,
    weather: field.weather,
  })

  const actionWindow = calculateActionWindow({
    weather: field.weather,
    riskScore: risk.score,
  })

  const decision =
    actionWindow.suitability === "good"
      ? "ACT NOW"
      : actionWindow.suitability === "moderate"
        ? "WAIT FOR WINDOW"
        : "AVOID THIS WINDOW"

  const icon =
    actionWindow.suitability === "good"
      ? CheckCircle2
      : actionWindow.suitability === "moderate"
        ? Clock3
        : ShieldAlert

  const Icon = icon

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl"
    >
      <div className="p-6 md:p-8">

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-green-300">
          <ShieldAlert size={16} />
          Field decision
        </div>

        <div className="mt-6 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-5">

            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-400/15 text-green-300"
            >
              <Icon size={32} />
            </motion.div>

            <div>
              <p className="text-sm text-slate-400">
                Recommended decision
              </p>

              <h2 className="mt-1 text-3xl font-black tracking-tight md:text-4xl">
                {decision}
              </h2>
            </div>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Risk pressure
            </p>

            <p className="mt-1 text-2xl font-bold">
              {risk.score}%
            </p>
          </div>

        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-3">

          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs text-slate-400">
              Best window
            </p>

            <p className="mt-2 font-semibold">
              {actionWindow.dateLabel}
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs text-slate-400">
              Time
            </p>

            <p className="mt-2 font-semibold">
              {actionWindow.start} – {actionWindow.end}
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs text-slate-400">
              Weather suitability
            </p>

            <p className="mt-2 font-semibold uppercase text-green-300">
              {actionWindow.suitability}
            </p>
          </div>

        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-green-400/10 p-4">
          <ArrowRight
            size={18}
            className="mt-0.5 shrink-0 text-green-300"
          />

          <p className="text-sm leading-6 text-green-50">
            {actionWindow.reason}
          </p>
        </div>

      </div>
    </motion.section>
  )
}