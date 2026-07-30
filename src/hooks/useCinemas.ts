import type {
    Cinema,
    CinemaFilters,
    CinemaScreening,
    CinemaScreeningFilters,
    CinemaScreeningsResponse,
    CreateCinemaScreeningPayload,
    UpdateCinemaScreeningPayload,
    ListCinemaResponse,
    MyCinemaScreeningFilters,
    PaginationLinks,
    PaginationMeta,
} from "../types/cinema";

import {keepPreviousData, useMutation, useQuery, useQueryClient,} from "@tanstack/react-query";
import {createCinemaScreening, deleteCinemaScreening, updateCinemaScreening, getCinemas, getCinemaScreenings, getMyCinemaScreenings,} from "../Api/endpoints/cinemas";

interface UseCinemasResult {
    data:       Cinema[];
    pagination: PaginationMeta |  undefined;
    links:      PaginationLinks | undefined;
    isLoading:                    boolean;
    isFetching:                   boolean;
    isError:                      boolean;
    error:      Error |           null;
}

interface UseCinemaScreeningsResult {
    screenings: CinemaScreening[];
    isLoading:  boolean;
    isFetching: boolean;
    isError:    boolean;
    error:      Error | null;
}

export function useCinemas(
    filters: CinemaFilters = {}
): UseCinemasResult {
    const query = useQuery<
        ListCinemaResponse,
        Error
    >({
        queryKey: [
            "cinemas",
            filters,
        ],

        queryFn: () => getCinemas(filters),

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

export function useCinemaScreenings(
    cinemaId?: number,
    filters: CinemaScreeningFilters = {}
): UseCinemaScreeningsResult {
    const query = useQuery<
        CinemaScreeningsResponse,
        Error
    >({
        queryKey: [
            "cinema-screenings",
            cinemaId,
            filters.from,
            filters.to,
        ],

        queryFn: () => getCinemaScreenings(
            cinemaId!,
            filters
        ),

        enabled: cinemaId !== undefined,

        staleTime: 1000 * 60 * 2,
    });

    return {
        screenings: query.data?.data ?? [],
        isLoading:  query.isLoading,
        isFetching: query.isFetching,
        isError:    query.isError,
        error:      query.error,
    };
}

export function useMyCinemaScreenings(
    filters: MyCinemaScreeningFilters = {}
) {
    const queryClient = useQueryClient();

    const query = useQuery<
        CinemaScreeningsResponse,
        Error
    >({
        queryKey: [
            "my-cinema-screenings",
            filters.date,
            filters.status,
        ],

        queryFn: () => getMyCinemaScreenings(
            filters
        ),

        staleTime: 1000 * 30,
    });

    const addScreening = useMutation({
        mutationFn: (
            data: CreateCinemaScreeningPayload
        ) => createCinemaScreening(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    "my-cinema-screenings",
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "cinema-screenings",
                ],
            });
        },
    });

    const updateScreening = useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: UpdateCinemaScreeningPayload;
        }) => updateCinemaScreening(
            id,
            data
        ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    "my-cinema-screenings",
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "cinema-screenings",
                ],
            });
        },
    });

    const deleteScreening = useMutation({
        mutationFn: (
            id: number
        ) => deleteCinemaScreening(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    "my-cinema-screenings",
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "cinema-screenings",
                ],
            });
        },
    });

    return {
        screenings: query.data?.data ?? [],
        isLoading:  query.isLoading,
        isFetching: query.isFetching,
        isError:    query.isError,
        error:      query.error,
        addScreening,
        updateScreening,
        deleteScreening,
    };
}
