import {Film, TrendingUp, Users} from "lucide-react";

const Avantages = () => {
    return (
        <section className="px-4 mb-16">
            <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
                {[
                    {
                        icon: Film,
                        title: "Gestion Simplifiée",
                        desc: "Ajoutez vos films en un clic grâce à l'intégration TMDB."
                    },
                    {
                        icon: Users,
                        title: "Plus de Visibilité",
                        desc: "Touchez des milliers de cinéphiles algériens."
                    },
                    {
                        icon: TrendingUp,
                        title: "Statistiques",
                        desc: "Suivez vos réservations et revenus en temps réel."
                    }
                ].map((item, i) => (
                    <div
                        key={i}
                        className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-red-500/30 transition-colors"
                    >
                        <div className="w-12 h-12 mb-4 rounded-xl bg-red-500/10 flex items-center justify-center">
                            <item.icon className="text-red-500" size={24} />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Avantages;