import { useOutletContext } from "react-router-dom";
import { useMemo } from "react";
import {
    FileText,
    Building2,
    Archive,
    Users,
    TrendingUp,
    Clock
} from "lucide-react";
import AdminHeader from "../../components/admin/AdminHeader";
import StatsCard from "../../components/admin/StatsCard";

interface OutletContext {
    openSidebar: () => void;
}

// données générique bah n testi brk pcq jdois faire l'api des stats ou rahi 8
const MOCK_STATS = {
    pendingRequests: 12,
    activeCinemas: 45,
    archivedCinemas: 3,
    totalPartners: 48,
};

const MOCK_ACTIVITY = [
    {
        _id: "1",
        cinemaName: "Cinéma Cosmos",
        city: "Alger",
        wilaya: "Alger",
        status: "pending" as const,
        createdAt: new Date().toISOString(),
    },
    {
        _id: "2",
        cinemaName: "Le Majestic",
        city: "Oran",
        wilaya: "Oran",
        status:  "approved" as const,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
        _id: "3",
        cinemaName: "Cinéplex Constantine",
        city: "Constantine",
        wilaya: "Constantine",
        status: "pending" as const,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
        _id: "4",
        cinemaName:  "Star Cinema",
        city: "Annaba",
        wilaya: "Annaba",
        status:  "rejected" as const,
        createdAt: new Date(Date.now() - 259200000).toISOString(),
    },
    {
        _id: "5",
        cinemaName:  "Galaxy Cinéma",
        city: "Tlemcen",
        wilaya: "Tlemcen",
        status: "approved" as const,
        createdAt:  new Date(Date.now() - 345600000).toISOString(),
    },
];

export default function AdminOverview() {
    const { openSidebar } = useOutletContext<OutletContext>();

    const isLoading = false;
    const stats = MOCK_STATS;
    const activity = MOCK_ACTIVITY;

    const chartData = useMemo(() => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push({
                day: date.toLocaleDateString("fr-FR", { weekday: "short" }),
                demandes: Math.floor(Math.random() * 8) + 2,
                approbations: Math.floor(Math.random() * 5) + 1,
            });
        }
        return days;
    }, []);

    return (
        <>
            <AdminHeader
                title="Vue générale"
                subtitle="Tableau de bord administrateur"
                onMenuClick={openSidebar}
            />

            <main className="flex-1 p-4 md:p-6 overflow-auto">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Welcome Card */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-red-500/10 to-orange-500/5 border border-red-500/20">
                        <h2 className="text-xl font-semibold text-white mb-1">
                            Bienvenue sur PopcornON Admin 🍿
                        </h2>
                        <p className="text-slate-400">
                            Gérez les demandes de partenariat et les cinémas de votre plateforme.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatsCard
                            title="Demandes en attente"
                            value={stats.pendingRequests}
                            icon={FileText}
                            variant="warning"
                            isLoading={isLoading}
                        />
                        <StatsCard
                            title="Cinémas actifs"
                            value={stats.activeCinemas}
                            icon={Building2}
                            variant="success"
                            isLoading={isLoading}
                        />
                        <StatsCard
                            title="Archivés"
                            value={stats.archivedCinemas}
                            icon={Archive}
                            variant="default"
                            isLoading={isLoading}
                        />
                        <StatsCard
                            title="Total partenaires"
                            value={stats.totalPartners}
                            icon={Users}
                            variant="primary"
                            isLoading={isLoading}
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Chart Area */}
                        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="font-semibold text-white">Activité hebdomadaire</h3>
                                    <p className="text-sm text-slate-500">Demandes et approbations</p>
                                </div>
                                <TrendingUp className="w-5 h-5 text-slate-500" />
                            </div>

                            {/* Simple bar chart */}
                            <div className="flex items-end justify-between gap-2 h-40">
                                {chartData.map((day, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                        <div className="w-full flex flex-col-reverse items-center gap-1">
                                            <div
                                                className="w-full max-w-8 bg-red-500/60 rounded-t transition-all hover:bg-red-500/80"
                                                style={{ height: `${Math.max(day.demandes * 15, 8)}px` }}
                                                title={`${day.demandes} demandes`}
                                            />
                                            <div
                                                className="w-full max-w-8 bg-emerald-500/60 rounded-t transition-all hover:bg-emerald-500/80"
                                                style={{ height: `${Math.max(day.approbations * 15, 8)}px` }}
                                                title={`${day.approbations} approbations`}
                                            />
                                        </div>
                                        <span className="text-xs text-slate-500 mt-2">{day.day}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 mt-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded bg-red-500/60" />
                                    <span className="text-slate-400">Demandes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded bg-emerald-500/60" />
                                    <span className="text-slate-400">Approbations</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-white">Activité récente</h3>
                                <Clock className="w-5 h-5 text-slate-500" />
                            </div>

                            <div className="space-y-4">
                                {activity.map((req) => (
                                    <div key={req._id} className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0">
                                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                            <Building2 className="w-4 h-4 text-red-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">
                                                {req. cinemaName}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {req.city} • {new Date(req.createdAt).toLocaleDateString("fr-FR")}
                                            </p>
                                        </div>
                                        <span className={`
                                            px-2 py-0.5 rounded-md text-xs font-medium whitespace-nowrap
                                            ${req.status === "pending" ? "bg-amber-500/10 text-amber-400" : ""}
                                            ${req.status === "approved" ?  "bg-emerald-500/10 text-emerald-400" : ""}
                                            ${req.status === "rejected" ? "bg-rose-500/10 text-rose-400" : ""}
                                        `}>
                                            {req. status === "pending" ? "En attente" : req.status === "approved" ? "Approuvée" : "Refusée"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}