import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Sparkles, Film, Building2, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";

interface Props {
    onRequestLocation: () => void;
}

export default function HeroSection({ onRequestLocation }: Props) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { results, isLoading } = useSearch(query);

    // Fermer dropdown au clic extérieur
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                dropdownRef. current &&
                ! dropdownRef.current.contains(e. target as Node) &&
                ! inputRef.current?. contains(e.target as Node)
            ) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSelectMovie = (movieId: string) => {
        setQuery("");
        setIsFocused(false);
        navigate(`/movies? m=${movieId}`);
    };

    const handleSelectCinema = (cinemaId: string) => {
        setQuery("");
        setIsFocused(false);
        navigate(`/cinemas? c=${cinemaId}`);
    };

    const showDropdown = isFocused && query.length >= 2;

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
            {/* BACKGROUND FX */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-orange-600/10" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 opacity-20"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-3xl" />
                </motion.div>
            </div>

            {/* CONTENT */}
            <div className="relative z-10 max-w-7xl mx-auto text-center space-y-12">
                {/* BADGE */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-sm"
                >
                    <Sparkles size={18} className="text-red-400" />
                    <span className="text-sm font-bold text-red-400 tracking-wider">
                        N°1 BILLETTERIE CINÉMA EN ALGÉRIE
                    </span>
                </motion.div>

                {/* TITLE */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight"
                >
                    <span className="block">Ton film. </span>
                    <span className="block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        Ta salle.
                    </span>
                    <span className="block">En 30 secondes.</span>
                </motion.h1>

                {/* SUBTITLE */}
                <motion.p
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.4 }}
                         className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto"
                >
                    Géolocalisation instantanée • Paiement CIB/Edahabia • QR Code direct
                </motion.p>

                {/* SEARCH BAR */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="relative max-w-2xl mx-auto"
                >
                    <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={22} />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            placeholder="Rechercher un film ou un cinéma..."
                            className="w-full h-16 pl-14 pr-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-lg outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/20 transition-all"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}
                        {isLoading && (
                            <Loader2 className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 animate-spin" size={20} />
                        )}
                    </div>

                    {/* Dropdown Results */}
                    {showDropdown && (
                        <div
                            ref={dropdownRef}
                            className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-[#0f0f15] border border-white/10 shadow-2xl overflow-hidden z-50"
                        >
                            {isLoading ? (
                                <div className="p-6 text-center text-slate-500">
                                    <Loader2 className="mx-auto animate-spin mb-2" size={24} />
                                    Recherche...
                                </div>
                            ) : results.movies.length === 0 && results.cinemas. length === 0 ? (
                                <div className="p-6 text-center text-slate-500">
                                    Aucun résultat pour "{query}"
                                </div>
                            ) : (
                                <div className="max-h-[400px] overflow-y-auto">
                                    {/* Films */}
                                    {results.movies.length > 0 && (
                                        <div>
                                            <div className="px-4 py-2 bg-white/[0.02] border-b border-white/5">
                                                <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-2">
                                                    <Film size={12} />
                                                    Films ({results.movies.length})
                                                </span>
                                            </div>
                                            {results.movies.map((movie) => (
                                                <button
                                                    key={movie._id}
                                                    onClick={() => handleSelectMovie(movie._id)}
                                                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors text-left"
                                                >
                                                    <img
                                                        src={movie.poster ?  `https://image.tmdb.org/t/p/w92${movie.poster}` : "/placeholder. jpg"}
                                                        alt={movie.title}
                                                        className="w-10 h-14 rounded-lg object-cover"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-white truncate">{movie. title}</p>
                                                        <p className="text-xs text-slate-500">
                                                            {movie.genres?. slice(0, 2).join(", ")} • {movie.runtime} min
                                                        </p>
                                                    </div>
                                                    <span className="text-xs text-red-400 font-medium">{movie.voteAverage?. toFixed(1)} ⭐</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Cinémas */}
                                    {results. cinemas.length > 0 && (
                                        <div>
                                            <div className="px-4 py-2 bg-white/[0. 02] border-b border-white/5">
                                                <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-2">
                                                    <Building2 size={12} />
                                                    Cinémas ({results.cinemas.length})
                                                </span>
                                            </div>
                                            {results. cinemas.map((cinema) => (
                                                <button
                                                    key={cinema._id}
                                                    onClick={() => handleSelectCinema(cinema._id)}
                                                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors text-left"
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                                        <Building2 size={18} className="text-red-400" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-white truncate">{cinema.name}</p>
                                                        <p className="text-xs text-slate-500">{cinema.city}, {cinema.wilaya}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Voir tous les résultats */}
                            {(results.movies.length > 0 || results.cinemas. length > 0) && (
                                <button
                                    onClick={() => {
                                        setIsFocused(false);
                                        navigate(`/movies? q=${encodeURIComponent(query)}`);
                                    }}
                                    className="w-full px-4 py-3 text-center text-sm font-medium text-red-400 hover:bg-white/5 border-t border-white/5 transition-colors"
                                >
                                    Voir tous les résultats →
                                </button>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* GEO BUTTON */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <button
                        onClick={onRequestLocation}
                        className="inline-flex items-center justify-center gap-3 h-16 px-10 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 font-bold text-lg shadow-2xl shadow-red-500/30 transition-all hover:scale-105"
                    >
                        <MapPin size={26} />
                        Cinémas près de moi
                    </button>
                </motion.div>
            </div>
        </section>
    );
}