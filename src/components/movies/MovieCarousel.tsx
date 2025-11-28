import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { usePublicMovies } from "../../hooks/usePublicMovies";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal.tsx";
import type {PublicMovie} from "../../Api/endpoints/movies.public.ts";

interface Props {
    limit?: number;
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

export default function MovieCarousel({
    limit = 10,
    autoPlay = true,
    autoPlayInterval = 4000
}: Props) {
    const navigate                 = useNavigate();
    const { data, isLoading }                     = usePublicMovies();
    const [currentIndex, setCurrentIndex]         = useState(0);
    const [isHovered, setIsHovered]               = useState(false);
    const carouselRef  = useRef<HTMLDivElement>(null);
    const [selectedMovie, setSelectedMovie]       = useState<PublicMovie | null>(null);

    const movies = useMemo(() => {
        if (!data?.data) return [];
        return data.data. slice(0, limit);
    }, [data?.data, limit]);

    const getVisibleCount = useCallback(() => {
        if (typeof window === "undefined") return 4;
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 768) return 2;
        if (window.innerWidth < 1024) return 3;
        if (window.innerWidth < 1280) return 4;
        return 5;
    }, []);

    const [visibleCount, setVisibleCount] = useState(getVisibleCount());

    useEffect(() => {
        const handleResize = () => setVisibleCount(getVisibleCount());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [getVisibleCount]);

    const maxIndex = Math.max(0, movies.length - visibleCount);

    useEffect(() => {
        if (! autoPlay || isHovered || movies.length <= visibleCount) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ?  0 : prev + 1));
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, isHovered, maxIndex, movies.length, visibleCount]);

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ?  0 : prev + 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(Math.min(index, maxIndex));
    };

    return (
        <section className="py-20 bg-[#0b0b11] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white"
                        >
                            À l'affiche
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 mt-2 text-sm sm:text-base"
                        >
                            Les films disponibles dans nos cinémas partenaires
                        </motion.p>
                    </div>

                    {/* Navigation Desktop */}
                    {!isLoading && movies.length > visibleCount && (
                        <div className="hidden sm:flex items-center gap-2">
                            <button
                                onClick={goToPrev}
                                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 group"
                                aria-label="Précédent"
                            >
                                <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                            </button>
                            <button
                                onClick={goToNext}
                                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 group"
                                aria-label="Suivant"
                            >
                                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Skeleton */}
                {isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {[...Array(visibleCount)].map((_, i) => (
                            <div
                                key={i}
                                className="aspect-[2/3] bg-white/5 rounded-2xl animate-pulse"
                                style={{ animationDelay: `${i * 100}ms` }}
                            />
                        ))}
                    </div>
                )}

                {/* No results */}
                {!isLoading && movies. length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                            <Play size={32} className="text-slate-600" />
                        </div>
                        <p className="text-slate-400">Aucun film disponible pour le moment.</p>
                    </div>
                )}

                {/* Carousel */}
                {!isLoading && movies.length > 0 && (
                    <div
                        ref={carouselRef}
                        className="relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Navigation Arrows - Mobile */}
                        {movies.length > visibleCount && (
                            <>
                                <button
                                    onClick={goToPrev}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/80 backdrop-blur-sm text-white border border-white/10 hover:bg-red-500 hover:border-red-500 transition-all duration-300 -translate-x-1/2 sm:hidden"
                                    aria-label="Précédent"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={goToNext}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/80 backdrop-blur-sm text-white border border-white/10 hover:bg-red-500 hover:border-red-500 transition-all duration-300 translate-x-1/2 sm:hidden"
                                    aria-label="Suivant"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        )}

                        {/* Gradient Edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0b0b11] to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0b0b11] to-transparent z-10 pointer-events-none" />

                        {/* Cards Container */}
                        <div className="overflow-hidden">
                            <motion.div
                                className="flex gap-5"
                                animate={{
                                    x: `-${currentIndex * (100 / visibleCount)}%`,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                }}
                            >
                                {movies.map((movie, idx) => (
                                    <motion.div
                                        key={movie._id}
                                        className="flex-shrink-0"
                                        style={{ width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * 20 / visibleCount}px)` }}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <MovieCard
                                            movie={movie}
                                            onClick={() => setSelectedMovie(movie)}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Progress Dots */}
                        {movies.length > visibleCount && (
                            <div className="flex justify-center gap-2 mt-8">
                                {Array. from({ length: maxIndex + 1 }). map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => goToSlide(idx)}
                                        className={`transition-all duration-300 rounded-full ${
                                            currentIndex === idx
                                                ? "w-8 h-2 bg-red-500"
                                                : "w-2 h-2 bg-white/20 hover:bg-white/40"
                                        }`}
                                        aria-label={`Aller au slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Autoplay indicator */}
                        {autoPlay && movies.length > visibleCount && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5 rounded-full overflow-hidden mt-6">
                                <motion.div
                                    className="h-full bg-red-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: isHovered ? `${(currentIndex / maxIndex) * 100}%` : "100%" }}
                                    transition={{
                                        duration: isHovered ? 0 : autoPlayInterval / 1000,
                                        ease: "linear",
                                        repeat: isHovered ? 0 : Infinity,
                                    }}
                                    key={currentIndex}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* CTA */}
                {!isLoading && movies.length > 0 && (
                    <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <button
                            onClick={() => navigate("/movies")}
                            className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-[1.02]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Voir tous les films
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Modal */}
            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}

        </section>
    );
}