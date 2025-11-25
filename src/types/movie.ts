import type {TMDBMovie} from "./tmdb.ts";

export type MovieStatus = "active" | "draft" | "archived";

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

export function createMovieFromTMDB(movie: TMDBMovie, formData: MovieFormData): Omit<Movie, '_id'> {
    return {
        tmdbId: movie. id,
        title: movie.title,
        originalTitle: movie.original_title,
        overview: movie.overview,
        poster: movie.poster_path,
        backdrop: movie.backdrop_path,
        releaseDate: movie.release_date,
        runtime: movie.runtime,
        genres: movie. genres?.map(g => g.name) || [],
        voteAverage: movie.vote_average,
        status: formData.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        price: formData. price,
        date: formData.date,
        time: formData.time,
        hall: formData.hall,
    };
}

export function createTmdbFromMovie(
    movie: Movie,
): TMDBMovie {
    return {
        id: movie.tmdbId,
        title: movie.title,
        original_title: movie.originalTitle || "",
        overview: movie.overview || "",
        poster_path: movie.poster || null,
        backdrop_path: movie.backdrop || null,
        release_date: movie.releaseDate || "",
        vote_average: movie.voteAverage || 0,
        vote_count: 0,
        genre_ids: [],
        runtime: movie.runtime,
        genres: movie.genres?.map((name, index) => ({id: index, name})) || [],
    };
}