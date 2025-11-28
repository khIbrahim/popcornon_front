import axiosConfig from "../config";

export interface PublicMovie {
    _id: string;
    tmdbId: number;
    title: string;
    poster: string;
    backdrop: string;
    runtime: number;
    voteAverage: number;
    genres: string[];
    releaseDate: string;
    overview: string;
    price?: number;
    time?: string;
    hall?: string;
    date?: string;
}

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
    count: number;
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
    const params = new URLSearchParams();
    if (filters?.genre) params.append("genre", filters.genre);
    if (filters?.wilaya) params.append("wilaya", filters.wilaya);
    if (filters?.date) params.append("date", filters.date);

    const res = await axiosConfig.get<MoviesResponse>(`/public/movies?${params}`);
    return res. data;
}

export async function getMovieWithScreenings(movieId: string): Promise<MovieDetailResponse> {
    const res = await axiosConfig. get<MovieDetailResponse>(`/public/movies/${movieId}`);
    return res.data;
}