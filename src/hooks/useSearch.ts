import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchAll } from "../Api/endpoints/search";

export function useSearch(query: string) {
    const normalizedQuery = query.trim();

    const searchQuery = useQuery({
        queryKey: ["home-search", normalizedQuery],
        queryFn: () => searchAll(normalizedQuery),
        enabled: normalizedQuery.length >= 2,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    });

    return {
        results: searchQuery.data ?? {
            movies: [],
            cinemas: [],
        },
        isLoading: searchQuery.isFetching,
    };
}