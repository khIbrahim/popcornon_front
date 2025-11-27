import { MapPin, Users, LayoutGrid } from "lucide-react";
import type { Cinema } from "../../types/cinema";

interface Props {
    cinema: Cinema;
    onClick: () => void;
}

export default function CinemaCard({ cinema, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="group text-left rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden hover:border-red-500/30 hover:bg-white/[0.04] transition-all duration-300"
        >
            {/* Cover */}
            <div className="relative h-40 overflow-hidden">(
                    <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-orange-500/10 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white/20">{cinema.name. charAt(0)}</span>
                    </div>
                )
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {cinema.name}
                </h3>

                <div className="flex items-center gap-1. 5 text-sm text-slate-400 mb-3">
                    <MapPin size={14} className="text-red-500" />
                    <span>{cinema.city}, {cinema.wilaya}</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                        <LayoutGrid size={12} />
                        {cinema.halls?. length || 0} salle(s)
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