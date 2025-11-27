import { useState, useMemo } from "react";
import {
    X,
    MapPin,
    Phone,
    Mail,
    Globe,
    Clock,
    Users,
    LayoutGrid,
    ChevronLeft,
    ChevronRight,
    Star,
    Ticket
} from "lucide-react";
import { useCinemaScreenings } from "../../hooks/useCinemas";
import type { Cinema } from "../../types/cinema";

interface Props {
    cinema: Cinema;
    onClose: () => void;
}

const DAYS_FR = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const MONTHS_FR = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

function getWeekDays(startDate: Date) {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date. setDate(startDate.getDate() + i);
        days.push(date);
    }
    return days;
}

function formatDate(date: Date) {
    return date.toISOString().split("T")[0];
}

export default function CinemaModal({ cinema, onClose }: Props) {
    const [weekStart, setWeekStart] = useState(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    });
    const [selectedDate, setSelectedDate] = useState(() => formatDate(new Date()));

    const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);

    const { data: screeningsData, isLoading } = useCinemaScreenings(cinema._id, selectedDate);
    const screenings = screeningsData?.data ??  [];

    const prevWeek = () => {
        const newStart = new Date(weekStart);
        newStart.setDate(weekStart.getDate() - 7);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (newStart >= today) {
            setWeekStart(newStart);
        }
    };

    const nextWeek = () => {
        const newStart = new Date(weekStart);
        newStart. setDate(weekStart.getDate() + 7);
        setWeekStart(newStart);
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date. toDateString() === today.toDateString();
    };

    const isPast = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    // Group screenings by movie
    const groupedScreenings = useMemo(() => {
        const groups: Record<string, typeof screenings> = {};
        screenings. forEach((s) => {
            const key = s.movie._id;
            if (!groups[key]) groups[key] = [];
            groups[key].push(s);
        });
        return Object.values(groups);
    }, [screenings]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#0a0a0f] border border-white/10 shadow-2xl flex flex-col">
                {/* Header with cover */}
                <div className="relative h-48 shrink-0">
                    {cinema.coverPhoto ?  (
                        <img
                            src={cinema.coverPhoto}
                            alt={cinema.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-500/30 to-orange-500/10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Cinema info */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4">
                        PHOTO
                        {/*{cinema.photo && (*/}
                        {/*    <div className="h-20 w-20 rounded-xl border-2 border-white/20 overflow-hidden bg-slate-900 shrink-0">*/}
                        {/*        <img src={cinema.photo} alt="" className="w-full h-full object-cover" />*/}
                        {/*    </div>*/}
                        {/*)}*/}
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold text-white truncate">{cinema.name}</h2>
                            <div className="flex items-center gap-1. 5 text-sm text-slate-300 mt-1">
                                <MapPin size={14} className="text-red-500 shrink-0" />
                                <span className="truncate">{cinema. address}, {cinema.city}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-6">
                        {/* Info cards */}
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <LayoutGrid size={18} className="text-red-500 mb-2" />
                                <p className="text-2xl font-bold text-white">{cinema.halls?.length || 0}</p>
                                <p className="text-sm text-slate-500">Salles</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <Users size={18} className="text-red-500 mb-2" />
                                <p className="text-2xl font-bold text-white">{cinema.capacity}</p>
                                <p className="text-sm text-slate-500">Places</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/[0. 02] border border-white/5">
                                <Clock size={18} className="text-red-500 mb-2" />
                                <p className="text-lg font-bold text-white">14:00 - 23:00</p>
                                <p className="text-sm text-slate-500">Horaires</p>
                            </div>
                        </div>

                        {/* Description */}
                        {cinema.description && (
                            <div>
                                <h3 className="text-sm font-semibold text-white mb-2">À propos</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{cinema.description}</p>
                            </div>
                        )}

                        {/* Contact */}
                        <div className="flex flex-wrap gap-4">
                            {cinema.phone && (
                                <a
                                    href={`tel:${cinema.phone}`}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-sm text-slate-300 hover:bg-white/10 transition-colors"
                                >
                                    <Phone size={16} className="text-red-500" />
                                    {cinema.phone}
                                </a>
                            )}
                            {cinema.email && (
                                <a
                                    href={`mailto:${cinema.email}`}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-sm text-slate-300 hover:bg-white/10 transition-colors"
                                >
                                    <Mail size={16} className="text-red-500" />
                                    {cinema.email}
                                </a>
                            )}
                            {cinema.website && (
                                <a
                                    href={cinema. website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-sm text-slate-300 hover:bg-white/10 transition-colors"
                                >
                                    <Globe size={16} className="text-red-500" />
                                    Site web
                                </a>
                            )}
                        </div>

                        {/* Calendar */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">Programme</h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={prevWeek}
                                        disabled={isPast(weekDays[0])}
                                        className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <span className="text-sm text-slate-400 min-w-[140px] text-center">
                                        {weekDays[0].getDate()} - {weekDays[6].getDate()} {MONTHS_FR[weekDays[6].getMonth()]}
                                    </span>
                                    <button
                                        onClick={nextWeek}
                                        className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Week days */}
                            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                                {weekDays.map((date) => {
                                    const dateStr = formatDate(date);
                                    const isSelected = selectedDate === dateStr;
                                    const past = isPast(date);
                                    const today = isToday(date);

                                    return (
                                        <button
                                            key={dateStr}
                                            onClick={() => ! past && setSelectedDate(dateStr)}
                                            disabled={past}
                                            className={`flex flex-col items-center px-4 py-3 rounded-xl min-w-[70px] transition-all ${
                                                isSelected
                                                    ? "bg-red-500 text-white"
                                                    : past
                                                        ? "bg-white/[0.02] text-slate-600 cursor-not-allowed"
                                                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                            }`}
                                        >
                                            <span className="text-xs font-medium">{DAYS_FR[date.getDay()]}</span>
                                            <span className="text-lg font-bold">{date.getDate()}</span>
                                            {today && <span className="text-[10px] mt-0.5">Auj. </span>}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Screenings */}
                            {isLoading ?  (
                                <div className="space-y-4">
                                    {[1, 2]. map((i) => (
                                        <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 animate-pulse">
                                            <div className="flex gap-4">
                                                <div className="w-20 h-28 rounded-lg bg-white/5" />
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-5 bg-white/5 rounded w-1/2" />
                                                    <div className="h-4 bg-white/5 rounded w-1/4" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : groupedScreenings.length > 0 ?  (
                                <div className="space-y-4">
                                    {groupedScreenings. map((movieScreenings) => {
                                        const movie = movieScreenings[0]. movie;
                                        return (
                                            <div
                                                key={movie._id}
                                                className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                                            >
                                                <div className="flex gap-4">
                                                    {/* Poster */}
                                                    <div className="w-20 h-28 rounded-lg overflow-hidden shrink-0">
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                                                            alt={movie.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>

                                                    {/* Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-base font-bold text-white truncate">
                                                            {movie.title}
                                                        </h4>
                                                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                                            <span className="flex items-center gap-1">
                                                                <Star size={12} className="text-yellow-500" />
                                                                {movie.voteAverage?. toFixed(1)}
                                                            </span>
                                                            <span>{movie.runtime} min</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {movie.genres?. slice(0, 2).map((g) => (
                                                                <span
                                                                    key={g}
                                                                    className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-400"
                                                                >
                                                                    {g}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        {/* Showtimes */}
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {movieScreenings.map((s) => (
                                                                <button
                                                                    key={s._id}
                                                                    className="group/btn px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 transition-all"
                                                                >
                                                                    <span className="text-sm font-semibold text-white group-hover/btn:text-red-400">
                                                                        {s.time}
                                                                    </span>
                                                                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                                                                        <span>{s.hall}</span>
                                                                        <span>•</span>
                                                                        <span>{s.price} DA</span>
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center">
                                        <Ticket size={24} className="text-slate-600" />
                                    </div>
                                    <p className="text-slate-500">Aucune séance programmée pour cette date</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}