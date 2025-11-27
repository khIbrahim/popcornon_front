import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import type { Movie, MovieStatus } from "../types/movie";
import {
    createMovie as createMovieApi,
    deleteMovie as deleteMovieApi,
    getMyMovies,
    updateMovie as updateMovieApi,
    archiveExpiredMovies,
} from "../Api/endpoints/movies";
import {useNotification} from "../context/NotificationContext.tsx";

export function useMovies(selectedDate?: string) {
    const queryClient = useQueryClient();

    const [search, setSearch] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<MovieStatus | "all">("all");
    const {notifySuccess} = useNotification()

    const moviesQuery = useQuery({
        queryKey: ["movies", selectedDate, statusFilter],
        queryFn: () => getMyMovies({
            date: selectedDate,
            status: statusFilter !== "all" ? statusFilter : undefined
        }),
        staleTime: 1000 * 30,
        retry: 1,
    });

    useEffect(() => {
        const autoArchive = async () => {
            try {
                await archiveExpiredMovies();
                queryClient.invalidateQueries({ queryKey: ["movies"] });
            } catch (error) {
                console.error("Erreur auto-archive:", error);
            }
        };

        autoArchive();
    }, []);

    const addMovie = useMutation({
        mutationFn: (data: Omit<Movie, "_id">) => createMovieApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["movies"] });
            notifySuccess("Film ajouté avec succès")
        },
    });

    const updateMovie = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Movie> }) =>
            updateMovieApi(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["movies"] });
            notifySuccess("Film modifié avec succès")
        },
    });

    const deleteMovie = useMutation({
        mutationFn: (id: string) => deleteMovieApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["movies"] });
        },
    });

    const toggleStatus = useMutation({
        mutationFn: (movie: Movie) => {
            const nextStatus: Record<MovieStatus, MovieStatus> = {
                draft: "active",
                active: "archived",
                archived: "draft",
            };
            return updateMovieApi(movie._id, { status: nextStatus[movie.status] });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["movies"] });
            notifySuccess("Film toggle avec succès")
        },
    });

    const movies = moviesQuery.data?.data ?? [];

    const filteredMovies = useMemo(() => {
        if (! search.trim()) {
            return movies;
        }

        const term = search.toLowerCase();
        return movies.filter((m) =>
            m.title.toLowerCase().includes(term) ||
            m.genres?.some((g) => g.toLowerCase().includes(term)) ||
            m.hall?.toLowerCase().includes(term)
        );
    }, [movies, search]);

    const stats = useMemo(() => {
        const activeMovies = movies.filter((m) => m.status === "active");
        return {
            total: movies.length,
            active: activeMovies.length,
            avgPrice: activeMovies.length > 0
                ? Math.round(activeMovies.reduce((s, m) => s + (m.price || 0), 0) / activeMovies.length)
                : 0,
            totalRuntime: movies.reduce((s, m) => s + (m.runtime || 0), 0),
        };
    }, [movies]);

    return {
        movies,
        filteredMovies,

        search,
        setSearch,
        statusFilter,
        setStatusFilter,

        stats,

        isLoading: moviesQuery.isLoading,
        isError: moviesQuery.isError,
        error: moviesQuery.error,

        addMovie,
        updateMovie,
        deleteMovie,
        toggleStatus,
    };
}