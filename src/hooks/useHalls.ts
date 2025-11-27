import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCinemaHalls, updateCinemaHalls } from "../Api/endpoints/cinemas";
import { useEffect, useState } from "react";
import type { CinemaHall } from "../types/halls";

export function useHalls() {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["halls"],
        queryFn: getCinemaHalls,
        staleTime: 1000 * 60 * 5,
    });

    const [halls, setHalls] = useState<CinemaHall[] | null>(null);

    useEffect(() => {
        if (data?.data) {
            setHalls(data.data);
        }
    }, [data]);

    const mutation = useMutation({
        mutationFn: (updatedHalls: CinemaHall[]) =>
            updateCinemaHalls(updatedHalls),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["halls"] });
        },
    });

    const save = (hallsToSave: CinemaHall[]) => {
        mutation.mutate(hallsToSave);
    };

    return {
        halls,
        setHalls,
        isLoading,
        error,
        save,
        isSaving: mutation.isPending,
    };
}