import { MapPin, Users, LayoutGrid } from "lucide-react";
import type { PublicCinema } from "../../types/publicCinema";

interface Props {
    cinema: PublicCinema;
    onClick: () => void;
}

export default function PublicCinemaCard({ cinema, onClick }: Props) {
    const totalHalls = cinema.halls?.length ?? 0;

    return (
        <button
            onClick={onClick}
            className="group text-left rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden hover:border-red-500/40 hover:bg-white/[0.04] transition-all duration-300"
        >
            {/* Cover simple (pas encore de coverPhoto publique) */}
            <div className="relative h-40 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-red-500/25 via-orange-500/15 to-transparent flex items-center justify-center">
          <span className="text-4xl font-bold text-white/15">
            {cinema.name.charAt(0)}
          </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-400 transition-colors line-clamp-1">
                    {cinema.name}
                </h3>

                <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-3">
                    <MapPin size={14} className="text-red-500" />
                    <span className="truncate">
            {cinema.city}, {cinema.wilaya}
          </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {cinema.description || "Cinéma partenaire PopcornON"}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <LayoutGrid size={12} />
              {totalHalls} salle{totalHalls > 1 ? "s" : ""}
          </span>
                    <span className="flex items-center gap-1">
            <Users size={12} />
                        {cinema.capacity} places
          </span>
                </div>
            </div>
        </button>
    );
}
