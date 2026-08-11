import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-green-950 px-7 py-12 text-white shadow-2xl lg:px-12 lg:py-16">

      <motion.div
        className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green-400/20 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm text-green-200">
          <Sparkles size={15} />
          AI-powered field intelligence
        </div>

        <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Know what your crop needs
          <span className="block text-green-300">
            before it's too late.
          </span>
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-7 text-green-100 md:text-lg">
          Turn a leaf photo, field location and live weather into a clear
          action plan for your farm.
        </p>

        <button className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 font-semibold text-green-950 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
          Analyze my field
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  )
}