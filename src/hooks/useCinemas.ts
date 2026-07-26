import type {Cinema, CinemaFilters, ListCinemaResponse} from "../types/cinema.ts";
import {useQuery} from "@tanstack/react-query";
import {getCinemas} from "../Api/endpoints/cinemas.ts";
import type {PublicCinema} from "../types/publicCinema.ts";

export function useCinemas(filters: CinemaFilters)
{
    const query = useQuery<ListCinemaResponse>({
        queryKey: ["cinemas", filters],
        queryFn:  () => getCinemas(filters),
        staleTime: 1000 * 60 * 5,
    });

    return {
        data:       query.data?.data as Cinema[] | undefined,
        pagination: query.data?.pagination,
        isLoading:  query.isLoading,
        isError:    query.isError,
    };
}