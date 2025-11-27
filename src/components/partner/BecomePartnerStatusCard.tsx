import type { CineStatus } from "../../types/cineRequest";
import { statusConfig } from "../../types/become_partner.ts";

interface StatusCardProps {
    status: CineStatus;
    data: any;
}

export default function BecomePartnerStatusCard({ status, data }: StatusCardProps) {
    if (status !== "pending" && status !== "rejected") return null;

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <div className={`p-6 rounded-2xl ${config.bg} border ${config.border}`}>
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${config.bg} border ${config.border}`}>
                    <Icon className={config.color} size={24} />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                        {data?.cinemaName}
                    </h3>
                    <p className="text-sm text-slate-400 mb-3">
                        {data?.address}, {data?.city} • Demande du{" "}
                        {data?.createdAt
                            ? new Date(data.createdAt).toLocaleDateString("fr-FR")
                            : "—"}
                    </p>
                    <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} border ${config.border} ${config.color}`}
                    >
                        {config.label}
                    </span>
                    {data?.adminNote && (
                        <p className="mt-4 p-3 rounded-lg bg-black/20 text-sm text-slate-300 border border-white/5">
                            <span className="text-slate-500">Note admin : </span>
                            {data.adminNote}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
