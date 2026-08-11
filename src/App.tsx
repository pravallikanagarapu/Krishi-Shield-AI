import { useState } from "react"
import { motion } from "framer-motion"

import Navbar from "./components/layout/Navbar"
import HeroSection from "./components/dashboard/HeroSection"
import AnalysisResults from "./components/dashboard/AnalysisResults"
import DecisionCard from "./components/dashboard/DecisionCard"
import RiskTrajectory from "./components/dashboard/RiskTrajectory"
import WeatherTimeline from "./components/dashboard/WeatherTimeline"
import FieldUpload from "./components/field/FieldUpload"

function App() {
  const [showResults, setShowResults] = useState(false)

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        {/* Hero */}
        <HeroSection />

        {/* Field Image Upload */}
        {!showResults && (
          <FieldUpload
            onAnalyze={() => setShowResults(true)}
          />
        )}

        {/* Analysis Results */}
        {showResults && (
          <>
            <AnalysisResults />

            {/* Risk Prediction */}
            <RiskTrajectory />

            {/* Final Field Decision */}
            <DecisionCard />
            <WeatherTimeline />
          </>
        )}

        {/* Bottom Message */}
        {!showResults && (
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
        )}
      </div>
    </main>
  )
}

export default App