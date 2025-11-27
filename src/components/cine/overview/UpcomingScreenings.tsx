import { Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Movie } from "../../../types/movie";

interface Props {
    screenings: Movie[];
    isLoading?: boolean;
}

export default function UpcomingScreenings({ screenings, isLoading }: Props) {
    const today = new Date().toISOString().split("T")[0];

    if (isLoading) {
        return (
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 h-full animate-pulse">
                <div className="h-6 w-40 bg-white/5 rounded mb-6" />
                <div className="space-y-3">
                    {[1, 2, 3, 4]. map(i => (
                        <div key={i} className="h-16 bg-white/5 rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <Clock size={20} className="text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">Prochaines séances</h3>
                        <p className="text-xs text-slate-500">Aujourd'hui & demain</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 space-y-2">
                {screenings.length > 0 ? (
                    screenings.map((movie) => (
                        <div
                            key={movie._id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                        >
                            <img
                                src={movie.poster ?  `https://image.tmdb.org/t/p/w92${movie.poster}` : "/placeholder. jpg"}
                                alt={movie.title}
                                className="w-10 h-14 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{movie. title}</p>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span className={movie.date === today ? "text-emerald-400" : ""}>
                                        {movie.date === today ? "Aujourd'hui" : "Demain"}
                                    </span>
                                    <span>•</span>
                                    <span>{movie.time}</span>
                                    <span>•</span>
                                    <span>{movie.hall}</span>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-white">{movie.price} DA</span>
                        </div>
                    ))
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-sm text-slate-500">Aucune séance prévue</p>
                    </div>
                )}
            </div>

            <Link
                to="/dashboard/movies"
                className="mt-4 flex items-center justify-center gap-2 py-2. 5 rounded-xl bg-white/5 text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
                Voir toutes les séances
                <ChevronRight size={16} />
            </Link>
        </div>
    );
}