import { useState } from "react"
import { motion } from "framer-motion"

import Navbar from "./components/layout/Navbar"
import HeroSection from "./components/dashboard/HeroSection"
import AnalysisResults from "./components/dashboard/AnalysisResults"
import FieldUpload from "./components/field/FieldUpload"

function App() {
  const [showResults, setShowResults] = useState(false)

  return (
    <main className="min-h-screen">

      <Navbar />

      <div className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">

        <HeroSection />

        {!showResults && (
          <FieldUpload
            onAnalyze={() => setShowResults(true)}
          />
        )}

        {showResults && (
          <AnalysisResults />
        )}

        {!showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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