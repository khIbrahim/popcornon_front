import { useQuery } from "@tanstack/react-query";
import { getPublicMovies, getMovieWithScreenings } from "../Api/endpoints/movies.public";

export function usePublicMovies(filters?: { genre?: string; wilaya?: string }) {
    return useQuery({
        queryKey: ["public-movies", filters],
        queryFn: () => getPublicMovies(filters),
        staleTime: 1000 * 60 * 5,
    });
}

export function useMovieDetail(movieId: string | null) {
    return useQuery({
        queryKey: ["movie-detail", movieId],
        queryFn: () => getMovieWithScreenings(movieId!),
        enabled: !!movieId,
    });
}