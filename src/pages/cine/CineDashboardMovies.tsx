import { useState, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import axios from "axios";

import DashboardHeader from "../../components/cine/dashboard/DashboardHeader";
import DaySelector from "../../components/cine/dashboard/DaySelector";
import StatsCards from "../../components/cine/dashboard/StatsCards";
import MoviesToolbar from "../../components/cine/dashboard/MoviesToolbar";
import MoviesGrid from "../../components/cine/dashboard/MoviesGrid";
import Modal from "../../components/cine/dashboard/modal/Modal";
import MovieForm from "../../components/cine/dashboard/modal/MovieForm";
import DeleteMovieModal from "../../components/cine/dashboard/modal/DeleteMovieModal";
import Button from "../../components/cine/ui/Button";

import { useMyCinemaScreenings } from "../../hooks/useCinemas";
import { useNotification } from "../../context/NotificationContext";
import type { Movie, MovieStatus } from "../../types/movie";
import type {
    CreateCinemaScreeningPayload,
    UpdateCinemaScreeningPayload,
} from "../../types/cinema";

import { formatDateLocal, getNext7Days } from "../../utils/date";

interface OutletContext {
    openSidebar: () => void;
}

interface ApiErrorResponse {
    message?: string;
    errors?: Record<string, string[]>;
}

function getApiErrorMessage(error: unknown): string {
    if (! axios.isAxiosError<ApiErrorResponse>(error)) {
        return "Impossible d'ajouter cette séance.";
    }

    const validationMessage = Object.values(error.response?.data?.errors ?? {})
        .flat()
        .at(0);

    return validationMessage
        ?? error.response?.data?.message
        ?? "Impossible d'ajouter cette séance.";
}

export default function CineDashboardMovies() {
    const { openSidebar } = useOutletContext<OutletContext>();
    const { notifySuccess, notifyError } = useNotification();

    const [selectedDate, setSelectedDate] = useState<string>(() => formatDateLocal(new Date()));
    const days = useMemo(() => getNext7Days(), []);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
    const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | MovieStatus>("all");

    const {
        screenings,
        addScreening,
        updateScreening,
        deleteScreening,
        isLoading,
    } = useMyCinemaScreenings({ date: selectedDate });

    const filteredMovies = useMemo<Movie[]>(() => {
        return screenings
            .map((screening): Movie => ({
                _id: String(screening.id),
                tmdbId: screening.movie.id ?? screening.movie._id ?? 0,
                title: screening.movie.title,
                overview: screening.movie.overview ?? undefined,
                poster: screening.movie.poster ?? null,
                runtime: screening.movie.runtime,
                genres: screening.movie.genres,
                voteAverage: screening.movie.voteAverage ?? 0,
                status: screening.status === "draft"
                    ? "draft"
                    : screening.status === "active"
                        ? "active"
                        : "archived",
                createdAt: "",
                updatedAt: "",
                price: Number(screening.price),
                date: screening.startsAt.slice(0, 10),
                time: screening.startsAt.slice(11, 16),
                hall: screening.hall.name,
            }))
            .filter((movie) => {
                const matchesSearch = movie.title
                    .toLocaleLowerCase("fr-FR")
                    .includes(search.trim().toLocaleLowerCase("fr-FR"));
                const matchesStatus = statusFilter === "all" || movie.status === statusFilter;

                return matchesSearch && matchesStatus;
            });
    }, [screenings, search, statusFilter]);

    const stats = useMemo(() => {
        const activeMovies = filteredMovies.filter(m => m.status === "active");
        return {
            total: filteredMovies.length,
            active: activeMovies.length,
            avgPrice: activeMovies. length > 0 ? Math.round(activeMovies.reduce((sum, m) => sum + (m.price || 0), 0) / activeMovies. length) : 0,
            totalRuntime: activeMovies.reduce((sum, m) => sum + (m.runtime || 0), 0),
        };
    }, [filteredMovies]);

    useEffect(() => {
        const handleClick = () => setActiveDropdown(null);
        document.addEventListener("click", handleClick);
        return () => document. removeEventListener("click", handleClick);
    }, []);

    const handleCreateMovie = () => {
        setEditingMovie(null);
        setIsFormOpen(true);
    };

    const handleEditMovie = (movie: Movie) => {
        setEditingMovie(movie);
        setIsFormOpen(true);
        setActiveDropdown(null);
    };

    const handleDeleteMovie = (movie: Movie) => {
        setMovieToDelete(movie);
        setActiveDropdown(null);
    };

    const handleSubmitMovie = (data: CreateCinemaScreeningPayload) => {
        if (! editingMovie) {
            addScreening.mutate(data, {
                onSuccess: () => {
                    notifySuccess("Séance ajoutée", "La séance a été créée avec succès.");
                    closeForm();
                },
                onError: (error) => {
                    notifyError("Erreur", getApiErrorMessage(error));
                },
            });

            return;
        }

        const screening = screenings.find(
            (item) => item.id === Number(editingMovie._id)
        );

        if (! screening) {
            notifyError("Erreur", "La séance est introuvable.");
            return;
        }

        const movieId = screening.movie.id
            ?? screening.movie._id;

        if (! movieId) {
            notifyError("Erreur", "L'identifiant du film est introuvable.");
            return;
        }

        const updateData: UpdateCinemaScreeningPayload = {
            movie_id: movieId,
            cinema_hall_id: data.cinema_hall_id,
            starts_at: data.starts_at,
            price: data.price,
            status: data.status,
        };

        updateScreening.mutate(
            {
                id: screening.id,
                data: updateData,
            },
            {
                onSuccess: () => {
                    notifySuccess("Séance modifiée", "Les modifications ont été enregistrées.");
                    closeForm();
                },
                onError: (error) => {
                    notifyError("Erreur", getApiErrorMessage(error));
                },
            }
        );
    };

    const confirmDeleteMovie = () => {
        if (! movieToDelete) {
            return;
        }

        deleteScreening.mutate(
            Number(movieToDelete._id),
            {
                onSuccess: () => {
                    notifySuccess("Séance supprimée", "La séance a bien été supprimée.");
                    setMovieToDelete(null);
                },
                onError: (error) => {
                    notifyError("Erreur", getApiErrorMessage(error));
                },
            }
        );
    };

    const handleToggleStatus = (movie: Movie) => {
        const nextStatus = movie.status === "active"
            ? "draft"
            : "active";

        updateScreening.mutate(
            {
                id: Number(movie._id),
                data: {
                    status: nextStatus,
                },
            },
            {
                onSuccess: () => {
                    notifySuccess(
                        "Statut modifié",
                        nextStatus === "active"
                            ? "La séance est maintenant active."
                            : "La séance est maintenant en brouillon."
                    );
                },
                onError: (error) => {
                    notifyError("Erreur", getApiErrorMessage(error));
                },
            }
        );
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingMovie(null);
    };

    const selectedDateLabel = useMemo(() => {
        const date = new Date(selectedDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date.getTime() === today.getTime()) {
            return "Aujourd'hui";
        }

        const tomorrow = new Date(today);
        tomorrow. setDate(tomorrow. getDate() + 1);
        if (date.getTime() === tomorrow.getTime()) {
            return "Demain";
        }

        return date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "short" });
    }, [selectedDate]);

    return (
        <>
            <DashboardHeader
                title="Films & Séances"
                subtitle={selectedDateLabel}
                onMenuClick={openSidebar}
                actions={
                    <Button onClick={handleCreateMovie} className="hidden sm:flex">
                        <Plus size={16} />
                        Nouvelle séance
                    </Button>
                }
            />

            <div className="flex-1 p-4 md:p-6 overflow-auto">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* Calendrier 7 jours */}
                    <DaySelector
                        days={days}
                        selectedDate={selectedDate}
                        onSelect={setSelectedDate}
                    />

                    {/* Stats du jour */}
                    <StatsCards stats={stats} selectedDate={selectedDateLabel} />

                    {/* Toolbar */}
                    <MoviesToolbar
                        search={search}
                        onSearchChange={setSearch}
                        statusFilter={statusFilter}
                        onStatusChange={setStatusFilter}
                        onAddClick={handleCreateMovie}
                    />

                    {/* Grille */}
                    {isLoading ? (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {[... Array(4)].map((_, i) => (
                                <div key={i} className="aspect-2/3 rounded-2xl bg-white/5 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <MoviesGrid
                            movies={filteredMovies}
                            activeDropdown={activeDropdown}
                            onDropdownToggle={(id) => setActiveDropdown(activeDropdown === id ?  null : id)}
                            onEdit={handleEditMovie}
                            onToggleStatus={handleToggleStatus}
                            onDelete={handleDeleteMovie}
                            onAddClick={handleCreateMovie}
                        />
                    )}
                </div>
            </div>

            {/* Mobile FAB */}
            <button
                onClick={handleCreateMovie}
                className="fixed bottom-6 right-6 sm:hidden w-14 h-14 rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
                <Plus size={24} />
            </button>

            {/* Modal Form */}
            <Modal
                open={isFormOpen}
                onClose={closeForm}
                title={editingMovie ? "Modifier la séance" : "Nouvelle séance"}
            >
                <MovieForm
                    initial={editingMovie ??  undefined}
                    onCancel={closeForm}
                    onSubmit={handleSubmitMovie}
                    isLoading={
                        addScreening.isPending
                        || updateScreening.isPending
                    }
                    defaultDate={selectedDate}
                />
            </Modal>

            {/* Modal Delete */}
            <DeleteMovieModal
                movie={movieToDelete}
                onClose={() => setMovieToDelete(null)}
                onConfirm={confirmDeleteMovie}
            />
        </>
    );
}
