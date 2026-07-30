import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Banknote, Save, Sparkles } from 'lucide-react';
import Button from "../../ui/Button.tsx";
import Input from "../../ui/Input.tsx";
import Select from "../../ui/Select.tsx";
import TMDBSearchInput from "../../ui/TMDBSearchInput.tsx";

import type { TMDBMovie } from '../../../../types/tmdb.ts';
import {
    createTmdbFromMovie,
    type Movie,
} from "../../../../types/movie.ts";
import type {CreateCinemaScreeningPayload} from "../../../../types/cinema.ts";
import {useCinema} from "../../../../context/CinemaContext.tsx";
import {formatDateLocal} from "../../../../utils/date.ts";

interface MovieFormProps {
    initial?: Movie;
    onCancel: () => void;
    onSubmit: (screening: CreateCinemaScreeningPayload) => void;
    isLoading?: boolean;
    defaultDate?: string;
}

const STATUS_OPTIONS: {
    value: "draft" | "active";
    label: string;
}[] = [
    { value: "draft", label: "Brouillon" },
    { value: "active", label: "Actif" },
];

const formatDateForInput = (value?: string | null): string => {
    if (! value) {
        return '';
    }

    return value.slice(0, 10);
};

const MovieForm = ({ initial, onCancel, onSubmit, isLoading, defaultDate }: MovieFormProps) => {
    const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);

    const {halls} = useCinema();
    const [price, setPrice]   = useState(initial?.price?.toString() ?? '800');
    const [time, setTime]     = useState(initial?.time ?? '');
    const [cinemaHallId, setCinemaHallId] = useState<number>(halls[0]?.id ?? 0);
    const [status, setStatus] = useState<"draft" | "active">(
        initial?.status === "active"
            ? "active"
            : "draft"
    );
    const [date, setDate]     = useState(() => formatDateForInput(initial?.date) || formatDateForInput(defaultDate) || formatDateLocal(new Date()));

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (! initial) {
            return;
        }

        setSelectedMovie(createTmdbFromMovie(initial));
        setPrice(initial.price?.toString() ?? '800');
        setTime(initial.time ?? '');
        setDate(formatDateForInput(initial.date));
        setStatus(
            initial.status === "active"
                ? "active"
                : "draft"
        );

        console.log('Date originale :', initial.date);
        console.log('Date input :', formatDateForInput(initial.date));
    }, [initial]);

    useEffect(() => {
        if (initial) {
            const currentHall = halls.find(
                (hall) => hall.name === initial.hall
            );

            if (currentHall) {
                setCinemaHallId(currentHall.id);
                return;
            }
        }

        if (halls.length > 0) {
            setCinemaHallId(halls[0].id);
        }
    }, [initial, halls]);

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (! selectedMovie) {
            newErrors.movie = 'Veuillez sélectionner un film';
        }
        if (selectedMovie && ! selectedMovie.runtime) {
            newErrors.movie = 'La durée du film est requise pour calculer la fin de la séance';
        }
        if (! cinemaHallId) {
            newErrors.hall = 'Veuillez sélectionner une salle';
        }
        if (! price || Number(price) <= 0) {
            newErrors.price = 'Le prix doit être supérieur à 0';
        }
        if (! date) {
            newErrors.date = 'La date est requise';
        }
        if (! time) {
            newErrors.time = 'L\'heure est requise';
        }
        if (date && time && new Date(`${date}T${time}`) <= new Date()) {
            newErrors.time = 'La séance doit commencer dans le futur';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (! validate() || ! selectedMovie) {
            return;
        }

        const data: CreateCinemaScreeningPayload = {
            movie: {
                tmdb_id: selectedMovie.id,
                title: selectedMovie.title,
                overview: selectedMovie.overview || null,
                poster: selectedMovie.poster_path || null,
                runtime: selectedMovie.runtime ?? 0,
                vote_average: selectedMovie.vote_average ?? 0,
                genres: selectedMovie.genres?.map((genre) => genre.name) ?? [],
            },
            cinema_hall_id: cinemaHallId,
            starts_at: `${date} ${time}`,
            price: Number(price),
            status,
        };

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* ========== SECTION 1: Recherche TMDB ========== */}
            <div>
                <TMDBSearchInput
                    value={selectedMovie}
                    onChange={setSelectedMovie}
                    error={errors.movie}
                />
            </div>

            {/* ========== DIVIDER avec indication ========== */}
            {selectedMovie && (
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-800" />
                    </div>
                    <div className="relative flex justify-center">
            <span className="flex items-center gap-1.5 px-3 text-xs font-medium text-slate-500 bg-slate-900">
              <Sparkles size={12} className="text-red-500" />
              DÉTAILS DE LA SÉANCE
            </span>
                    </div>
                </div>
            )}

            {/* ========== SECTION 2: Champs manuels ========== */}
            {selectedMovie && (
                <>
                    {/* Ligne 1: Prix + Salle */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                                <Banknote size={14} className="text-slate-500" />
                                Prix (DA)
                            </label>
                            <Input
                                type="number"
                                min={0}
                                step={50}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="800"
                                className={errors.price ? 'border-rose-500' : ''}
                            />
                            {errors.price && (
                                <p className="text-xs text-rose-400">{errors.price}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                                <MapPin size={14} className="text-slate-500" />
                                Salle
                            </label>
                            <Select value={cinemaHallId} onChange={(e) => setCinemaHallId(Number(e.target.value))}>
                                {halls.length > 0 ?  (
                                    halls.map((hall) => (
                                        <option key={hall.id} value={hall.id}>{hall.name}</option>
                                    ))
                                ) : (
                                    <option value="">Aucune salle configurée</option>
                                )}
                            </Select>
                            {errors.hall && (
                                <p className="text-xs text-rose-400">{errors.hall}</p>
                            )}
                        </div>
                    </div>

                    {/* Ligne 2 : Date + Heure + Statut */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                                <Calendar size={14} className="text-slate-500" />
                                Date
                            </label>
                            <Input
                                type="date"
                                min={formatDateLocal(new Date())}
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                className={errors.date ? 'border-rose-500' : ''}
                            />
                            {errors.date && (
                                <p className="text-xs text-rose-400">{errors.date}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                                <Clock size={14} className="text-slate-500" />
                                Heure
                            </label>
                            <Input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className={errors.time ? 'border-rose-500' : ''}
                            />
                            {errors.time && (
                                <p className="text-xs text-rose-400">{errors.time}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-300">
                                Statut
                            </label>
                            <Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as "draft" | "active")}
                            >
                                {STATUS_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    {/* Preview rapide des infos TMDB (lecture seule) */}
                    <div className="p-3 bg-slate-800/30 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-500 mb-2">Informations auto-remplies par TMDB :</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                            <div>
                                <span className="text-slate-500">Durée</span>
                                <p className="text-white font-medium">
                                    {selectedMovie.runtime ? `${selectedMovie.runtime} min` : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <span className="text-slate-500">Note</span>
                                <p className="text-yellow-400 font-medium">
                                    ⭐ {selectedMovie.vote_average.toFixed(1)}
                                </p>
                            </div>
                            <div>
                                <span className="text-slate-500">Sortie</span>
                                <p className="text-white font-medium">
                                    {selectedMovie.release_date?.split('-')[0] || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <span className="text-slate-500">Genres</span>
                                <p className="text-white font-medium truncate">
                                    {selectedMovie.genres?.slice(0, 2).map(g => g.name).join(', ') || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* ========== ACTIONS ========== */}
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <Button variant="ghost" type="button" onClick={onCancel}>
                    Annuler
                </Button>
                <Button
                    type="submit"
                    disabled={!selectedMovie}
                    isLoading={isLoading}
                    className={!selectedMovie ? 'cursor-not-allowed' : 'cursor-pointer'}
                >
                    <Save size={16} />
                    {initial ? 'Mettre à jour' : 'Ajouter la séance'}
                </Button>
            </div>
        </form>
    );
};

export default MovieForm;
