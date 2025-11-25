import { useState, useCallback } from 'react';
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

    const search = useCallback(async (query: string) => {
        if (query.length < 2) {
            setState(s => ({ ...s, results: [], error: null }));
            return;
        }

        setState(s => ({ ...s, isLoading: true, error: null }));

        try {
            const results = await tmdbService.searchMovies(query);

            setState(s => ({ ...s, results, isLoading: false }));
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
        setState(s => ({ ...s, isLoading: true }));

        try {
            const details = await tmdbService.getMovieDetails(movie.id);
            setState(s => ({
                ...s,
                selected: details,
                results: [],
                isLoading: false,
            }));
        } catch {
            setState(s => ({
                ...s,
                selected: movie,
                results: [],
                isLoading: false,
            }));
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