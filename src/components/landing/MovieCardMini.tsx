import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
    movie: any;
}

export function MovieCardMini({ movie }: Props) {
    const navigate = useNavigate();

    const posterUrl = movie.poster
        ? `https://image.tmdb.org/t/p/w500${movie.poster}`
        : "/placeholder.jpg";

    return (
        <div
            onClick={() => navigate(`/movie/${movie._id}`)}
            className="group relative w-48 sm:w-56 cursor-pointer"
        >
            <div className="aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-lg line-clamp-2 text-white">
                        {movie.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                        <Star size={14} className="fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-semibold text-white">
              {movie.voteAverage?.toFixed(1) ?? "-"}
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
}