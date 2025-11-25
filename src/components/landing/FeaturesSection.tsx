import {Film, MapPin, Ticket} from "lucide-react";

const FeaturesSection = () => (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-white">Pourquoi utiliser CinéDz ?</h2>
                <p className="mt-4 text-xl text-gray-400">Plus besoin de faire la queue ou de vérifier plusieurs sites.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                    { icon: MapPin, title: "Géolocalisation Précise", desc: "Trouvez instantanément les cinémas ouverts autour de votre position GPS." },
                    { icon: Ticket, title: "E-Billet Instantané", desc: "Réservez votre place, payez en ligne (CIB/Edahabia) et recevez votre QR Code." },
                    { icon: Film, title: "Catalogue Complet", desc: "Accédez à la programmation de toutes les salles d'Algérie en une seule application." }
                ].map((feature, index) => (
                    <div key={index} className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors">
                        <div className="w-14 h-14 bg-red-600 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg shadow-red-600/20">
                            <feature.icon size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default FeaturesSection;