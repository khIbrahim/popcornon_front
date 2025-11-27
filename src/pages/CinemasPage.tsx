// src/pages/CinemasPage.tsx
import { useState, useMemo } from "react";
import {
    Search,
    Filter,
    Building2,
    ChevronDown,
    X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PublicCinemaCard from "../components/cinemas/PublicCinemaCard";
import PublicCinemaDrawer from "../components/cinemas/PublicCinemaDrawer";
import { usePublicCinemas, usePublicCinemaById } from "../hooks/usePublicCinemas";
import { WILAYAS } from "../constants/utils";

export default function CinemasPage() {
    const [search, setSearch] = useState("");
    const [selectedWilaya, setSelectedWilaya] = useState<string>("Toutes");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedCinemaId, setSelectedCinemaId] = useState<string | null>(null);

    const {
        data: cinemas,
        isLoading,
        isError,
    } = usePublicCinemas(
        selectedWilaya !== "Toutes" ? { wilaya: selectedWilaya } : undefined
    );

    console.log("loaded cinemas", cinemas)

    const { cinema: selectedCinema, screenings} = usePublicCinemaById(selectedCinemaId ?? undefined);

    const filteredCinemas = useMemo(() => {
        if (!cinemas) return [];
        if (!search.trim()) return cinemas;

        const term = search.toLowerCase();
        return cinemas.filter((c) =>
            c.name.toLowerCase().includes(term) ||
            c.city.toLowerCase().includes(term) ||
            c.wilaya.toLowerCase().includes(term)
        );
    }, [cinemas, search]);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
            <Navbar isLoggedIn={false} />

            {/* Hero */}
            <section className="pt-24 pb-10 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Nos <span className="text-red-500">Cinémas</span> Partenaires
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Explorez les cinémas près de chez vous et découvrez leurs programmes
                        sur les prochains jours.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="px-4 pb-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                size={20}
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher un cinéma..."
                                className="w-full h-12 pl-12 pr-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        {/* Wilaya filter desktop */}
                        <div className="hidden md:flex items-center gap-2">
                            <button
                                onClick={() => setSelectedWilaya("Toutes")}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    selectedWilaya === "Toutes"
                                        ? "bg-red-500 text-white"
                                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                Toutes
                            </button>
                            {WILAYAS.slice(0, 5).map((wilaya) => (
                                <button
                                    key={wilaya}
                                    onClick={() => setSelectedWilaya(wilaya)}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                        selectedWilaya === wilaya
                                            ? "bg-red-500 text-white"
                                            : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    {wilaya}
                                </button>
                            ))}
                            <button
                                onClick={() => setIsFilterOpen((v) => !v)}
                                className="px-4 py-2.5 rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
                            >
                                <Filter size={16} />
                                Plus
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform ${
                                        isFilterOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Wilaya filter mobile */}
                        <div className="md:hidden">
                            <select
                                value={selectedWilaya}
                                onChange={(e) => setSelectedWilaya(e.target.value)}
                                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none cursor-pointer"
                            >
                                <option value="Toutes" className="bg-slate-900">
                                    Toutes
                                </option>
                                {WILAYAS.map((w) => (
                                    <option key={w} value={w} className="bg-slate-900">
                                        {w}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Extended filters */}
                    {isFilterOpen && (
                        <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <p className="text-sm text-slate-400 mb-3">Toutes les wilayas</p>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => {
                                        setSelectedWilaya("Toutes");
                                        setIsFilterOpen(false);
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                        selectedWilaya === "Toutes"
                                            ? "bg-red-500 text-white"
                                            : "bg-white/5 text-slate-400 hover:bg-white/10"
                                    }`}
                                >
                                    Toutes
                                </button>
                                {WILAYAS.map((wilaya) => (
                                    <button
                                        key={wilaya}
                                        onClick={() => {
                                            setSelectedWilaya(wilaya);
                                            setIsFilterOpen(false);
                                        }}
                                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                            selectedWilaya === wilaya
                                                ? "bg-red-500 text-white"
                                                : "bg-white/5 text-slate-400 hover:bg-white/10"
                                        }`}
                                    >
                                        {wilaya}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Results */}
            <section className="px-4 pb-16 flex-1">
                <div className="max-w-6xl mx-auto">
                    {/* Count */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-sm text-slate-400">
              <span className="text-white font-medium">
                {filteredCinemas.length}
              </span>{" "}
                            cinéma(s) trouvé(s)
                            {selectedWilaya !== "Toutes" && (
                                <>
                                    {" "}
                                    à{" "}
                                    <span className="text-red-400">
                    {selectedWilaya}
                  </span>
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
                            {filteredCinemas.length > 0 ? (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCinemas.map((cinema) => (
                                        <PublicCinemaCard
                                            key={cinema._id}
                                            cinema={cinema}
                                            onClick={() => setSelectedCinemaId(cinema._id)}
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

            {/* Drawer */}
            {selectedCinemaId && selectedCinema && (
                <PublicCinemaDrawer
                    cinema={selectedCinema}
                    screenings={screenings}
                    onClose={() => setSelectedCinemaId(null)}
                />
            )}

            <Footer />
        </div>
    );
}
