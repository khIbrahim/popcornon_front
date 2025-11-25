import { Trash2 } from "lucide-react";
import Modal from "./Modal";
import Button from "../../ui/Button";
import type { Movie } from "../../../../types/movie";

interface Props {
    movie: Movie | null;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteMovieModal({ movie, onClose, onConfirm }: Props) {
    return (
        <Modal open={!!movie} onClose={onClose} title="Supprimer ce film ?">
            <div className="flex gap-4">
                {movie?.poster && (
                    <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                        alt={movie.title}
                        className="w-24 h-36 object-cover rounded-lg"
                    />
                )}
                <div>
                    <p className="text-white font-semibold mb-2">{movie?.title}</p>
                    <p className="text-sm text-slate-400">
                        Cette action est irréversible. Le film sera supprimé de votre catalogue.
                    </p>
                </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
                <Button variant="ghost" onClick={onClose}>Annuler</Button>
                <Button variant="destructive" onClick={onConfirm}>
                    <Trash2 size={16} />
                    Supprimer
                </Button>
            </div>
        </Modal>
    );
}