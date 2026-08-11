import { MapPin, Sprout, Layers3 } from "lucide-react"
import { useField } from "./FieldContext"

export default function FieldSetup() {
  const {
    crop,
    location,
    cropStage,
    setCrop,
    setLocation,
    setCropStage,
  } = useField()

  return (
    <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-xl md:p-8">

      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">
          Field profile
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Tell us about your field
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          These details help personalize the field advisory.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">

        <label className="rounded-2xl bg-slate-50 p-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Sprout size={17} className="text-green-700" />
            Crop
          </span>

          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
          >
            <option>Tomato</option>
            <option>Rice</option>
            <option>Cotton</option>
            <option>Chilli</option>
            <option>Groundnut</option>
            <option>Maize</option>
          </select>
        </label>

        <label className="rounded-2xl bg-slate-50 p-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <MapPin size={17} className="text-green-700" />
            Location
          </span>

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter field location"
            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
          />
        </label>

        <label className="rounded-2xl bg-slate-50 p-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Layers3 size={17} className="text-green-700" />
            Crop stage
          </span>

          <select
            value={cropStage}
            onChange={(e) => setCropStage(e.target.value)}
            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
          >
            <option>Seedling</option>
            <option>Vegetative</option>
            <option>Flowering</option>
            <option>Fruiting</option>
            <option>Harvest</option>
          </select>
        </label>

      </div>
    </section>
  )
}