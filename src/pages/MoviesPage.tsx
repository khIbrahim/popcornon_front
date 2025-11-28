import { useState, useMemo } from "react";
import { Search, Film, X, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieCard from "../components/movies/MovieCard";
import MovieModal from "../components/movies/MovieModal";
import DaySelector from "../components/movies/DaySelector";
import { usePublicMovies } from "../hooks/usePublicMovies";
import { formatDateLocal, getNext7Days } from "../utils/date";
import type { PublicMovie } from "../Api/endpoints/movies.public";

const GENRES = ["Tous", "Action", "Comédie", "Drame", "Horreur", "Science-Fiction", "Thriller"];

export default function MoviesPage() {
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("Tous");
    const [selectedDate, setSelectedDate] = useState(() => formatDateLocal(new Date()));
    const [selectedMovie, setSelectedMovie] = useState<PublicMovie | null>(null);

    const days = useMemo(() => getNext7Days(), []);

    const { data, isLoading } = usePublicMovies({
        date: selectedDate,
        genre: genre !== "Tous" ?  genre : undefined,
    });

    const movies = data?.data ??  [];

    const filteredMovies = useMemo(() => {
        if (! search. trim()) return movies;
        return movies.filter(m => m.title.toLowerCase(). includes(search.toLowerCase()));
    }, [movies, search]);

    const dateLabel = useMemo(() => {
        const date = new Date(selectedDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date.getTime() === today.getTime()) return "Aujourd'hui";
        const tomorrow = new Date(today);
        tomorrow. setDate(today.getDate() + 1);
        if (date.getTime() === tomorrow.getTime()) return "Demain";
        return date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "short" });
    }, [selectedDate]);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white">
            <Navbar />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold">
                                Films <span className="text-red-500">à l'affiche</span>
                            </h1>
                            <p className="text-slate-400 mt-1 flex items-center gap-2">
                                <Calendar size={16} />
                                {dateLabel} • {filteredMovies.length} séance(s)
                            </p>
                        </div>
                    </div>

                    {/* Calendar */}
                    <DaySelector days={days} selectedDate={selectedDate} onSelect={setSelectedDate} />

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 my-6">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher..."
                                className="w-full h-12 pl-11 pr-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:border-red-500/50 transition-all"
                            />
                            {search && (
                                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Genres */}
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            {GENRES.map((g) => (
                                <button
                                    key={g}
                                    onClick={() => setGenre(g)}
                                    className={`px-4 py-2. 5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                                        genre === g
                                            ?  "bg-red-500 text-white"
                                            : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    {isLoading ? (
                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="aspect-[2/3] rounded-2xl bg-white/5 animate-pulse" />
                            ))}
                        </div>
                    ) : filteredMovies.length > 0 ?  (
                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            {filteredMovies. map((movie) => (
                                <MovieCard
                                    key={movie._id}
                                    movie={movie}
                                    onClick={() => setSelectedMovie(movie)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                <Film size={36} className="text-slate-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Aucun film trouvé</h3>
                            <p className="text-slate-500">Essayez une autre date ou un autre genre</p>
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