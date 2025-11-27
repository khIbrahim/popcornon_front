import { X, Star, Clock, Calendar, MapPin, Ticket } from "lucide-react";
import { useMovieDetail } from "../../hooks/usePublicMovies";
import type { PublicMovie } from "../../Api/endpoints/movies.public";

interface Props {
    movie: PublicMovie;
    onClose: () => void;
}

export default function MovieModal({ movie, onClose }: Props) {
    const { data, isLoading } = useMovieDetail(movie._id);
    const screenings = data?.screenings ?? [];

    const backdropUrl = movie. backdrop
        ? `https://image.tmdb.org/t/p/w1280${movie.backdrop}`
        : null;

    const posterUrl = movie.poster
        ? `https://image.tmdb.org/t/p/w400${movie.poster}`
        : "/placeholder-movie.jpg";

    // Group by cinema
    const groupedByCinema = screenings.reduce((acc, s) => {
        const key = s.cinema._id;
        if (!acc[key]) acc[key] = { cinema: s.cinema, times: [] };
        acc[key].times.push(s);
        return acc;
    }, {} as Record<string, { cinema: typeof screenings[0]["cinema"]; times: typeof screenings }>);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#0a0a0f] border border-white/10">
                {/* Header */}
                <div className="relative h-56">
                    {backdropUrl ?  (
                        <img src={backdropUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-transparent" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                    >
                        <X size={20} />
                    </button>

                    {/* Movie info */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-4">
                        <img
                            src={posterUrl}
                            alt={movie. title}
                            className="w-24 h-36 rounded-lg object-cover shadow-lg hidden sm:block"
                        />
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-300">
                                <span className="flex items-center gap-1">
                                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                    {movie.voteAverage?.toFixed(1)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {movie.runtime} min
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {movie.releaseDate?. split("-")[0]}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {movie. genres?.slice(0, 3).map((g) => (
                                    <span key={g} className="px-2 py-0.5 rounded-md bg-white/10 text-xs text-slate-300">
                                        {g}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[50vh]">
                    {/* Synopsis */}
                    {movie.overview && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-white mb-2">Synopsis</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{movie.overview}</p>
                        </div>
                    )}

                    {/* Séances */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                            <Ticket size={16} className="text-red-500" />
                            Séances disponibles
                        </h3>

                        {isLoading ? (
                            <div className="space-y-3">
                                {[1, 2]. map((i) => (
                                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] animate-pulse">
                                        <div className="h-4 bg-white/5 rounded w-1/3 mb-2" />
                                        <div className="h-3 bg-white/5 rounded w-1/4" />
                                    </div>
                                ))}
                            </div>
                        ) : Object.keys(groupedByCinema).length > 0 ? (
                            <div className="space-y-3">
                                {Object.values(groupedByCinema).map(({ cinema, times }) => (
                                    <div key={cinema._id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h4 className="font-medium text-white">{cinema.name}</h4>
                                                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                    <MapPin size={12} />
                                                    {cinema.city}, {cinema.wilaya}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {times.map((s) => (
                                                <button
                                                    key={s._id}
                                                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 transition-all"
                                                >
                                                    <span className="text-sm font-semibold text-white">{s.time}</span>
                                                    <div className="text-[10px] text-slate-500 mt-0.5">
                                                        {s.hall} • {s.price} DA
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-slate-500 text-sm">Aucune séance disponible</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}