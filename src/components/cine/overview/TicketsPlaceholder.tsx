import { Ticket, Bell, Sparkles } from "lucide-react";

export default function TicketsPlaceholder() {
    return (
        <div className="relative rounded-2xl bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent border border-purple-500/20 p-6 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            {/* Coming soon badge */}
            <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1. 5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-xs font-medium text-purple-400">
                    <Sparkles size={12} />
                    Bientôt disponible
                </span>
            </div>

            <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                    <Ticket size={28} className="text-purple-400" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                    Gestion des Tickets
                </h3>
                <p className="text-sm text-slate-400 mb-6 max-w-sm">
                    Suivez les réservations, gérez les paiements et consultez la liste des spectateurs pour chaque séance.
                </p>

                {/* Features preview */}
                <div className="space-y-3 mb-6">
                    <FeatureItem text="Suivi des réservations en temps réel" />
                    <FeatureItem text="Historique des paiements" />
                    <FeatureItem text="Liste des spectateurs par séance" />
                    <FeatureItem text="Génération de QR codes" />
                </div>

                {/* Notify button */}
                <button className="inline-flex items-center gap-2 px-4 py-2. 5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-sm font-medium text-purple-400 hover:bg-purple-500/30 transition-colors">
                    <Bell size={16} />
                    Me notifier au lancement
                </button>
            </div>

            {/* Fake preview cards */}
            <div className="absolute -bottom-4 -right-4 w-48 opacity-30">
                <div className="space-y-2 rotate-12">
                    <div className="h-12 rounded-lg bg-white/10 backdrop-blur-sm" />
                    <div className="h-12 rounded-lg bg-white/10 backdrop-blur-sm" />
                    <div className="h-12 rounded-lg bg-white/10 backdrop-blur-sm" />
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="text-sm text-slate-400">{text}</span>
        </div>
    );
}