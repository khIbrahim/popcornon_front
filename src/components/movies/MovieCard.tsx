import { Star } from "lucide-react";
import type { PublicMovie } from "../../Api/endpoints/movies.public";

interface Props {
    movie: PublicMovie;
    onClick: () => void;
}

export default function MovieCard({ movie, onClick }: Props) {
    const posterUrl = movie.poster
        ?  `https://image.tmdb.org/t/p/w400${movie.poster}`
        : "/placeholder-movie.jpg";

    return (
        <button
            onClick={onClick}
            className="group relative aspect-[2/3] rounded-xl overflow-hidden bg-white/5"
        >
            <img
                src={posterUrl}
                alt={movie. title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Rating */}
            <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-semibold">{movie.voteAverage?.toFixed(1)}</span>
            </div>

            {/* Info on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                <h3 className="text-sm font-bold text-white line-clamp-2">{movie.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{movie. runtime} min</p>
            </div>
        </button>
    );
}