import type {
    Cinema,
    CinemaFilters,
    ListCinemaResponse,
    PaginationLinks,
    PaginationMeta,
} from "../types/cinema";

import {
    keepPreviousData,
    useQuery,
} from "@tanstack/react-query";

import { getCinemas } from "../Api/endpoints/cinemas";

interface UseCinemasResult {
    data:       Cinema[];
    pagination: PaginationMeta | undefined;
    links:      PaginationLinks | undefined;
    isLoading:  boolean;
    isFetching: boolean;
    isError:    boolean;
    error:      Error | null;
}

export function useCinemas(filters: CinemaFilters = {}): UseCinemasResult
{
    const query = useQuery<ListCinemaResponse, Error>({
        queryKey:        ["cinemas", filters],
        queryFn:         () => getCinemas(filters),
        placeholderData: keepPreviousData,

        staleTime: 1000 * 60 * 5,
    });

    return {
        data:       query.data?.data ?? [],
        pagination: query.data?.meta,
        links:      query.data?.links,
        isLoading:  query.isLoading,
        isFetching: query.isFetching,
        isError:    query.isError,
        error:      query.error,
    };
}