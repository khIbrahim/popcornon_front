import { useCallback, useState } from 'react';
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
            setState(current => ({ ...current, results: [], error: null }));
            return;
        }

        setState(current => ({ ...current, isLoading: true, error: null }));

        try {
            const results = await tmdbService.searchMovies(query);
            setState(current => ({ ...current, results, isLoading: false }));
        } catch (error) {
            setState(current => ({
                ...current,
                results: [],
                isLoading: false,
                error: error instanceof Error ? error.message : 'Erreur',
            }));
        }
    }, []);

    const selectMovie = useCallback(async (movie: TMDBMovie) => {
        setState(current => ({ ...current, isLoading: true, error: null }));

        try {
            const details = await tmdbService.getMovieDetails(movie.tmdbId);
            setState(current => ({
                ...current,
                selected: details,
                results: [],
                isLoading: false,
            }));

            return details;
        } catch (error) {
            console.error('Erreur getMovieDetails:', error);
            setState(current => ({
                ...current,
                isLoading: false,
                error: 'Impossible de charger les détails',
            }));

            return movie;
        }
    }, []);

    const clearSelection = useCallback(() => {
        setState(current => ({ ...current, selected: null, results: [] }));
    }, []);

    const clearResults = useCallback(() => {
        setState(current => ({ ...current, results: [] }));
    }, []);

    return {
        ...state,
        search,
        selectMovie,
        clearSelection,
        clearResults,
    };
}
