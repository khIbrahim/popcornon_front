import { Film, Calendar, Users, TrendingUp, type LucideIcon } from "lucide-react";

interface Stats {
    todayCount: number;
    weekCount: number;
    totalPlaces: number;
    fillRate: number;
}

interface Props {
    stats: Stats;
    isLoading?: boolean;
}

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    suffix?: string;
    trend?: string;
    color: "red" | "blue" | "emerald" | "amber";
    isLoading?: boolean;
}

const COLORS = {
    red: "text-red-500 bg-red-500/10 border-red-500/20",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
};

function StatCard({ icon: Icon, label, value, suffix, trend, color, isLoading }: StatCardProps) {
    if (isLoading) {
        return (
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-white/5 mb-3" />
                <div className="h-8 w-16 bg-white/5 rounded mb-2" />
                <div className="h-4 w-24 bg-white/5 rounded" />
            </div>
        );
    }

    return (
        <div className={`p-5 rounded-2xl bg-white/[0.02] border ${COLORS[color]. split(" ")[2]} hover:bg-white/[0.04] transition-colors`}>
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${COLORS[color]} flex items-center justify-center`}>
                    <Icon size={20} />
                </div>
                {trend && (
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                        {trend}
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold text-white">
                {value}
                {suffix && <span className="text-lg text-slate-500 ml-1">{suffix}</span>}
            </p>
            <p className="text-sm text-slate-500">{label}</p>
        </div>
    );
}

export default function QuickStats({ stats, isLoading }: Props) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
                icon={Film}
                label="Séances aujourd'hui"
                value={stats.todayCount}
                color="red"
                isLoading={isLoading}
            />
            <StatCard
                icon={Calendar}
                label="Cette semaine"
                value={stats. weekCount}
                trend="+12%"
                color="blue"
                isLoading={isLoading}
            />
            <StatCard
                icon={Users}
                label="Capacité totale"
                value={stats.totalPlaces}
                suffix="places"
                color="emerald"
                isLoading={isLoading}
            />
            <StatCard
                icon={TrendingUp}
                label="Taux remplissage"
                value={stats.fillRate}
                suffix="%"
                color="amber"
                isLoading={isLoading}
            />
        </div>
    );
}