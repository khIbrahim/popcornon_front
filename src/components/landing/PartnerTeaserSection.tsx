import { Building2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {usePublicCinemaById} from "../../hooks/usePublicCinemas";
import {useState} from "react";
import PublicCinemaDrawer from "../cinemas/PublicCinemaDrawer.tsx";
import CinemaCarousel from "./CinemaCarousel.tsx";

export default function PartnerTeaserSection() {
    const navigate = useNavigate();
    // @ts-ignore
    const [selectedCinemaId, setSelectedCinemaId] = useState<string | null>(null);
    const { cinema: selectedCinema, screenings} = usePublicCinemaById(selectedCinemaId ?? undefined);

    const stats = [
        { value: "+150 %", label: "Taux de remplissage moyen" },
        { value: "0 DA", label: "Commission les 3 premiers mois" },
        { value: "24/7", label: "Support & dashboard gratuit" },
    ];

    return (
        <section className="py-28 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl sm:text-5xl font-black mb-6">
                        Vous êtes gérant de cinéma ?
                    </h2>
                    <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Remplissez vos salles • 0 DA de commission les 3 premiers mois • Dashboard gratuit • +150 000 spectateurs/mois
                    </p>

                    <button
                        onClick={() => navigate("/become-partner")}
                        className="group inline-flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl font-bold text-xl shadow-2xl shadow-red-500/40 hover:scale-105 transition-all duration-300"
                    >
                        <Building2 size={28} />
                        Devenir partenaire PopcornON
                        <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </motion.div>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 mb-20">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-5xl font-black text-red-500 mb-2">{stat.value}</div>
                            <div className="text-sm text-slate-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* PARTNER CINEMAS CAROUSEL */}
                <h3 className="text-2xl sm:text-3xl font-bold mb-8">
                    Nos cinémas partenaires
                </h3>

                <CinemaCarousel onSelect={setSelectedCinemaId} />
            </div>

            {/* Drawer */}
            {selectedCinemaId && selectedCinema && (
                <PublicCinemaDrawer
                    cinema={selectedCinema}
                    screenings={screenings}
                    onClose={() => setSelectedCinemaId(null)}
                />
            )}

        </section>
    );
}