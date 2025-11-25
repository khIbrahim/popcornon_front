import { Film, Banknote, Clock } from "lucide-react";

interface Props {
    stats: {
        active: number;
        avgPrice: number;
        totalRuntime: number;
    };
}

export default function StatsCards({ stats }: Props) {
    return (
        <div className="grid gap-4 sm:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 p-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <Film className="text-red-500" size={20} />
                        <span className="text-xs text-emerald-400 font-medium">+2 ce mois</span>
                    </div>
                    <p className="mt-3 text-3xl font-bold text-white">{stats.active}</p>
                    <p className="text-sm text-slate-400">Films actifs</p>
                </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 p-5">
                <Banknote className="text-slate-500" size={20} />
                <p className="mt-3 text-3xl font-bold text-white">
                    {stats.avgPrice} <span className="text-lg text-slate-500">DA</span>
                </p>
                <p className="text-sm text-slate-400">Prix moyen</p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 p-5">
                <Clock className="text-slate-500" size={20} />
                <p className="mt-3 text-3xl font-bold text-white">
                    {Math.round(stats.totalRuntime / 60)}<span className="text-lg text-slate-500">h</span>
                </p>
                <p className="text-sm text-slate-400">Durée totale</p>
            </div>
        </div>
    );
}