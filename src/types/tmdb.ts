export interface TMDBMovie {
    tmdbId: number;
    title: string;
    originalTitle: string;
    overview: string | null;
    poster: string | null;
    posterPath: string | null;
    releaseDate: string | null;
    voteAverage: number | null;
    runtime: number | null;
    genres: string[];
}

export interface TMDBSearchResult {
    data: TMDBMovie[];
    meta: {
        page: number;
        totalPages: number;
        totalResults: number;
    };
}

export interface TMDBMovieResponse {
    data: TMDBMovie;
}
