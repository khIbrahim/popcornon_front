import { Film } from "lucide-react";
import MovieCard from "./MovieCard";
import type { PublicMovie } from "../../Api/endpoints/movies.public";

interface MoviesGridProps {
    isLoading: boolean;
    movies: PublicMovie[];
    onMovieClick: (movie: PublicMovie) => void;
}

export default function MoviesGrid({
    isLoading,
    movies,
    onMovieClick,
}: MoviesGridProps) {
    if (isLoading) {
        return (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="aspect-2/3 rounded-2xl bg-white/5 animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (movies.length > 0) {
        return (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                        onClick={() => onMovieClick(movie)}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="text-center py-24">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Film size={36} className="text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
                Aucun film trouvé
            </h3>
            <p className="text-slate-500">Essayez une autre date ou un autre genre</p>
        </div>
    );
}
