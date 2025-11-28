import { useState, useCallback, useEffect } from 'react';
import { tmdbService } from '../services/tmdb';
import type { TMDBMovie } from '../types/tmdb.ts';

interface UseTMDBState {
    results: TMDBMovie[];
    selected: TMDBMovie | null;
    isLoading: boolean;
    error: string | null;
}

export function useTMDB() {
    const [state, setState] = useState<UseTMDBState>({
        results: [],
        selected: null,
        isLoading: false,
        error: null,
    });

    const [genresMap, setGenresMap] = useState<Record<number, string>>({});

    useEffect(() => {
        tmdbService.getGenres().then(list => {
            const map: Record<number, string> = {};
            list.forEach(g => map[g.id] = g.name);
            setGenresMap(map);
        });
    }, []);

    const search = useCallback(async (query: string) => {
        if (query.length < 2) {
            setState(s => ({ ...s, results: [], error: null }));
            return;
        }

        setState(s => ({ ...s, isLoading: true, error: null }));

        try {
            const results = await tmdbService.searchMovies(query);
            const mapped = results.map(m => ({
                ...m,
                genres: m.genre_ids?.map(id => ({ id, name: genresMap[id] })) ?? []
            }));

            setState(s => ({ ...s, results: mapped, isLoading: false }));
        } catch (err) {
            setState(s => ({
                ...s,
                results: [],
                isLoading: false,
                error: err instanceof Error ? err.message : 'Erreur',
            }));
        }
    }, []);

    const selectMovie = useCallback(async (movie: TMDBMovie) => {
        setState(s => ({ ...s, isLoading: true, error: null }));

        try {
            const details = await tmdbService.getMovieDetails(movie.id);

            setState(s => ({
                ...s,
                selected: details,
                results: [],
                isLoading: false
            }));

            return details;
        } catch (err) {
            console.error("Erreur getMovieDetails:", err);

            setState(s => ({ ...s, isLoading: false, error: "Impossible de charger les détails" }));

            return movie;
        }
    }, []);


    const clearSelection = useCallback(() => {
        setState(s => ({ ...s, selected: null, results: [] }));
    }, []);

    const clearResults = useCallback(() => {
        setState(s => ({ ...s, results: [] }));
    }, []);

    return {
        ...state,
        search,
        selectMovie,
        clearSelection,
        clearResults,
    };
}