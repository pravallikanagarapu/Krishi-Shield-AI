import { useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  Camera,
  Upload,
  Image as ImageIcon,
  X,
  Sparkles,
} from "lucide-react"

interface FieldUploadProps {
  onAnalyze: () => void
}

export default function FieldUpload({ onAnalyze }: FieldUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [image, setImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return

    const imageUrl = URL.createObjectURL(file)
    setImage(imageUrl)
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleFile(event.target.files?.[0])
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)

    handleFile(event.dataTransfer.files?.[0])
  }

  const removeImage = () => {
    setImage(null)

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl md:p-8">

      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
          <Sparkles size={16} />
          FIELD SCAN
        </div>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Show us what's happening in your field
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Upload a clear photo of the affected leaf or crop area.
          Krishi-Shield will analyze the visible symptoms and combine
          them with field conditions.
        </p>
      </div>

      {!image ? (
        <motion.div
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          animate={{
            scale: isDragging ? 1.01 : 1,
          }}
          className={`relative flex min-h-[320px] flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed p-8 text-center transition ${
            isDragging
              ? "border-green-500 bg-green-50"
              : "border-slate-200 bg-slate-50 hover:border-green-300 hover:bg-green-50/50"
          }`}
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <ImageIcon size={30} />
          </div>

          <h3 className="text-lg font-semibold text-slate-900">
            Drop your crop image here
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            JPG, PNG or WEBP • Clear leaf photos work best
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-700 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-800"
            >
              <Upload size={18} />
              Upload image
            </button>

            <button
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Camera size={18} />
              Take a photo
            </button>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            capture="environment"
            onChange={handleInputChange}
            className="hidden"
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="overflow-hidden rounded-[1.5rem] bg-slate-950"
        >
          <div className="relative">
            <img
              src={image}
              alt="Uploaded crop"
              className="max-h-[420px] w-full object-contain"
            />

            <button
              onClick={removeImage}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-white">
                Image ready for analysis
              </p>

              <p className="mt-1 text-sm text-slate-400">
                We'll combine visual symptoms with field conditions.
              </p>
            </div>

            <button
              onClick={onAnalyze}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-400"
            >
              <Sparkles size={17} />
              Analyze field
            </button>
          </div>
        </motion.div>
      )}
    </section>
  )
}