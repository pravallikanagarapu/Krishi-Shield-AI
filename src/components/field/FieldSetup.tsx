import {
    Loader2,
    MapPin,
    Sprout,
    Layers3,
    CloudSun,
    Thermometer,
    Droplets,
    CloudRain,
    Wind,
} from "lucide-react"
import { motion, AnimatePresence, type Variants } from "framer-motion"

import { useField } from "./FieldContext"

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
}

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
}

export default function FieldSetup() {
    const {
        crop,
        location,
        cropStage,
        setCrop,
        setLocation,
        setCropStage,
        loadWeather,
        loadingWeather,
        weather,
        locationData,
        weatherError,
    } = useField()

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mt-6 overflow-hidden rounded-[2rem] border border-[#dfead8] bg-white/90 p-6 shadow-[0_20px_60px_rgba(48,84,54,0.10)] backdrop-blur-xl md:p-8"
        >
            {/* Decorative pastel glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#dff3df]/70 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#f8e8d8]/50 blur-3xl" />

            {/* Header */}
            <div className="relative mb-7">
                <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="flex items-center gap-2"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e4f3e2] text-green-700">
                        <Sprout size={16} />
                    </span>

                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                        Field profile
                    </p>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="mt-3 text-2xl font-bold tracking-tight text-[#172018]"
                >
                    Tell us about your field
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="mt-2 max-w-2xl text-sm leading-6 text-slate-500"
                >
                    We use your field location to retrieve live weather
                    conditions and make the diagnosis more context-aware.
                </motion.p>
            </div>

            {/* Field inputs */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative grid gap-4 md:grid-cols-3"
            >
                {/* Crop */}
                <motion.label
                    variants={cardVariants}
                    whileHover={{ y: -3 }}
                    className="group rounded-2xl border border-[#e4ecdf] bg-[#f4f8f1] p-4 transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(48,84,54,0.08)]"
                >
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#dff0dc] text-green-700 transition-transform duration-300 group-hover:scale-110">
                            <Sprout size={17} />
                        </span>
                        Crop
                    </span>

                    <select
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                        className="mt-3 w-full rounded-xl border border-[#dce7d8] bg-white px-3 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                    >
                        <option>Tomato</option>
                        <option>Rice</option>
                        <option>Cotton</option>
                        <option>Chilli</option>
                        <option>Groundnut</option>
                        <option>Maize</option>
                    </select>
                </motion.label>

                {/* Location */}
                <motion.label
                    variants={cardVariants}
                    whileHover={{ y: -3 }}
                    className="group rounded-2xl border border-[#e9e2d8] bg-[#fbf7f1] p-4 transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(105,81,51,0.08)]"
                >
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f3e6d8] text-[#a56b38] transition-transform duration-300 group-hover:scale-110">
                            <MapPin size={17} />
                        </span>
                        Location
                    </span>

                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter city or village"
                        className="mt-3 w-full rounded-xl border border-[#e7ded2] bg-white px-3 py-3 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#b9895c] focus:ring-4 focus:ring-[#f4e9dc]"
                    />
                </motion.label>

                {/* Crop Stage */}
                <motion.label
                    variants={cardVariants}
                    whileHover={{ y: -3 }}
                    className="group rounded-2xl border border-[#e4e5dc] bg-[#f7f8f2] p-4 transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(48,84,54,0.08)]"
                >
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e9edcf] text-[#68732f] transition-transform duration-300 group-hover:scale-110">
                            <Layers3 size={17} />
                        </span>
                        Crop stage
                    </span>

                    <select
                        value={cropStage}
                        onChange={(e) => setCropStage(e.target.value)}
                        className="mt-3 w-full rounded-xl border border-[#dfe4d3] bg-white px-3 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-[#7b8738] focus:ring-4 focus:ring-[#eef0d9]"
                    >
                        <option>Seedling</option>
                        <option>Vegetative</option>
                        <option>Flowering</option>
                        <option>Fruiting</option>
                        <option>Harvest</option>
                    </select>
                </motion.label>
            </motion.div>

            {/* Weather button */}
            <motion.button
                whileHover={{ y: -2, scale: 1.005 }}
                whileTap={{ scale: 0.985 }}
                onClick={loadWeather}
                disabled={loadingWeather || !location.trim()}
                className="relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#166534] to-[#2f7d45] px-5 py-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(22,101,52,0.20)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(22,101,52,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
            >
                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 hover:translate-x-full" />

                <span className="relative flex items-center gap-2">
                    {loadingWeather ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Fetching field weather...
                        </>
                    ) : (
                        <>
                            <CloudSun size={18} />
                            Get Live Field Conditions
                        </>
                    )}
                </span>
            </motion.button>

            {/* Results */}
            <AnimatePresence mode="wait">
                {/* Location */}
                {locationData && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.45 }}
                        className="mt-5 overflow-hidden rounded-2xl border border-[#d9ead5] bg-gradient-to-r from-[#edf8eb] to-[#f5faf1] p-4"
                    >
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ y: [0, -3, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm"
                            >
                                <MapPin size={18} />
                            </motion.div>

                            <div>
                                <p className="text-sm font-bold text-green-950">
                                    {locationData.name}
                                </p>

                                <p className="text-xs text-green-700">
                                    {locationData.admin1
                                        ? `${locationData.admin1}, `
                                        : ""}
                                    {locationData.country}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Weather */}
                {weather && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4"
                    >
                        <WeatherCard
                            icon={<Thermometer size={18} />}
                            label="Temperature"
                            value={`${weather.current.temperature}°C`}
                            iconClass="bg-[#fde9df] text-[#c76b43]"
                        />

                        <WeatherCard
                            icon={<Droplets size={18} />}
                            label="Humidity"
                            value={`${weather.current.humidity}%`}
                            iconClass="bg-[#e0f0f5] text-[#42839b]"
                        />

                        <WeatherCard
                            icon={<CloudRain size={18} />}
                            label="Rain"
                            value={`${weather.current.rain} mm`}
                            iconClass="bg-[#e6eee0] text-[#64834d]"
                        />

                        <WeatherCard
                            icon={<Wind size={18} />}
                            label="Wind"
                            value={`${weather.current.windSpeed} km/h`}
                            iconClass="bg-[#eee8f4] text-[#765a91]"
                        />
                    </motion.div>
                )}

                {/* Error */}
                {weatherError && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
                    >
                        {weatherError}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    )
}

function WeatherCard({
    icon,
    label,
    value,
    iconClass,
}: {
    icon: React.ReactNode
    label: string
    value: string
    iconClass: string
}) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg"
        >
            <div
                className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${iconClass}`}
            >
                {icon}
            </div>

            <p className="text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-xl font-bold tracking-tight text-slate-800">
                {value}
            </p>
        </motion.div>
    )
}