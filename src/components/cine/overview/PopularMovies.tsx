import { Star, TrendingUp } from "lucide-react";
import type { Movie } from "../../../types/movie";

interface Props {
    movies: Movie[];
    isLoading?: boolean;
}

export default function PopularMovies({ movies, isLoading }: Props) {
    if (isLoading) {
        return (
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 animate-pulse">
                <div className="h-6 w-40 bg-white/5 rounded mb-6" />
                <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-white/5 rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <TrendingUp size={20} className="text-amber-500" />
                </div>
                <div>
                    <h3 className="font-semibold text-white">Films populaires</h3>
                    <p className="text-xs text-slate-500">Les mieux notés</p>
                </div>
            </div>

            {movies.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                    {movies.map((movie, index) => (
                        <div
                            key={movie._id}
                            className="relative group rounded-xl overflow-hidden"
                        >
                            <img
                                src={movie.poster ? `https://image.tmdb.org/t/p/w200${movie.poster}` : "/placeholder.jpg"}
                                alt={movie.title}
                                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            {/* Rank badge */}
                            <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold text-white">
                                {index + 1}
                            </div>

                            {/* Rating */}
                            <div className="absolute top-2 right-2 flex items-center gap-1 px-1. 5 py-0.5 rounded-md bg-black/60 backdrop-blur-sm">
                                <Star size={10} className="text-yellow-500 fill-yellow-500" />
                                <span className="text-[10px] font-semibold text-white">{movie.voteAverage?. toFixed(1)}</span>
                            </div>

                            {/* Title */}
                            <div className="absolute bottom-0 left-0 right-0 p-2">
                                <p className="text-xs font-medium text-white line-clamp-2">{movie.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="h-32 flex items-center justify-center">
                    <p className="text-sm text-slate-500">Aucun film</p>
                </div>
            )}
        </div>
    );
}