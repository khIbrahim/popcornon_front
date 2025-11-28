import { motion } from "framer-motion";
import { Building2, Popcorn, ArrowDown, Sparkles } from "lucide-react";
import Button from "../cine/ui/Button.tsx";

export default function HeroSection() {
    const scrollToContent = () => {
        document
            .getElementById("partner-content")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
            {/* Fond cinéma immersif */}
            <div className="absolute inset-0">
                {/* Gradient cinéma rouge/orange très subtil */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-orange-600/10" />

                {/* Effet lumières cinéma (spots animés) */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 opacity-30"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
                </motion.div>

                {/* Particules popcorn très légères */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-red-500/20"
                        initial={{ y: -100, x: Math.random() * 100 + "%" }}
                        animate={{
                            y: "100vh",
                            x: Math.random() * 100 + "%",
                            rotate: Math.random() * 720 - 360,
                        }}
                        transition={{
                            duration: Math.random() * 20 + 15,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "linear",
                        }}
                    >
                        <Popcorn size={24} />
                    </motion.div>
                ))}
            </div>

            {/* Contenu Hero */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="space-y-8"
                >
                    {/* Badge premium */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-sm"
                    >
                        <Sparkles size={16} className="text-red-400" />
                        <span className="text-sm font-semibold text-red-400 tracking-wider">
              PARTENARIAT EXCLUSIF 2025
            </span>
                    </motion.div>

                    {/* Titre principal */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                        <span className="block text-white">Rejoignez</span>
                        <span className="block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              PopcornON
            </span>
                        <span className="block text-white">en tant que cinéma</span>
                    </h1>

                    {/* Sous-titre */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed"
                    >
                        Augmentez votre visibilité, remplissez vos salles et touchez des milliers de cinéphiles algériens.
                        <br className="hidden sm:block" />
                        Intégrez le leader de la billetterie en ligne dès aujourd'hui.
                    </motion.p>

                    {/* CTA principal + secondaire */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
                    >
                        <Button
                            className="relative overflow-hidden group px-10 py-6 text-lg font-semibold shadow-2xl shadow-red-500/25"
                            onClick={scrollToContent}
                        >
              <span className="relative z-10 flex items-center gap-3">
                <Building2 size={22} />
                Devenir partenaire
              </span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.4 }}
                            />
                        </Button>

                        <button
                            onClick={scrollToContent}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            Découvrir les avantages
                            <ArrowDown size={18} className="animate-bounce" />
                        </button>
                    </motion.div>

                    {/* Stats rapides (apparition progressive) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16"
                    >
                        {[
                            { value: "+12K", label: "Spectateurs/mois" },
                            { value: "98%", label: "Satisfaction" },
                            { value: "0 DA", label: "Commission les 3 premiers mois" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2 + i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl sm:text-4xl font-bold text-red-500">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-slate-400 mt-1">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
            >
                <ArrowDown size={28} />
            </motion.div>
        </section>
    );
}