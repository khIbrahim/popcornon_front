import { motion } from "framer-motion";
import { MapPin, Ticket, Film, Smartphone, Clock, Users } from "lucide-react";

const features = [
    { icon: MapPin, title: "Géoloc instantanée", desc: "Cinémas ouverts autour de toi en 1 clic" },
    { icon: Ticket, title: "E-billet QR Code", desc: "Paiement CIB/Edahabia • Zéro file d’attente" },
    { icon: Film, title: "Toutes les salles", desc: "Programmation complète de toute l’Algérie" },
    { icon: Smartphone, title: "100 % mobile", desc: "Réserve depuis ton téléphone, partout" },
    { icon: Clock, title: "Horaires en temps réel", desc: "Mise à jour automatique des séances" },
    { icon: Users, title: "+150 000 cinéphiles", desc: "Rejoins la plus grande communauté cinéma DZ" },
];

export default function FeaturesSection() {
    return (
        <section className="py-24 bg-[#0a0a0f]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-black mb-4">Pourquoi PopcornON ?</h2>
                    <p className="text-xl text-slate-400">L’expérience cinéma réinventée pour l’Algérie</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-red-500/30 transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
                                <f.icon size={32} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{f.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}