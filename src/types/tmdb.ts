// ============================================
// TMDB API Types
// ============================================
export interface TMDBMovie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    runtime?: number;
    genres?: { id: number; name: string }[];
}

export interface TMDBSearchResult {
    page: number;
    results: TMDBMovie[];
    total_pages: number;
    total_results: number;
}