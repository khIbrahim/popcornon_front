import { Sparkles } from "lucide-react";

interface Props {
    cinemaName?: string;
}

export default function WelcomeCard({ cinemaName }: Props) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Bonjour" : hour < 18 ?  "Bon après-midi" : "Bonsoir";

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 via-orange-500/5 to-transparent border border-red-500/20 p-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={20} className="text-red-500" />
                        <span className="text-sm font-medium text-red-400">Dashboard</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                        {greeting} !  👋
                    </h2>
                    <p className="text-slate-400">
                        Bienvenue sur le tableau de bord de <span className="text-white font-medium">{cinemaName || "votre cinéma"}</span>.
                    </p>
                </div>

                <div className="hidden sm:block text-right">
                    <p className="text-sm text-slate-500">
                        {new Date().toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long"
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
}