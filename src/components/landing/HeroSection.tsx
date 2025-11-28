import { motion } from "framer-motion";
import { MapPin, Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection({ onRequestLocation }: { onRequestLocation: () => void }) {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
            {/* BACKGROUND FX */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-orange-600/10" />

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 opacity-20"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[800px] h-[800px] bg-red-500/10 rounded-full blur-3xl" />
                </motion.div>
            </div>

            {/* CONTENT */}
            <div className="relative z-10 max-w-7xl mx-auto text-center space-y-12">
                {/* BADGE */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-sm"
                >
                    <Sparkles size={18} className="text-red-400" />
                    <span className="text-sm font-bold text-red-400 tracking-wider">
                        N°1 BILLETTERIE CINÉMA EN ALGÉRIE
                    </span>
                </motion.div>

                {/* TITLE */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight"
                >
                    <span className="block">Ton film.</span>
                    <span className="block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        Ta salle.
                    </span>
                    <span className="block">En 30 secondes.</span>
                </motion.h1>

                {/* SUBTITLE */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto"
                >
                    Géolocalisation instantanée • Paiement CIB/Edahabia • QR Code direct
                </motion.p>

                {/* SEARCH + GEO */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={22} />
                        <input
                            type="text"
                            placeholder="Film, cinéma, ville..."
                            className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-lg outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/20 transition-all"
                            onFocus={() => navigate("/movies")}
                        />
                    </div>
                </motion.div>
            </div>

            {/* SEARCH + GEO */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto mt-5"
            >
                <div className="relative flex-1">
                    {/* Input */}
                </div>

                <button
                    onClick={onRequestLocation}
                    className="flex items-center justify-center gap-3 h-16 px-10 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 font-bold text-lg shadow-2xl shadow-red-500/30 transition-all hover:scale-105"
                >
                    <MapPin size={26} />
                    Ma position
                </button>
            </motion.div>
        </section>
    );
}
