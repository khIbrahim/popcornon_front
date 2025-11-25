import {Sparkles} from "lucide-react";

const HeroSection = () => {
    return (
        <section className="px-4 mb-16">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium">
                    <Sparkles size={14} />
                    Rejoignez le réseau PopcornON
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Devenez <span className="text-red-500">Partenaire</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Gérez vos films, vos séances et vos réservations depuis une seule plateforme moderne.
                </p>
            </div>
        </section>
    )
}

export default HeroSection;