import { useQuery } from "@tanstack/react-query";
import {
    getPublicCinemas,
    getPublicCinemaById,
    getPublicCinemaByName,
    searchPublicCinemas,
} from "../Api/endpoints/publicCinemas";
import type {
    PublicCinema,
    PublicCinemasListResponse,
    PublicCinemaDetailResponse,
} from "../types/publicCinema";

export function usePublicCinemas(filters?: {
    wilaya?: string;
    city?: string;
    q?: string;
}) {
    const query = useQuery<PublicCinemasListResponse>({
        queryKey: ["public-cinemas", filters],
        queryFn: () => getPublicCinemas(filters),
        staleTime: 1000 * 60 * 5,
    });

    return {
        data: query.data?.data as PublicCinema[] | undefined,
        pagination: query.data?.pagination,
        isLoading: query.isLoading,
        isError: query.isError,
    };
}

export function usePublicCinemaById(cinemaId?: string) {
    const query = useQuery<PublicCinemaDetailResponse>({
        queryKey: ["public-cinema", cinemaId],
        queryFn: () => getPublicCinemaById(cinemaId!),
        enabled: !!cinemaId,
        staleTime: 1000 * 60 * 5,
    });

    return {
        cinema: query.data?.data,
        screenings: query.data?.screenings ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
    };
}

export function usePublicCinemaByName(name?: string) {
    const query = useQuery<PublicCinemaDetailResponse>({
        queryKey: ["public-cinema-by-name", name],
        queryFn: () => getPublicCinemaByName(name!),
        enabled: !!name,
        staleTime: 1000 * 60 * 5,
    });

    return {
        cinema: query.data?.data,
        screenings: query.data?.screenings ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
    };
}

export function useSearchPublicCinemas(term: string) {
    const query = useQuery({
        queryKey: ["public-cinemas-search", term],
        queryFn: () => searchPublicCinemas(term),
        enabled: term.trim().length >= 2,
        staleTime: 1000 * 60 * 2,
    });

    return {
        results: query.data?.data ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
    };
}
