import axiosConfig from '../Api/config.ts';
import type {
    TMDBMovie,
    TMDBMovieResponse,
    TMDBSearchResult,
} from '../types/tmdb.ts';

export const tmdbService = {
    async searchMovies(query: string, page = 1): Promise<TMDBMovie[]> {
        if (! query.trim() || query.trim().length < 2) {
            return [];
        }

        const response = await axiosConfig.get<TMDBSearchResult>(
            '/tmdb/movies/search',
            {
                params: {
                    query: query.trim(),
                    page,
                },
            },
        );

        return response.data.data.slice(0, 8);
    },

    async getMovieDetails(tmdbId: number): Promise<TMDBMovie> {
        const response = await axiosConfig.get<TMDBMovieResponse>(
            `/tmdb/movies/${tmdbId}`,
        );

        return response.data.data;
    },
};
