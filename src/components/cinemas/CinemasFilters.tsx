import { Search, Filter, ChevronDown, X } from "lucide-react";

interface CinemasFiltersProps {
    search: string;
    setSearch: (value: string) => void;
    selectedWilaya: string;
    setSelectedWilaya: (value: string) => void;
    isFilterOpen: boolean;
    setIsFilterOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
    wilayas: string[];
}

export default function CinemasFilters({
    search,
    setSearch,
    selectedWilaya,
    setSelectedWilaya,
    isFilterOpen,
    setIsFilterOpen,
    wilayas,
}: CinemasFiltersProps) {
    return (
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
                        {wilayas.slice(0, 5).map((wilaya) => (
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
                            {wilayas.map((w) => (
                                <option key={w} value={w} className="bg-slate-900">
                                    {w}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Extended filters */}
                {isFilterOpen && (
                    <div className="mt-4 p-4 rounded-xl bg-white/2 border border-white/5">
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
                            {wilayas.map((wilaya) => (
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
    );
}
