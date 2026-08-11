import { Leaf, MapPin, Bell } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-5 lg:px-10">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg">
          <Leaf size={21} />
        </div>

        <div>
          <h1 className="text-lg font-bold text-green-950">
            Krishi-Shield
          </h1>

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-green-700">
            Field Intelligence
          </p>
        </div>
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm">
          <MapPin size={15} />
          Vijayawada
        </div>

        <button className="rounded-full bg-white/70 p-3 text-slate-600 shadow-sm">
          <Bell size={17} />
        </button>
      </div>
    </nav>
  )
}