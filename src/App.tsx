import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "./components/layout/Navbar"
import HeroSection from "./components/dashboard/HeroSection"
import FieldUpload from "./components/field/FieldUpload"

function App() {
  const [showResults, setShowResults] = useState(false)

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
        <HeroSection />

        <FieldUpload
          onAnalyze={() => setShowResults(true)}
        />

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-3xl bg-green-950 p-6 text-white"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400/20">
                <span>✓</span>
              </div>

              <div>
                <p className="font-semibold">
                  Field image received
                </p>

                <p className="text-sm text-green-200">
                  Analysis pipeline ready.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}

export default App