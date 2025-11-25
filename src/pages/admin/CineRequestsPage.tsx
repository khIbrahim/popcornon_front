import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Building2, MapPin, Mail, Phone } from "lucide-react";
import {getAllCineRequests} from "../../Api/endpoints/cineRequest.ts";

type RequestStatus = "pending" | "approved" | "rejected";

interface CineRequest {
    _id: string;
    cinemaName: string;
    address: string;
    email?: string;
    phone?: string;
    motivation?: string;
    status: RequestStatus;
    createdAt: string;
    user: {
        firstName: string;
        lastName: string;
        email: string;
    };
}

export default function CineRequestsPage() {
    const [requests, setRequests] = useState<CineRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | RequestStatus>("pending");

    useEffect(() => {
        const fetchRequests = async () => {
            setIsLoading(true);
            try {
                const data = await getAllCineRequests(filter === "all" ? undefined : filter);
                console.log(data);
                if (data.success) {
                    setRequests(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchRequests();
    }, [filter]);

    const handleReview = async (id: string, status: "approved" | "rejected") => {
        const adminNote = status === "rejected" ? prompt("Raison du refus (optionnel):") : "";

        try {
            const res = await fetch(`/api/cine-request/${id}/review`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ status, adminNote })
            });
            const data = await res.json();

            if (data.success) {
                setRequests(prev => prev.map(r => r._id === id ? { ...r, status } : r));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Building2 className="text-red-500" />
                        Demandes de partenariat
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Gérez les demandes des cinémas</p>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6">
                    {["all", "pending", "approved", "rejected"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === f
                                    ? "bg-red-600 text-white"
                                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                            }`}
                        >
                            {f === "all" ? "Toutes" : f === "pending" ? "En attente" : f === "approved" ? "Approuvées" : "Refusées"}
                        </button>
                    ))}
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="text-center py-12">
                        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                )}

                {/* Empty */}
                {!isLoading && requests.length === 0 && (
                    <div className="text-center py-12 text-slate-500">Aucune demande</div>
                )}

                {/* List */}
                <div className="space-y-4">
                    {requests.map((req) => (
                        <div key={req._id} className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{req.cinemaName}</h3>
                                    <p className="text-sm text-slate-400">
                                        Par {req.user.firstName} {req.user.lastName} • {new Date(req.createdAt).toLocaleDateString("fr-FR")}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    req.status === "pending" ? "bg-amber-500/20 text-amber-400" :
                                        req.status === "approved" ? "bg-emerald-500/20 text-emerald-400" :
                                            "bg-rose-500/20 text-rose-400"
                                }`}>
                                    {req.status === "pending" ? "En attente" : req.status === "approved" ? "Approuvée" : "Refusée"}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm text-slate-300 mb-4">
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-slate-500" />
                                    {req.address || "—"}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-slate-500" />
                                    {req.email || req.user.email}
                                </div>
                                {req.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} className="text-slate-500" />
                                        {req.phone}
                                    </div>
                                )}
                            </div>

                            {req.motivation && (
                                <p className="text-sm text-slate-400 mb-4 p-3 bg-slate-800 rounded-lg">
                                    {req.motivation}
                                </p>
                            )}

                            {/* Actions */}
                            {req.status === "pending" && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleReview(req._id, "approved")}
                                        className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle size={16} />
                                        Approuver
                                    </button>
                                    <button
                                        onClick={() => handleReview(req._id, "rejected")}
                                        className="flex-1 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        <XCircle size={16} />
                                        Refuser
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}