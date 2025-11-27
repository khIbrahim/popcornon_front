import type { DayHours, DayKey, WeekHours } from "../types/openingHours";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getCinemaOpeningHours,
    updateCinemaOpeningHours,
} from "../Api/endpoints/cinemas";
import {useState, useEffect} from "react";

export function useOpeningHours() {
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["openingHours"],
        queryFn: getCinemaOpeningHours,
        staleTime: 1000 * 60 * 5,
    });

    const [hours, setHours] = useState<WeekHours | null>(null);
    useEffect(() => {
        if(data?.data && ! hours){
            setHours(data.data);
        }
    }, [data]);

    const mutation = useMutation({
        mutationFn: (newHours: WeekHours) => updateCinemaOpeningHours(newHours),

        onMutate: async (newHours: WeekHours) => {
            await queryClient.cancelQueries({
                queryKey: ["openingHours"]
            });

            const previous = queryClient.getQueryData<{ success: boolean; data: WeekHours }>([
                "openingHours",
            ]);

            queryClient.setQueryData(["openingHours"], {
                success: true,
                data: newHours,
            });

            return { previous };
        },

        onError: (_err, _newHours, ctx) => {
            if (ctx?.previous) {
                queryClient.setQueryData(["openingHours"], ctx.previous);
            }
        },

        onSettled: () => queryClient.invalidateQueries({ queryKey: ["openingHours"] })
    });

    const updateDay = (
        day: DayKey,
        field: keyof DayHours,
        value: string | boolean
    ) => {
        setHours(prev => ({
            ...prev!,
            [day]: {
                ...prev![day],
                [field]: value,
            }
        }));
    };

    const save = () => {
        mutation.mutate(hours!);
    }

    return {
        hours,
        isLoading,
        error,
        updateDay,
        isUpdating: mutation.isPending,
        save,
    };
}
