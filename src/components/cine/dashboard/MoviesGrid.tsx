import { Film, Plus } from "lucide-react";
import Button from "../ui/Button";
import MovieCard from "./MovieCard";
import type { Movie } from "../../../types/movie";

interface Props {
    movies: Movie[];
    activeDropdown: string | null;
    onDropdownToggle: (id: string) => void;
    onEdit: (movie: Movie) => void;
    onToggleStatus: (movie: Movie) => void;
    onDelete: (movie: Movie) => void;
    onAddClick: () => void;
}

export default function MoviesGrid({ movies, activeDropdown, onDropdownToggle, onEdit, onToggleStatus, onDelete, onAddClick }: Props) {
    if (movies.length === 0) {
        return (
            <div className="py-20 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <Film size={32} className="text-slate-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Aucun film trouvé</h3>
                <p className="text-sm text-slate-500 mb-4">Ajoutez votre premier film pour commencer</p>
                <Button onClick={onAddClick}>
                    <Plus size={16} />
                    Ajouter un film
                </Button>
            </div>
        );
    }

    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    isDropdownOpen={activeDropdown === movie._id}
                    onDropdownToggle={() => onDropdownToggle(movie._id)}
                    onEdit={() => onEdit(movie)}
                    onToggleStatus={() => onToggleStatus(movie)}
                    onDelete={() => onDelete(movie)}
                />
            ))}
        </div>
    );
}