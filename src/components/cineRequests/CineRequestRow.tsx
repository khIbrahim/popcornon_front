import {
    CheckCircle,
    LayoutGrid,
    Mail,
    MapPin,
    Phone,
    XCircle,
} from "lucide-react";
import type {CineRequestI, CineRequestStatus} from "../../types/cineRequest.ts";

interface CineRequestRowProps {
    request: CineRequestI;
    onReview: (
        id:     number,
        status: Extract<CineRequestStatus, "approved" | "rejected">
    ) => void | Promise<void>;
    isReviewing?: boolean;
}

export default function CineRequestRow({
    request,
    onReview,
    isReviewing = false,
}: CineRequestRowProps) {
    const userName = request.user ? `${request.user.first_name} ${request.user.last_name}` : "Utilisateur inconnu";

    const email = request.email || request.user?.email || "N/A";

    const statusLabel = {
        pending:  "En attente",
        approved: "Approuvée",
        rejected: "Refusée",
    }[request.status];

    const statusClass = {
        pending:  "bg-amber-500/20 text-amber-400",
        approved: "bg-emerald-500/20 text-emerald-400",
        rejected: "bg-rose-500/20 text-rose-400",
    }[request.status];

    return (
        <article className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                    <h3 className="text-lg font-semibold">
                        {request.cinemaName}
                    </h3>

                    <p className="text-sm text-slate-400">
                        Par {userName} •{" "}
                        {new Date(request.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                </div>

                <span
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}
                >
                    {statusLabel}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-300 mb-4">
                <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-slate-500 shrink-0" />
                    <span>
                        {request.address},
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Mail size={14} className="text-slate-500 shrink-0" />
                    <span className="break-all">{email}</span>
                </div>

                {request.phone && (
                    <div className="flex items-center gap-2">
                        <Phone size={14} className="text-slate-500 shrink-0" />
                        <span>{request.phone}</span>
                    </div>
                )}

                {request.halls && request.halls.length > 0 && (
                    <div className="flex items-center gap-2">
                        <LayoutGrid
                            size={14}
                            className="text-slate-500 shrink-0"
                        />
                        <span>{request.halls.length} salles</span>
                    </div>
                )}
            </div>

            {request.motivation && (
                <p className="text-sm text-slate-400 mb-4 p-3 bg-slate-800 rounded-lg">
                    {request.motivation}
                </p>
            )}

            {request.halls && request.halls.length > 0 && (
                <div className="mb-4 p-3 bg-slate-800 rounded-lg text-sm">
                    <p className="font-medium text-slate-300 mb-2">
                        Salles :
                    </p>

                    <ul className="space-y-1">
                        {request.halls.map((hall, index) => (
                            <li
                                key={`${hall.name}-${index}`}
                                className="text-slate-400"
                            >
                                🎬{" "}
                                <strong className="text-slate-300">
                                    {hall.name}
                                </strong>{" "}
                                — {hall.capacity} places ({hall.type})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {request.status === "pending" && (
                <div className="flex flex-col sm:flex-row gap-2">
                    <button
                        type="button"
                        disabled={isReviewing}
                        onClick={() => onReview(request.id, "approved")}
                        className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                        <CheckCircle size={16} />
                        Approuver
                    </button>

                    <button
                        type="button"
                        disabled={isReviewing}
                        onClick={() => onReview(request.id, "rejected")}
                        className="flex-1 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                        <XCircle size={16} />
                        Refuser
                    </button>
                </div>
            )}
        </article>
    );
}