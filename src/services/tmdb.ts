import type { TMDBMovie, TMDBSearchResult } from '../types/tmdb.ts';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string | null, size = 'w500') => {
    if (!path) return null;
    return `${IMAGE_BASE}/${size}${path}`;
};

export const tmdbService = {
    async searchMovies(query: string): Promise<TMDBMovie[]> {
        if (! query.trim() || query.length < 2) {
            return [];
        }

        const url = new URL(`${BASE_URL}/search/movie`);
        url.searchParams.set('api_key', API_KEY);
        url.searchParams.set('query', query);
        url.searchParams.set('language', 'fr-FR');
        url.searchParams.set('region', 'DZ');
        url.searchParams.set('include_adult', 'true');

        const response = await fetch(url.toString());
        if (!response.ok) throw new Error('Erreur de recherche TMDB');

        const data: TMDBSearchResult = await response.json();
        return data.results.slice(0, 8);
    },

    async getMovieDetails(id: number): Promise<TMDBMovie> {
        const url = new URL(`${BASE_URL}/movie/${id}`);
        url.searchParams.set('api_key', API_KEY);
        url.searchParams.set('language', 'fr-FR');

        const response = await fetch(url.toString());
        if (!response.ok) throw new Error('Film non trouvé');

        return response.json();
    },

    async getPopularMovies(): Promise<TMDBMovie[]> {
        const url = new URL(`${BASE_URL}/movie/popular`);
        url.searchParams.set('api_key', API_KEY);
        url.searchParams.set('language', 'fr-FR');
        url.searchParams.set('region', 'DZ');

        const response = await fetch(url.toString());
        if (!response.ok) throw new Error('Erreur TMDB');

        const data: TMDBSearchResult = await response.json();
        return data.results.slice(0, 10);
    },
};