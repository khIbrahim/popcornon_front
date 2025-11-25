import { useState, useEffect } from "react";
import { useMovies } from "../hooks/useMovies";
import type { Movie } from "../types/movie";

import DashboardSidebar from "../components/cine/dashboard/DashboardSidebar.tsx";
import DashboardHeader from "../components/cine/dashboard/DashboardHeader.tsx";
import StatsCards from "../components/cine/dashboard/StatsCards.tsx";
import MoviesToolbar from "../components/cine/dashboard/MoviesToolbar.tsx";
import MoviesGrid from "../components/cine/dashboard/MoviesGrid.tsx";
import Modal from "../components/cine/dashboard/modal/Modal.tsx";
import MovieForm from "../components/cine/dashboard/modal/MovieForm.tsx";
import DeleteMovieModal from "../components/cine/dashboard/modal/DeleteMovieModal.tsx";

export default function CineDashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
        stats,
        addMovie,
        updateMovie,
        deleteMovie,
        toggleStatus,
    } = useMovies();

    useEffect(() => {
        const handleClick = () => setActiveDropdown(null);
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
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

    const handleSubmitMovie = (data: any) => {
        if (editingMovie) {
            updateMovie(editingMovie._id, data);
        } else {
            addMovie(data);
            console.log(data);
            console.log(data);
            console.log(data);
            console.log(data);
            console.log(data);
        }
        setIsFormOpen(false);
        setEditingMovie(null);
    };

    const confirmDeleteMovie = () => {
        if (movieToDelete) {
            deleteMovie(movieToDelete._id);
            setMovieToDelete(null);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#0a0a0f] text-slate-50">
            <DashboardSidebar isOpen={sidebarOpen} />

            <div className="flex flex-1 flex-col">
                <DashboardHeader
                    title="Mes Films"
                    subtitle="Gérez votre catalogue"
                    onMenuClick={() => setSidebarOpen(prev => !prev)}
                />

                <main className="flex-1 p-4 md:p-6">
                    <div className="mx-auto max-w-7xl space-y-6">
                        <StatsCards stats={stats} />

                        <MoviesToolbar
                            search={search}
                            onSearchChange={setSearch}
                            statusFilter={statusFilter}
                            onStatusChange={setStatusFilter}
                            onAddClick={handleCreateMovie}
                        />

                        <MoviesGrid
                            movies={filteredMovies}
                            activeDropdown={activeDropdown}
                            onDropdownToggle={(id) => setActiveDropdown(activeDropdown === id ? null : id)}
                            onEdit={handleEditMovie}
                            onToggleStatus={(movie) => toggleStatus(movie._id)}
                            onDelete={handleDeleteMovie}
                            onAddClick={handleCreateMovie}
                        />
                    </div>
                </main>
            </div>

            {/* Modal Create / Edit */}
            <Modal
                open={isFormOpen}
                onClose={() => { setIsFormOpen(false); setEditingMovie(null); }}
                title={editingMovie ? "Modifier le film" : "Ajouter un film"}
            >
                <MovieForm
                    initial={editingMovie ?? undefined}
                    onCancel={() => { setIsFormOpen(false); setEditingMovie(null); }}
                    onSubmit={handleSubmitMovie}
                />
            </Modal>

            <DeleteMovieModal
                movie={movieToDelete}
                onClose={() => setMovieToDelete(null)}
                onConfirm={confirmDeleteMovie}
            />
        </div>
    );
}