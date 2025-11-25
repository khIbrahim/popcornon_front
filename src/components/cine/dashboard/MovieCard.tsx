import { Star, Clock, Edit3, Eye, Trash2, MoreVertical } from "lucide-react";
import Badge from "../ui/Badge.tsx";
import Button from "../ui/Button.tsx";
import type { Movie } from "../../../types/movie.ts";

interface Props {
    movie: Movie;
    isDropdownOpen: boolean;
    onDropdownToggle: () => void;
    onEdit: () => void;
    onToggleStatus: () => void;
    onDelete: () => void;
}

export default function MovieCard({ movie, isDropdownOpen, onDropdownToggle, onEdit, onToggleStatus, onDelete }: Props) {
    const posterUrl = movie.poster
        ? `https://image.tmdb.org/t/p/w500${movie.poster}`
        : "/placeholder.jpg";

    return (
        <div className="group relative rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden hover:border-red-500/30 hover:bg-white/[0.04] transition-all duration-300">
            {/* Poster */}
            <div className="relative aspect-[2/3] overflow-hidden">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent opacity-80" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                    <Badge status={movie.status} />
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-semibold text-white">{movie.voteAverage?.toFixed(1)}</span>
                    </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 mb-1">
                        {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {movie.runtime} min
                        </span>
                        <span>•</span>
                        <span>{movie.releaseDate?.split("-")[0]}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                        {movie.genres?.slice(0, 2).map((genre) => (
                            <span
                                key={genre}
                                className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-medium text-slate-300"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                    <Button variant="outline" className="w-32" onClick={onEdit}>
                        <Edit3 size={14} />
                        Modifier
                    </Button>
                    <Button variant="ghost" className="w-32 text-slate-400 hover:text-white" onClick={onToggleStatus}>
                        <Eye size={14} />
                        {movie.status === "active" ? "Archiver" : "Activer"}
                    </Button>
                    <Button variant="destructive" className="w-32" onClick={onDelete}>
                        <Trash2 size={14} />
                        Supprimer
                    </Button>
                </div>
            </div>

            {/* Price bar */}
            <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-lg font-bold text-white">
                    {movie.price} <span className="text-sm text-slate-500">DA</span>
                </span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDropdownToggle();
                    }}
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                    <MoreVertical size={16} className="text-slate-500" />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                    <div className="absolute bottom-14 right-3 w-40 py-1 rounded-xl bg-slate-900 border border-white/10 shadow-xl z-10">
                        <button onClick={onEdit} className="w-full px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/5 flex items-center gap-2">
                            <Edit3 size={14} /> Modifier
                        </button>
                        <button onClick={onToggleStatus} className="w-full px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/5 flex items-center gap-2">
                            <Eye size={14} /> {movie.status === "active" ? "Archiver" : "Activer"}
                        </button>
                        <button onClick={onDelete} className="w-full px-3 py-2 text-left text-sm text-rose-400 hover:bg-white/5 flex items-center gap-2">
                            <Trash2 size={14} /> Supprimer
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}