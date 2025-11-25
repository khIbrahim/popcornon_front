import {ChevronRight, Star, Ticket} from "lucide-react";

interface Movie {
    id: number;
    title: string;
    genre: string;
    rating: number;
    image: string;
}

const mockMovies: Movie[] = [
    { id: 1, title: "Héliopolis", genre: "Drame/Historique", rating: 4.8, image: "https://placehold.co/300x450/1a1a1a/FFF?text=Héliopolis" },
    { id: 2, title: "Oppenheimer", genre: "Biopic/Thriller", rating: 4.9, image: "https://placehold.co/300x450/1a1a1a/FFF?text=Oppenheimer" },
    { id: 3, title: "Barbie", genre: "Comédie", rating: 4.5, image: "https://placehold.co/300x450/1a1a1a/FFF?text=Barbie" },
    { id: 4, title: "Dune: Part Two", genre: "Sci-Fi", rating: 4.9, image: "https://placehold.co/300x450/1a1a1a/FFF?text=Dune+2" },
];

const MoviesSection = () => (
    <section id="films" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-extrabold text-white">À l'affiche cette semaine</h2>
                    <p className="mt-2 text-gray-400">Les meilleurs films disponibles dans les salles algériennes.</p>
                </div>
                <a href="#" className="hidden md:flex items-center text-red-500 hover:text-red-400 font-medium transition-colors">
                    Voir tout le catalogue <ChevronRight size={20} />
                </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {mockMovies.map((movie) => (
                    <div key={movie.id} className="group relative bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2">
                        <div className="aspect-[2/3] w-full overflow-hidden relative">
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md flex items-center text-yellow-400 text-sm font-bold">
                                <Star size={14} className="mr-1 fill-yellow-400" /> {movie.rating}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-white truncate">{movie.title}</h3>
                            <p className="text-sm text-gray-400 mb-4">{movie.genre}</p>
                            <button className="w-full bg-slate-800 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group-hover:bg-red-600">
                                <Ticket size={18} />
                                Réserver
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 md:hidden text-center">
                <a href="#" className="inline-flex items-center text-red-500 font-medium">
                    Voir tout le catalogue <ChevronRight size={20} />
                </a>
            </div>
        </div>
    </section>
);

export default MoviesSection;