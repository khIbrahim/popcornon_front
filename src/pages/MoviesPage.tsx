import { useState, useMemo } from "react";
import { Search, Film, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieCard from "../components/movies/MovieCard";
import MovieModal from "../components/movies/MovieModal";
import { usePublicMovies } from "../hooks/usePublicMovies";
import type { PublicMovie } from "../Api/endpoints/movies.public";

const GENRES = [
    "Tous", "Action", "Aventure", "Comédie", "Drame",
    "Horreur", "Science-Fiction", "Thriller", "Animation", "Romance"
];

export default function MoviesPage() {
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("Tous");
    const [selectedMovie, setSelectedMovie] = useState<PublicMovie | null>(null);

    const { data, isLoading } = usePublicMovies(
        genre !== "Tous" ?  { genre } : undefined
    );

    const movies = data?.data ??  [];

    const filteredMovies = useMemo(() => {
        if (! search. trim()) return movies;
        const term = search.toLowerCase();
        return movies. filter(m => m.title.toLowerCase(). includes(term));
    }, [movies, search]);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white">
            <Navbar />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">
                            Films <span className="text-red-500">à l'affiche</span>
                        </h1>
                        <p className="text-slate-400">
                            Découvrez les films disponibles dans nos cinémas partenaires
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-8">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher un film..."
                                className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:border-red-500/50"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Genres */}
                        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                            {GENRES.slice(0, 6).map((g) => (
                                <button
                                    key={g}
                                    onClick={() => setGenre(g)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                                        genre === g
                                            ? "bg-red-500 text-white"
                                            : "bg-white/5 text-slate-400 hover:bg-white/10"
                                    }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Count */}
                    <p className="text-sm text-slate-500 mb-6">
                        {filteredMovies.length} film(s) trouvé(s)
                    </p>

                    {/* Grid */}
                    {isLoading ? (
                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="aspect-[2/3] rounded-xl bg-white/5 animate-pulse" />
                            ))}
                        </div>
                    ) : filteredMovies.length > 0 ?  (
                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {filteredMovies.map((movie) => (
                                <MovieCard
                                    key={movie._id}
                                    movie={movie}
                                    onClick={() => setSelectedMovie(movie)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Film size={48} className="mx-auto text-slate-700 mb-4" />
                            <p className="text-slate-500">Aucun film trouvé</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal */}
            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}

            <Footer />
        </div>
    );
}