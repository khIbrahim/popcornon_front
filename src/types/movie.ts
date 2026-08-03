import type { TMDBMovie } from './tmdb.ts';

export type MovieStatus = 'active' | 'draft' | 'archived';

export interface Movie {
    _id: string;
    tmdbId: number;
    title: string;
    originalTitle?: string;
    overview?: string;
    poster?: string | null;
    backdrop?: string | null;
    releaseDate?: string;
    runtime?: number;
    genres?: string[];
    voteAverage?: number;
    status: MovieStatus;
    createdAt: string;
    updatedAt: string;
    price: number;
    date: string;
    time: string;
    hall: string;
}

export interface MovieFormData {
    price: number;
    date: string;
    time: string;
    hall: string;
    status: MovieStatus;
}

export function createMovieFromTMDB(
    movie: TMDBMovie,
    formData: MovieFormData,
): Omit<Movie, '_id'> {
    return {
        tmdbId: movie.tmdbId,
        title: movie.title,
        originalTitle: movie.originalTitle,
        overview: movie.overview ?? undefined,
        poster: movie.poster,
        backdrop: null,
        releaseDate: movie.releaseDate ?? undefined,
        runtime: movie.runtime ?? undefined,
        genres: movie.genres,
        voteAverage: movie.voteAverage ?? undefined,
        status: formData.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        price: formData.price,
        date: formData.date,
        time: formData.time,
        hall: formData.hall,
    };
}

export function createTmdbFromMovie(movie: Movie): TMDBMovie {
    return {
        tmdbId: movie.tmdbId,
        title: movie.title,
        originalTitle: movie.originalTitle || '',
        overview: movie.overview || null,
        poster: movie.poster || null,
        posterPath: movie.poster || null,
        releaseDate: movie.releaseDate || null,
        voteAverage: movie.voteAverage ?? null,
        runtime: movie.runtime ?? null,
        genres: movie.genres || [],
    };
}
