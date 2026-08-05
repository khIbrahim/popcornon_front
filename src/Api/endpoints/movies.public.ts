import axiosConfig from "../config";

export interface ProgramScreening {
    id: number;
    starts_at: string;
    ends_at: string;
    price: string;
    cinema: {
        id: number;
        name: string;
        city: string;
        wilaya: string;
    };
    hall: {
        id: number;
        name: string;
        type: string;
    };
}

export interface PublicMovie {
    tmdb_id: number;
    title: string;
    poster: string | null;
    runtime: number | null;
    genres: string[];
    screenings: ProgramScreening[];

    // Champs optionnels conservés pour les composants publics existants.
    _id?: string;
    tmdbId?: number;
    backdrop?: string | null;
    voteAverage?: number | null;
    releaseDate?: string | null;
    overview?: string | null;
    price?: number;
    time?: string;
    hall?: string;
    date?: string;
}

// Ancien contrat conservé : il est encore utilisé par useMovieDetail().
export interface MovieScreening {
    _id: string;
    cinema: {
        _id: string;
        name: string;
        city: string;
        wilaya: string;
    };
    date: string;
    time: string;
    hall: string;
    price: number;
}

interface MoviesResponse {
    success: boolean;
    data: PublicMovie[];
}

interface MovieDetailResponse {
    success: boolean;
    data: PublicMovie;
    screenings: MovieScreening[];
}

export async function getPublicMovies(filters?: {
    genre?: string;
    wilaya?: string;
    date?: string;
}): Promise<MoviesResponse> {
    const date = filters?.date ?? new Date().toISOString().slice(0, 10);

    const res = await axiosConfig.get<MoviesResponse>("/screenings/program", {
        params: {
            date,
        },
    });

    return res.data;
}

export async function getMovieWithScreenings(movieId: string): Promise<MovieDetailResponse> {
    const res = await axiosConfig.get<MovieDetailResponse>(`/public/movies/${movieId}`);

    return res.data;
}
