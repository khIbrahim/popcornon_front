import { useMemo, useState } from "react";
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
    Ticket,
} from "lucide-react";
import type {
    PublicCinema,
    PublicCinemaScreening,
} from "../../types/publicCinema";
import { formatDateLocal, getNext7Days } from "../../utils/date";

interface Props {
    cinema: PublicCinema;
    screenings: PublicCinemaScreening[];
    onClose: () => void;
}

const DAYS_FR = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const MONTHS_FR = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export default function PublicCinemaDrawer({ cinema, screenings, onClose }: Props) {
    const [weekStart, setWeekStart] = useState(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    });
    const [selectedDate, setSelectedDate] = useState(() => formatDateLocal(new Date()));

    const weekDays = useMemo(() => getNext7Days(weekStart), [weekStart]);

    const screeningsByDate = useMemo(() => {
        const map = new Map<string, PublicCinemaScreening[]>();
        screenings.forEach((s) => {
            if (!map.has(s.date)) map.set(s.date, []);
            map.get(s.date)!.push(s);
        });
        return map;
    }, [screenings]);

    const screeningsForSelectedDate = useMemo(
        () => screeningsByDate.get(selectedDate) ?? [],
        [screeningsByDate, selectedDate]
    );

    const groupedByMovie = useMemo(() => {
        const map = new Map<string, PublicCinemaScreening[]>();
        screeningsForSelectedDate.forEach((s) => {
            const key = s.movieId;
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(s);
        });
        return Array.from(map.values());
    }, [screeningsForSelectedDate]);

    const prevWeek = () => {
        const newStart = new Date(weekStart);
        newStart.setDate(weekStart.getDate() - 7);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (newStart >= today) {
            setWeekStart(newStart);
            setSelectedDate(formatDateLocal(newStart));
        }
    };

    const nextWeek = () => {
        const newStart = new Date(weekStart);
        newStart.setDate(weekStart.getDate() + 7);
        setWeekStart(newStart);
        setSelectedDate(formatDateLocal(newStart));
    };

    const isPast = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#0a0a0f] border border-white/10 shadow-2xl flex flex-col">
                {/* Header */}
                <div className="relative h-44 shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-red-500/40 via-orange-500/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent" />

                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Cinema info */}
                    <div className="absolute bottom-4 left-5 right-5 flex items-end gap-4">
                        <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                            {cinema.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl md:text-3xl font-bold text-white truncate">
                                {cinema.name}
                            </h2>
                            <div className="flex items-center gap-1.5 text-sm text-slate-300 mt-1">
                                <MapPin size={14} className="text-red-400 shrink-0" />
                                <span className="truncate">
                  {cinema.address}, {cinema.city}
                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-6">
                        {/* Stats cards */}
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <LayoutGrid size={18} className="text-red-500 mb-2" />
                                <p className="text-2xl font-bold text-white">
                                    {cinema.halls?.length ?? 0}
                                </p>
                                <p className="text-sm text-slate-500">Salles</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <Users size={18} className="text-red-500 mb-2" />
                                <p className="text-2xl font-bold text-white">
                                    {cinema.capacity}
                                </p>
                                <p className="text-sm text-slate-500">Places totales</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <Clock size={18} className="text-red-500 mb-2" />
                                <p className="text-sm text-slate-400">
                                    Consultez les horaires du jour dans le programme
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        {cinema.description && (
                            <div>
                                <h3 className="text-sm font-semibold text-white mb-2">À propos</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {cinema.description}
                                </p>
                            </div>
                        )}

                        {/* Contact */}
                        <div className="flex flex-wrap gap-3">
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
                                    href={cinema.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-sm text-slate-300 hover:bg-white/10 transition-colors"
                                >
                                    <Globe size={16} className="text-red-500" />
                                    Site web
                                </a>
                            )}
                        </div>

                        {/* Programme 7 jours */}
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
                                    <span className="text-sm text-slate-400 min-w-[150px] text-center">
                    {weekDays[0].getDate()}{" "}
                                        {MONTHS_FR[weekDays[0].getMonth()]} –{" "}
                                        {weekDays[6].getDate()}{" "}
                                        {MONTHS_FR[weekDays[6].getMonth()]}
                  </span>
                                    <button
                                        onClick={nextWeek}
                                        className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Days pills */}
                            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                                {weekDays.map((date) => {
                                    const dateStr = formatDateLocal(date);
                                    const selected = selectedDate === dateStr;
                                    const past = isPast(date);
                                    const today = isSameDay(date, new Date());

                                    return (
                                        <button
                                            key={dateStr}
                                            onClick={() => !past && setSelectedDate(dateStr)}
                                            disabled={past}
                                            className={`flex flex-col items-center px-4 py-3 rounded-xl min-w-[70px] transition-all ${
                                                selected
                                                    ? "bg-red-500 text-white"
                                                    : past
                                                        ? "bg-white/[0.02] text-slate-600 cursor-not-allowed"
                                                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                            }`}
                                        >
                      <span className="text-xs font-medium">
                        {DAYS_FR[date.getDay()]}
                      </span>
                                            <span className="text-lg font-bold">{date.getDate()}</span>
                                            {today && (
                                                <span className="text-[10px] mt-0.5">
                          Auj.
                        </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Screenings */}
                            {groupedByMovie.length > 0 ? (
                                <div className="space-y-4">
                                    {groupedByMovie.map((screeningsForMovie) => {
                                        const s0 = screeningsForMovie[0];

                                        return (
                                            <div
                                                key={s0.movieId}
                                                className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                                            >
                                                <div className="flex gap-4">
                                                    {/* Poster */}
                                                    <div className="w-20 h-28 rounded-lg overflow-hidden shrink-0 bg-white/5">
                                                        {s0.poster ? (
                                                            <img
                                                                src={`https://image.tmdb.org/t/p/w200${s0.poster}`}
                                                                alt={s0.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-2xl text-white/20">
                                                                {s0.title.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Infos film */}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-base font-bold text-white truncate">
                                                            {s0.title}
                                                        </h4>
                                                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                                            {typeof s0.runtime === "number" && (
                                                                <span>{s0.runtime} min</span>
                                                            )}
                                                            {s0.genres && s0.genres.length > 0 && (
                                                                <span className="flex flex-wrap gap-1">
                                  {s0.genres.slice(0, 2).map((g) => (
                                      <span
                                          key={g}
                                          className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-400"
                                      >
                                      {g}
                                    </span>
                                  ))}
                                </span>
                                                            )}
                                                        </div>

                                                        {/* Horaires */}
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {screeningsForMovie.map((s) => (
                                                                <button
                                                                    key={s._id}
                                                                    className="group px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/60 hover:bg-red-500/10 transition-all"
                                                                >
                                  <span className="text-sm font-semibold text-white group-hover:text-red-400">
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
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center">
                                        <Ticket size={24} className="text-slate-600" />
                                    </div>
                                    <p className="text-slate-500">
                                        Aucune séance programmée pour cette date.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
