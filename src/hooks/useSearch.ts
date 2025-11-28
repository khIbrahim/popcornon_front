import { useQuery } from "@tanstack/react-query";
import { searchAll } from "../Api/endpoints/search";

export function useSearch(query: string) {
    const { data, isLoading } = useQuery({
        queryKey: ["search", query],
        queryFn: () => searchAll(query),
        enabled: query.length >= 2,
        staleTime: 1000 * 60,
    });

    return {
        results: data ??  { movies: [], cinemas: [] },
        isLoading,
    };
}