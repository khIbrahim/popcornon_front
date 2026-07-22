import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {getCinemaHalls, createCinemaHall, updateCinemaHall, deleteCinemaHall,} from "../Api/endpoints/cinemas";
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

    const createMutation = useMutation({
        mutationFn: createCinemaHall,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["halls"] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateCinemaHall,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["halls"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCinemaHall,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["halls"] });
        },
    });

    const create = (hall: Omit<CinemaHall, "id">) => {
        createMutation.mutate(hall);
    };

    const update = (hall: CinemaHall) => {
        updateMutation.mutate(hall);
    };

    const remove = (id: number) => {
        deleteMutation.mutate(id);
    };

    return {
        halls,
        setHalls,
        isLoading,
        error,

        create,
        update,
        remove,

        isSaving:
            createMutation.isPending ||
            updateMutation.isPending ||
            deleteMutation.isPending,
    };
}