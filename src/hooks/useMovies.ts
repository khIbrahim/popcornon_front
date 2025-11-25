import { useState, useMemo, useCallback } from "react";
import type { Movie, MovieStatus } from "../types/movie";
import { MOCK_MOVIES } from "../constants/movies";

interface UseMoviesReturn {
    movies: Movie[];
    filteredMovies: Movie[];
    search: string;
    setSearch: (value: string) => void;
    statusFilter: "all" | MovieStatus;
    setStatusFilter: (value: "all" | MovieStatus) => void;
    stats: {
        active: number;
        avgPrice: number;
        totalRuntime: number
    };
    addMovie: (data: Partial<Movie>) => void;
    updateMovie: (id: string, data: Partial<Movie>) => void;
    deleteMovie: (id: string) => void;
    toggleStatus: (id: string) => void;
}

export function useMovies(): UseMoviesReturn {
    const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | MovieStatus>("all");

    const filteredMovies = useMemo(() => {
        return movies.filter((m) => {
            const matchSearch =
                !search ||
                m.title.toLowerCase().includes(search.toLowerCase()) ||
                m.genres?.some(g => g.toLowerCase().includes(search.toLowerCase()));
            const matchStatus = statusFilter === "all" || m.status === statusFilter;
            return matchSearch && matchStatus;
        });
    }, [movies, search, statusFilter]);

    const stats = useMemo(() => ({
        active: movies.filter(m => m.status === "active").length,
        avgPrice: Math.round(movies.reduce((sum, m) => sum + m.price, 0) / (movies.length || 1)),
        totalRuntime: movies.reduce((sum, m) => sum + (m.runtime || 0), 0),
    }), [movies]);

    const addMovie = useCallback((data: Partial<Movie>) => {
        const newMovie: Movie = {
            _id: crypto.randomUUID(),
            tmdbId: data.tmdbId || 0,
            title: data.title || "",
            price: data.price || 0,
            status: data.status || "draft",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...data,
        } as Movie;
        setMovies(prev => [newMovie, ...prev]);
    }, []);

    const updateMovie = useCallback((id: string, data: Partial<Movie>) => {
        setMovies(prev => prev.map(m =>
            m._id === id ? { ...m, ...data, updatedAt: new Date().toISOString() } : m
        ));
    }, []);

    const deleteMovie = useCallback((id: string) => {
        setMovies(prev => prev.filter(m => m._id !== id));
    }, []);

    const toggleStatus = useCallback((id: string) => {
        const nextStatus: Record<MovieStatus, MovieStatus> = {
            draft: "active",
            active: "archived",
            archived: "draft"
        };
        setMovies(prev => prev.map(m =>
            m._id === id ? { ...m, status: nextStatus[m.status] } : m
        ));
    }, []);

    return {
        movies,
        filteredMovies,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        stats,
        addMovie,
        updateMovie,
        deleteMovie,
        toggleStatus,
    };
}