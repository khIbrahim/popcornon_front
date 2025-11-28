import { useState, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";

import DashboardHeader from "../../components/cine/dashboard/DashboardHeader";
import DaySelector from "../../components/cine/dashboard/DaySelector";
import StatsCards from "../../components/cine/dashboard/StatsCards";
import MoviesToolbar from "../../components/cine/dashboard/MoviesToolbar";
import MoviesGrid from "../../components/cine/dashboard/MoviesGrid";
import Modal from "../../components/cine/dashboard/modal/Modal";
import MovieForm from "../../components/cine/dashboard/modal/MovieForm";
import DeleteMovieModal from "../../components/cine/dashboard/modal/DeleteMovieModal";
import Button from "../../components/cine/ui/Button";

import { useMovies } from "../../hooks/useMovies";
import { useNotification } from "../../context/NotificationContext";
import type { Movie } from "../../types/movie";

import { formatDateLocal, getNext7Days } from "../../utils/date";

interface OutletContext {
    openSidebar: () => void;
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

    const {
        filteredMovies,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        addMovie,
        updateMovie,
        deleteMovie,
        toggleStatus,
        isLoading,
    } = useMovies(selectedDate);

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

    const handleSubmitMovie = (data: Omit<Movie, "_id">) => {
        if (editingMovie) {
            updateMovie. mutate(
                { id: editingMovie._id, data },
                {
                    onSuccess: () => {
                        notifySuccess("Séance mise à jour", "Les modifications ont été enregistrées.");
                        closeForm();
                    },
                    onError: () => {
                        notifyError("Erreur", "Impossible de mettre à jour la séance.");
                    },
                }
            );
        } else {
            addMovie.mutate(data, {
                onSuccess: () => {
                    notifySuccess("Séance ajoutée", "La séance a été créée avec succès.");
                    closeForm();
                },
                onError: () => {
                    notifyError("Erreur", "Impossible d'ajouter cette séance.");
                },
            });
        }
    };

    const confirmDeleteMovie = () => {
        if (! movieToDelete) {
            return;
        }

        deleteMovie.mutate(movieToDelete._id, {
            onSuccess: () => {
                notifySuccess("Séance supprimée", "La séance a été retirée.");
                setMovieToDelete(null);
            },
            onError: () => {
                notifyError("Erreur", "Impossible de supprimer la séance.");
            },
        });
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
                                <div key={i} className="aspect-[2/3] rounded-2xl bg-white/5 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <MoviesGrid
                            movies={filteredMovies}
                            activeDropdown={activeDropdown}
                            onDropdownToggle={(id) => setActiveDropdown(activeDropdown === id ?  null : id)}
                            onEdit={handleEditMovie}
                            onToggleStatus={(movie) => toggleStatus. mutate(movie)}
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
                    isLoading={addMovie.isPending || updateMovie.isPending}
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