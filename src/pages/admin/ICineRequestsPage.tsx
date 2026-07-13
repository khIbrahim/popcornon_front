import Navbar from "../../components/Navbar.tsx";
import Footer from "../../components/Footer.tsx";
import {Building2} from "lucide-react";
import {useEffect, useState} from "react";
import type {CineRequestI, CineRequestStatus} from "../../types/cineRequest.ts";
import {approveRequest, getAllCineRequests, reviewCineRequest} from "../../Api/endpoints/cineRequest.ts";
import CineRequestRow from "../../components/cineRequests/CineRequestRow.tsx";

export default function ICineRequestsPage() {
    const [filter, setFilter]           = useState<CineRequestStatus | "all">("pending");
    const [isLoading, setIsLoading]     = useState(true);
    const [requests, setRequests]       = useState<CineRequestI[]>([]);
    const [error, setError]             = useState<string | null>(null);
    const [reviewingId, setReviewingId] = useState<number | null>(null);

    useEffect(() => {
        const fetchRequests = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getAllCineRequests(filter === "all" ? undefined : filter);

                setRequests(data);
            } catch (err) {
                console.error(err);
                setError("Impossible de récupérer les demandes.")
            } finally {
                setIsLoading(false);
            }
        };

        void fetchRequests();
    }, [filter]);

    const updateRequestInList = (id: number, status: "approved" | "rejected") => {
        setRequests((currentRequests) =>
            currentRequests
                .map((request) => request.id === id ? { ...request, status } : request)
                .filter((request) => {
                    if (filter === "all") {
                        return true;
                    }

                    return request.status === filter;
                })
        );
    };

    const handleApprove = async (id: number) => {
        setReviewingId(id);
        setError(null);

        try {
            await approveRequest(id);
            updateRequestInList(id, "approved");
        } catch (error) {
            console.error(error);
            setError("La demande n'a pas pu être approuvée.");
        } finally {
            setReviewingId(null);
        }
    };

    const handleReview = async (
        id: number,
        status: "approved" | "rejected"
    ) => {
        if (status === "approved") {
            return handleApprove(id);
        }

        setReviewingId(id);
        setError(null);

        try {
            await reviewCineRequest(id, status);
            updateRequestInList(id, status);
        } catch (error) {
            console.error(error);
            setError("La demande n'a pas pu être mise à jour.");
        } finally {
            setReviewingId(null);
        }
    };

    return (
        <div>
            <Navbar />

            <div className="min-h-screen bg-slate-950 text-white p-6 pt-24">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Building2 className="text-red-500" />
                            Demandes de partenariat
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Gérez les demandes des futurs cinémas partenaires
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 mb-6">
                        {["all", "pending", "approved", "rejected"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as CineRequestStatus | "all")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filter === f ? "bg-red-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                                }`}
                            >
                                {f === "all" ? "Toutes" : f === "pending" ? "En attente" : f === "approved" ? "Approuvées" : "Refusées"}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Loading */}
                    {isLoading && (
                        <div className="text-center py-12">
                            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
                        </div>
                    )}

                    {/* Empty */}
                    {! isLoading && requests.length === 0 && (
                        <div className="text-center py-12 text-slate-500">
                            Aucune demande trouvée
                        </div>
                    )}

                    {! isLoading && requests.length > 0 && (
                        <div className="space-y-4">
                            {requests.map((request) => (
                                <CineRequestRow
                                    key={request.id}
                                    request={request}
                                    onReview={handleReview}
                                    isReviewing={reviewingId === request.id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
