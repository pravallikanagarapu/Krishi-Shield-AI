import { useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  Camera,
  Upload,
  Image as ImageIcon,
  X,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"

import {
  diagnoseLeaf,
  type DiagnosisResult,
} from "../../services/diagnosisService"

interface FieldUploadProps {
  onAnalyze: () => void
  crop?: string
}

export default function FieldUpload({
  onAnalyze,
  crop = "Tomato",
}: FieldUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [image, setImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [diagnosis, setDiagnosis] =
    useState<DiagnosisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFile = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please select a valid image file.")
      return
    }

    setError(null)
    setDiagnosis(null)

    const imageUrl = URL.createObjectURL(file)

    setImage(imageUrl)
    setSelectedFile(file)
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
    if (image) {
      URL.revokeObjectURL(image)
    }

    setImage(null)
    setSelectedFile(null)
    setDiagnosis(null)
    setError(null)

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result)
        } else {
          reject(new Error("Unable to read image"))
        }
      }

      reader.onerror = () => {
        reject(new Error("Unable to read image"))
      }

      reader.readAsDataURL(file)
    })
  }

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select an image before analyzing.")
      return
    }

    try {
      setIsAnalyzing(true)
      setError(null)
      setDiagnosis(null)

      const base64Image = await fileToBase64(selectedFile)

      const result = await diagnoseLeaf(
        base64Image,
        crop,
      )

      setDiagnosis(result)

      onAnalyze()
    } catch (err) {
      console.error("Leaf diagnosis error:", err)

      setError(
        err instanceof Error
          ? err.message
          : "Unable to analyze the leaf image.",
      )
    } finally {
      setIsAnalyzing(false)
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
              disabled={isAnalyzing}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
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
                Crop: {crop}
              </p>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isAnalyzing ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={17} />
                  Analyze field
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700"
        >
          <AlertTriangle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-semibold">
              Analysis failed
            </p>

            <p className="mt-1 text-sm">
              {error}
            </p>
          </div>
        </motion.div>
      )}

      {diagnosis && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-[1.5rem] border border-green-100 bg-green-50 p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                <CheckCircle2 size={17} />
                AI DIAGNOSIS
              </div>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {diagnosis.disease}
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Crop: {diagnosis.crop}
              </p>
            </div>

            <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm">
              <p className="text-xs font-medium text-slate-500">
                Confidence
              </p>

              <p className="mt-1 text-xl font-bold text-green-700">
                {diagnosis.confidence}%
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">
                Severity
              </p>

              <p className="mt-2 font-medium text-orange-600">
                {diagnosis.severity}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">
                Crop
              </p>

              <p className="mt-2 font-medium text-green-700">
                {diagnosis.crop}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-white p-5">
            <h4 className="font-semibold text-slate-900">
              Visible symptoms
            </h4>

            <ul className="mt-3 space-y-2">
              {diagnosis.symptoms.map(
                (symptom, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-sm text-slate-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                    {symptom}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="mt-4 rounded-2xl bg-white p-5">
            <h4 className="font-semibold text-slate-900">
              Recommended actions
            </h4>

            <ul className="mt-3 space-y-2">
              {diagnosis.actions.map(
                (action, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-sm text-slate-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                    {action}
                  </li>
                ),
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </section>
  )
}