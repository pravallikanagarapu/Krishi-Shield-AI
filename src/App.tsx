import { useState } from "react"
import { motion } from "framer-motion"

import Navbar from "./components/layout/Navbar"
import HeroSection from "./components/dashboard/HeroSection"
import AnalysisResults from "./components/dashboard/AnalysisResults"
import DecisionCard from "./components/dashboard/DecisionCard"
import RiskTrajectory from "./components/dashboard/RiskTrajectory"
import WeatherTimeline from "./components/dashboard/WeatherTimeline"
import FieldUpload from "./components/field/FieldUpload"
import FieldSetup from "./components/field/FieldSetup"
import { FieldProvider } from "./components/field/FieldContext"

function App() {
  const [showResults, setShowResults] = useState(false)

  const handleAnalyze = () => {
    setShowResults(true)
  }

  const handleNewAnalysis = () => {
    setShowResults(false)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <FieldProvider>
      <main className="min-h-screen">

        <Navbar />

        <div className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">

          <HeroSection />

          {!showResults && (
            <>
              <FieldSetup />

              <FieldUpload onAnalyze={handleAnalyze} />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mx-auto mt-8 max-w-2xl text-center"
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  One scan • One clear decision
                </p>
              </motion.div>
            </>
          )}

          {showResults && (
            <>
              <AnalysisResults />

              <WeatherTimeline />

              <RiskTrajectory />

              <DecisionCard />

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleNewAnalysis}
                className="mx-auto mt-8 block rounded-full border border-green-700 px-6 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-700 hover:text-white"
              >
                Analyze another field
              </motion.button>
            </>
          )}

        </div>

      </main>
    </FieldProvider>
  )
}

export default App