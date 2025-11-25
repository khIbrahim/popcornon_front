import { useState, useEffect, useRef } from 'react';
import { Search, Star, Calendar, Loader2, Film, X } from 'lucide-react';
import {useTMDB} from "../../../hooks/useTMDB.ts";
import {useDebounce} from "../../../hooks/useDebounce.ts";
import { getImageUrl } from '../../../services/tmdb.ts';
import { cn } from '../../../utils/cn.ts';
import type { TMDBMovie } from '../../../types/tmdb.ts';

interface TMDBSearchInputProps {
    value: TMDBMovie | null;
    onChange: (movie: TMDBMovie | null) => void;
    error?: string;
}

export default function TMDBSearchInput({ value, onChange, error }: TMDBSearchInputProps) {
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const debouncedQuery = useDebounce(query, 350);
    const { results, isLoading, search, clearResults } = useTMDB();
    const containerRef = useRef<HTMLDivElement>(null);

    // Recherche debounced
    useEffect(() => {
        search(debouncedQuery);
    }, [debouncedQuery, search]);

    // Fermer au clic extérieur
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSelect = (movie: TMDBMovie) => {
        onChange(movie);
        setQuery('');
        setShowResults(false);
        clearResults();
    };

    const handleClear = () => {
        onChange(null);
        setQuery('');
    };

    // Film déjà sélectionné - Afficher preview
    if (value) {
        return (
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Film sélectionné</label>
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                    {value.poster_path ? (
                        <img
                            src={getImageUrl(value.poster_path, 'w92')!}
                            alt={value.title}
                            className="w-12 h-[72px] rounded-lg object-cover"
                        />
                    ) : (
                        <div className="w-12 h-[72px] rounded-lg bg-slate-700 flex items-center justify-center">
                            <Film size={20} className="text-slate-500" />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">{value.title}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                            {value.release_date && (
                                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                                    {value.release_date.split('-')[0]}
                </span>
                            )}
                            <span className="flex items-center gap-1 text-yellow-400">
                <Star size={12} className="fill-yellow-400" />
                                {value.vote_average.toFixed(1)}
              </span>
                            {value.runtime && <span>{value.runtime} min</span>}
                        </div>
                        {value.genres && value.genres.length > 0 && (
                            <p className="mt-1 text-xs text-slate-500 truncate">
                                {value.genres.map(g => g.name).join(' • ')}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>
        );
    }

    // Champ de recherche
    return (
        <div ref={containerRef} className="relative space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
                Rechercher un film <span className="text-slate-500">(TMDB)</span>
            </label>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                    placeholder="Tapez le titre du film..."
                    className={cn(
                        'w-full h-11 pl-10 pr-10 rounded-xl text-sm text-white bg-slate-800/60 border transition-all',
                        'placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-red-500/20',
                        error ? 'border-rose-500' : 'border-slate-700 focus:border-red-500'
                    )}
                />
                {isLoading && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500 animate-spin" />
                )}
            </div>

            {error && <p className="text-xs text-rose-400">{error}</p>}

            {/* Résultats Dropdown */}
            {showResults && results.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
                    <div className="max-h-72 overflow-y-auto">
                        {results.map((movie) => (
                            <button
                                key={movie.id}
                                type="button"
                                onClick={() => handleSelect(movie)}
                                className="w-full flex items-center gap-3 p-3 hover:bg-slate-800 transition-colors border-b border-slate-800/50 last:border-0"
                            >
                                {movie.poster_path ? (
                                    <img
                                        src={getImageUrl(movie.poster_path, 'w92')!}
                                        alt={movie.title}
                                        className="w-10 h-[60px] rounded-lg object-cover shrink-0"
                                    />
                                ) : (
                                    <div className="w-10 h-[60px] rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
                                        <Film size={16} className="text-slate-500" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0 text-left">
                                    <p className="text-sm font-medium text-white truncate">{movie.title}</p>
                                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                                        {movie.release_date && <span>{movie.release_date.split('-')[0]}</span>}
                                        <span className="flex items-center gap-0.5 text-yellow-400">
                      <Star size={10} className="fill-yellow-400" />
                                            {movie.vote_average.toFixed(1)}
                    </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* No results */}
            {showResults && query.length >= 2 && !isLoading && results.length === 0 && (
                <div className="absolute z-50 w-full mt-1 p-4 bg-slate-900 border border-slate-700 rounded-xl text-center">
                    <p className="text-sm text-slate-400">Aucun résultat pour "{query}"</p>
                </div>
            )}
        </div>
    );
}