import { Film, Banknote, Clock, Calendar } from "lucide-react";

interface Props {
    stats: {
        total: number;
        active: number;
        avgPrice: number;
        totalRuntime: number;
    };
    selectedDate?: string;
}

export default function StatsCards({ stats, selectedDate }: Props) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Séances du jour */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 p-5">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                    <Film className="text-red-500" size={20} />
                    <p className="mt-3 text-3xl font-bold text-white">{stats.total}</p>
                    <p className="text-sm text-slate-400">Séances programmées</p>
                </div>
            </div>

            {/* Actives */}
            <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 p-5">
                <Calendar className="text-emerald-500" size={20} />
                <p className="mt-3 text-3xl font-bold text-white">
                    {stats.active}
                    <span className="text-lg text-slate-500 ml-1">actives</span>
                </p>
                <p className="text-sm text-slate-400">{selectedDate || "Ce jour"}</p>
            </div>

            {/* Prix moyen */}
            <div className="relative overflow-hidden rounded-2xl bg-white/[0. 02] border border-white/5 p-5">
                <Banknote className="text-slate-500" size={20} />
                <p className="mt-3 text-3xl font-bold text-white">
                    {stats. avgPrice} <span className="text-lg text-slate-500">DA</span>
                </p>
                <p className="text-sm text-slate-400">Prix moyen</p>
            </div>

            {/* Durée totale */}
            <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 p-5">
                <Clock className="text-slate-500" size={20} />
                <p className="mt-3 text-3xl font-bold text-white">
                    {Math.floor(stats.totalRuntime / 60)}
                    <span className="text-lg text-slate-500">h</span>
                    <span className="text-xl ml-1">{stats.totalRuntime % 60}</span>
                    <span className="text-lg text-slate-500">m</span>
                </p>
                <p className="text-sm text-slate-400">Durée totale</p>
            </div>
        </div>
    );
}