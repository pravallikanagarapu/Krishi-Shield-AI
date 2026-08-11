import Navbar from "./components/layout/Navbar"
import HeroSection from "./components/dashboard/HeroSection"

function App() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-7xl px-5 pb-10 lg:px-8">
        <HeroSection />
      </div>
    </main>
  )
}

export default App