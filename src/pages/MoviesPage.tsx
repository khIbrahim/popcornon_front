import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieModal from "../components/movies/MovieModal";
import DaySelector from "../components/movies/DaySelector.tsx";
import MoviesPageHeader from "../components/movies/MoviesPageHeader.tsx";
import MoviesFilters from "../components/movies/MoviesFilters.tsx";
import MoviesGrid from "../components/movies/MoviesGrid.tsx";
import { usePublicMovies } from "../hooks/usePublicMovies";
import { formatDateLocal, getNext7Days } from "../utils/date";
import type { PublicMovie } from "../Api/endpoints/movies.public";

const GENRES = [
    "Tous",
    "Action",
    "Comédie",
    "Drame",
    "Horreur",
    "Science-Fiction",
    "Thriller",
];

export default function MoviesPage() {
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("Tous");
    const [selectedDate, setSelectedDate] = useState(() =>
        formatDateLocal(new Date())
    );
    const [selectedMovie, setSelectedMovie] = useState<PublicMovie | null>(null);

    const days = useMemo(() => getNext7Days(), []);

    const { data, isLoading } = usePublicMovies({
        date: selectedDate,
        genre: genre !== "Tous" ? genre : undefined,
    });

    const movies = data?.data ?? [];

    const filteredMovies = useMemo(() => {
        if (! search.trim()) {
            return movies;
        }
        return movies.filter((m) =>
            m.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [movies, search]);

    const dateLabel = useMemo(() => {
        const date = new Date(selectedDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date.getTime() === today.getTime()) return "Aujourd'hui";
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        if (date.getTime() === tomorrow.getTime()) return "Demain";
        return date.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "short",
        });
    }, [selectedDate]);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white">
            <Navbar />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <MoviesPageHeader
                        dateLabel={dateLabel}
                        movieCount={filteredMovies.length}
                    />

                    {/* Calendar */}
                    <DaySelector
                        days={days}
                        selectedDate={selectedDate}
                        onSelect={setSelectedDate}
                    />

                    {/* Filters */}
                    <MoviesFilters
                        search={search}
                        setSearch={setSearch}
                        genre={genre}
                        setGenre={setGenre}
                        genres={GENRES}
                    />

                    {/* Grid */}
                    <MoviesGrid
                        isLoading={isLoading}
                        movies={filteredMovies}
                        onMovieClick={setSelectedMovie}
                    />
                </div>
            </main>

            {/* Modal */}
            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}

            <Footer />
        </div>
    );
}

