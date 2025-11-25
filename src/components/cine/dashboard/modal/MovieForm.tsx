import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Banknote, Save, Sparkles } from 'lucide-react';
import Button from "../../ui/Button.tsx";
import Input from "../../ui/Input.tsx";
import Select from "../../ui/Select.tsx";
import TMDBSearchInput from "../../ui/TMDBSearchInput.tsx";

import type { TMDBMovie } from '../../../../types/tmdb.ts';
import {
    createMovieFromTMDB,
    createTmdbFromMovie,
    type Movie,
    type MovieFormData,
    type MovieStatus
} from "../../../../types/movie.ts";

interface MovieFormProps {
    initial?: Movie;
    onCancel: () => void;
    onSubmit: (movie: Movie) => void;
    isLoading?: boolean;
}

const HALLS = ['Salle 1', 'Salle 2', 'Salle 3', 'Salle VIP', 'Salle IMAX', 'Salle 3D'];

const STATUS_OPTIONS: { value: MovieStatus; label: string }[] = [
    { value: 'draft', label: '📝 Brouillon' },
    { value: 'active', label: '✅ Actif' },
    { value: 'archived', label: '📦 Archivé' },
];

const MovieForm = ({ initial, onCancel, onSubmit, isLoading }: MovieFormProps) => {
    // Film sélectionné via TMDB (ou initial en mode edit)
    const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);

    const [price, setPrice] = useState(initial?.price?.toString() ?? '800');
    const [date, setDate] = useState(initial?.date ?? '');
    const [time, setTime] = useState(initial?.time ?? '');
    const [hall, setHall] = useState(initial?.hall ?? HALLS[0]);
    const [status, setStatus] = useState<MovieStatus>(initial?.status ?? 'draft');

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initial) {
            setSelectedMovie(createTmdbFromMovie(initial));
        }
    }, [initial]);

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (! selectedMovie) {
            newErrors.movie = 'Veuillez sélectionner un film';
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (! validate() || ! selectedMovie) {
            return;
        }

        const formData: MovieFormData = {
            price: Number(price),
            date,
            time,
            hall,
            status,
        };

        onSubmit(createMovieFromTMDB(selectedMovie, formData));
    };

    const today = new Date().toISOString().split('T')[0];

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
                            <Select value={hall} onChange={(e) => setHall(e.target.value)}>
                                {HALLS.map((h) => (
                                    <option key={h} value={h}>{h}</option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    {/* Ligne 2: Date + Heure + Statut */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                                <Calendar size={14} className="text-slate-500" />
                                Date
                            </label>
                            <Input
                                type="date"
                                min={today}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
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
                                onChange={(e) => setStatus(e.target.value as MovieStatus)}
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