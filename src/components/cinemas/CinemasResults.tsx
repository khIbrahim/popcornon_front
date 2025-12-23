import { Building2 } from "lucide-react";
import PublicCinemaCard from "./PublicCinemaCard";
import type { PublicCinema } from "../../types/publicCinema";

interface CinemasResultsProps {
    isLoading: boolean;
    isError: boolean;
    cinemas: PublicCinema[];
    selectedWilaya: string;
    onCinemaClick: (cinemaId: string) => void;
}

export default function CinemasResults({
    isLoading,
    isError,
    cinemas,
    selectedWilaya,
    onCinemaClick,
}: CinemasResultsProps) {
    return (
        <section className="px-4 pb-16 flex-1">
            <div className="max-w-6xl mx-auto">
                {/* Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-slate-400">
                        <span className="text-white font-medium">{cinemas.length}</span>{" "}
                        cinéma(s) trouvé(s)
                        {selectedWilaya !== "Toutes" && (
                            <>
                                {" "}
                                à <span className="text-red-400">{selectedWilaya}</span>
                            </>
                        )}
                    </p>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden animate-pulse"
                            >
                                <div className="h-40 bg-white/5" />
                                <div className="p-5 space-y-3">
                                    <div className="h-5 bg-white/5 rounded-lg w-3/4" />
                                    <div className="h-4 bg-white/5 rounded-lg w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {isError && !isLoading && (
                    <div className="text-center py-16">
                        <p className="text-red-400">
                            Erreur lors du chargement des cinémas.
                        </p>
                    </div>
                )}

                {/* Grid */}
                {!isLoading && !isError && (
                    <>
                        {cinemas.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {cinemas.map((cinema) => (
                                    <PublicCinemaCard
                                        key={cinema._id}
                                        cinema={cinema}
                                        onClick={() => onCinemaClick(cinema._id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                    <Building2 size={32} className="text-slate-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Aucun cinéma trouvé
                                </h3>
                                <p className="text-slate-500">
                                    Essayez de modifier vos filtres ou votre recherche.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
