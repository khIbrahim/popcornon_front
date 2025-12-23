import { Search, X } from "lucide-react";

interface MoviesFiltersProps {
    search: string;
    setSearch: (value: string) => void;
    genre: string;
    setGenre: (value: string) => void;
    genres: string[];
}

export default function MoviesFilters({
    search,
    setSearch,
    genre,
    setGenre,
    genres,
}: MoviesFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 my-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-full h-12 pl-11 pr-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:border-red-500/50 transition-all"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Genres */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {genres.map((g) => (
                    <button
                        key={g}
                        onClick={() => setGenre(g)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                            genre === g
                                ? "bg-red-500 text-white"
                                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        {g}
                    </button>
                ))}
            </div>
        </div>
    );
}
