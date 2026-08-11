import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Camera,
    Upload,
    Image as ImageIcon,
    X,
    Sparkles,
    Loader2,
    CheckCircle2,
    AlertTriangle,
    ShieldCheck,
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
        <motion.section
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mt-8 overflow-hidden rounded-[2rem] border border-[#dfead8] bg-white/90 p-6 shadow-[0_20px_60px_rgba(48,84,54,0.10)] backdrop-blur-xl md:p-8"
        >
            {/* Decorative background */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#e2f3df]/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-[#f7e5d7]/50 blur-3xl" />

            <div className="relative mb-7">
                <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 text-sm font-semibold text-green-700"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e3f2df]">
                        <Sparkles size={16} />
                    </span>

                    FIELD SCAN
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="mt-3 text-2xl font-bold tracking-tight text-slate-900"
                >
                    Show us what's happening in your field
                </motion.h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Upload a clear photo of the affected leaf or crop area.
                    Krishi-Shield will analyze the visible symptoms and combine
                    them with field conditions.
                </p>
            </div>

            <AnimatePresence mode="wait">
                {!image ? (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{
                            opacity: 1,
                            scale: isDragging ? 1.015 : 1,
                        }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        onDragOver={(event) => {
                            event.preventDefault()
                            setIsDragging(true)
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={`relative flex min-h-[330px] flex-col items-center justify-center overflow-hidden rounded-[1.7rem] border-2 border-dashed p-8 text-center transition-all duration-500 ${
                            isDragging
                                ? "border-green-500 bg-[#edf8ea] shadow-[0_15px_40px_rgba(22,101,52,0.10)]"
                                : "border-[#d9e5d4] bg-gradient-to-br from-[#f5f9f2] via-white to-[#faf4ee] hover:border-green-300"
                        }`}
                    >
                        {/* Floating decorative dots */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute left-[12%] top-[15%] h-3 w-3 rounded-full bg-[#cfe8c9]"
                        />

                        <motion.div
                            animate={{
                                y: [0, 8, 0],
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute right-[15%] top-[22%] h-4 w-4 rounded-full bg-[#f1d9c8]"
                        />

                        <motion.div
                            animate={{
                                y: [0, -7, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute bottom-[15%] left-[18%] h-2.5 w-2.5 rounded-full bg-[#d9dfb7]"
                        />

                        <motion.div
                            animate={{
                                y: [0, 8, 0],
                                rotate: [0, -5, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute bottom-[20%] right-[18%] h-3 w-3 rounded-full bg-[#d6e9ef]"
                        />

                        {/* Main icon */}
                        <motion.div
                            animate={{
                                y: [0, -7, 0],
                                rotate: [0, 2, -2, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-gradient-to-br from-[#dff2da] to-[#eef6e9] text-green-700 shadow-[0_12px_30px_rgba(48,84,54,0.10)]"
                        >
                            <ImageIcon size={34} strokeWidth={1.8} />

                            <motion.span
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#8fbd79]"
                            />
                        </motion.div>

                        <h3 className="relative text-lg font-semibold text-slate-900">
                            Drop your crop image here
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            JPG, PNG or WEBP • Clear leaf photos work best
                        </p>

                        <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
                            <motion.button
                                whileHover={{ y: -2, scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => inputRef.current?.click()}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-700 px-6 py-3 font-semibold text-white shadow-lg shadow-green-900/10 transition-all hover:bg-green-800"
                            >
                                <Upload size={18} />
                                Upload image
                            </motion.button>

                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => inputRef.current?.click()}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dce5d8] bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm transition-all hover:bg-[#f7faf5]"
                            >
                                <Camera size={18} />
                                Take a photo
                            </motion.button>
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
                        key="preview"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        className="overflow-hidden rounded-[1.7rem] border border-slate-800 bg-slate-950 shadow-2xl"
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

                        <div className="flex flex-col gap-4 bg-[#172018] p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="font-semibold text-white">
                                    Image ready for analysis
                                </p>

                                <p className="mt-1 text-sm text-slate-400">
                                    Crop: {crop}
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ y: -2, scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleAnalyze}
                                disabled={isAnalyzing}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#75b95c] px-6 py-3 font-semibold text-white shadow-lg shadow-green-950/20 transition hover:bg-[#87c96c] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 size={17} className="animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={17} />
                                        Analyze field
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
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
            </AnimatePresence>

            {/* Diagnosis */}
            <AnimatePresence>
                {diagnosis && (
                    <motion.div
                        initial={{ opacity: 0, y: 25, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="mt-7 overflow-hidden rounded-[1.7rem] border border-[#d7e8d2] bg-gradient-to-br from-[#edf8e9] via-[#f7faf4] to-[#fbf2e9] p-6 shadow-[0_15px_45px_rgba(48,84,54,0.08)]"
                    >
                        {/* Diagnosis header */}
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm">
                                        <CheckCircle2 size={17} />
                                    </span>
                                    AI DIAGNOSIS
                                </div>

                                <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                                    {diagnosis.disease}
                                </h3>

                                <p className="mt-1 text-sm text-slate-600">
                                    Crop: {diagnosis.crop}
                                </p>
                            </div>

                            {/* Confidence */}
                            <div className="min-w-[150px] rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-medium text-slate-500">
                                        Confidence
                                    </p>

                                    <ShieldCheck
                                        size={16}
                                        className="text-green-600"
                                    />
                                </div>

                                <p className="mt-1 text-2xl font-bold text-green-700">
                                    {diagnosis.confidence}%
                                </p>

                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-green-100">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: `${Math.min(
                                                Math.max(diagnosis.confidence, 0),
                                                100,
                                            )}%`,
                                        }}
                                        transition={{
                                            duration: 1,
                                            delay: 0.3,
                                            ease: "easeOut",
                                        }}
                                        className="h-full rounded-full bg-green-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Summary cards */}
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <motion.div
                                whileHover={{ y: -3 }}
                                className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm"
                            >
                                <p className="text-sm font-semibold text-slate-900">
                                    Severity
                                </p>

                                <p className="mt-2 font-semibold text-[#c56f45]">
                                    {diagnosis.severity}
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -3 }}
                                className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm"
                            >
                                <p className="text-sm font-semibold text-slate-900">
                                    Crop
                                </p>

                                <p className="mt-2 font-semibold text-green-700">
                                    {diagnosis.crop}
                                </p>
                            </motion.div>
                        </div>

                        {/* Symptoms */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="mt-4 rounded-2xl border border-white bg-white/85 p-5 shadow-sm"
                        >
                            <h4 className="font-semibold text-slate-900">
                                Visible symptoms
                            </h4>

                            <ul className="mt-3 space-y-2">
                                {diagnosis.symptoms.map(
                                    (symptom, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: 0.35 + index * 0.06,
                                            }}
                                            className="flex gap-3 text-sm leading-6 text-slate-600"
                                        >
                                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                                            {symptom}
                                        </motion.li>
                                    ),
                                )}
                            </ul>
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="mt-4 rounded-2xl border border-white bg-white/85 p-5 shadow-sm"
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e3f2df] text-green-700">
                                    <SproutIcon />
                                </div>

                                <h4 className="font-semibold text-slate-900">
                                    Recommended actions
                                </h4>
                            </div>

                            <ul className="mt-3 space-y-2">
                                {diagnosis.actions.map(
                                    (action, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: 0.45 + index * 0.06,
                                            }}
                                            className="flex gap-3 text-sm leading-6 text-slate-600"
                                        >
                                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#75b95c]" />
                                            {action}
                                        </motion.li>
                                    ),
                                )}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    )
}

function SproutIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 20h10" />
            <path d="M12 20V10" />
            <path d="M12 10C8 10 5 7 5 3c4 0 7 3 7 7Z" />
            <path d="M12 14c0-4 3-7 7-7 0 4-3 7-7 7Z" />
        </svg>
    )
}