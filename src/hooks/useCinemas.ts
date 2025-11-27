import { useQuery } from "@tanstack/react-query";
import { getCinemas, getCinemaById, getCinemaScreenings } from "../Api/endpoints/cinemas";

export function useCinemas(filters?: { wilaya?: string; city?: string }) {
    return useQuery({
        queryKey: ["cinemas", filters],
        queryFn: () => getCinemas(filters),
        staleTime: 1000 * 60 * 5,
    });
}

export function useCinema(id: string) {
    return useQuery({
        queryKey: ["cinema", id],
        queryFn: () => getCinemaById(id),
        enabled: !!id,
    });
}

export function useCinemaScreenings(cinemaId: string, date?: string) {
    return useQuery({
        queryKey: ["cinema-screenings", cinemaId, date],
        queryFn: () => getCinemaScreenings(cinemaId, date),
        enabled: !!cinemaId,
    });
}