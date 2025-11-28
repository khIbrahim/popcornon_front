import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { usePublicCinemas } from "../../hooks/usePublicCinemas";

interface Props {
    limit?: number;
    onSelect?: (id: string) => void;
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

export default function CinemaCarousel({
    limit = 20,
    onSelect,
    autoPlay = true,
    autoPlayInterval = 4000
}: Props) {
    const { data, isLoading } = usePublicCinemas();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    const cinemas = useMemo(() => {
        if (!data) return [];
        return data.slice(0, limit);
    }, [data, limit]);

    const getVisibleCount = useCallback(() => {
        if (typeof window === "undefined") return 3;
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 768) return 2;
        if (window.innerWidth < 1024) return 3;
        if (window.innerWidth < 1280) return 4;
        return 5;
    }, []);

    const [visibleCount, setVisibleCount] = useState(getVisibleCount());

    useEffect(() => {
        const resize = () => setVisibleCount(getVisibleCount());
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [getVisibleCount]);

    const maxIndex = Math.max(0, cinemas.length - visibleCount);

    useEffect(() => {
        if (!autoPlay || isHovered || cinemas.length <= visibleCount) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, isHovered, maxIndex, cinemas.length, visibleCount]);

    const prev = () => setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    const next = () => setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));

    return (
        <div className="w-full relative overflow-hidden">

            {/* HEADER */}
            <div className="flex items-end justify-between mb-8 px-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Nos cinémas partenaires</h3>

                {!isLoading && cinemas.length > visibleCount && (
                    <div className="hidden sm:flex items-center gap-2">
                        <button
                            onClick={prev}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={next}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>

            {/* SKELETON */}
            {isLoading && (
                <div className="flex gap-5">
                    {[...Array(visibleCount)].map((_, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[260px] h-[130px] bg-white/5 rounded-2xl animate-pulse"
                        />
                    ))}
                </div>
            )}

            {/* EMPTY */}
            {!isLoading && cinemas.length === 0 && (
                <div className="text-center text-slate-500 py-10">
                    Aucun cinéma disponible
                </div>
            )}

            {/* CAROUSEL */}
            {!isLoading && cinemas.length > 0 && (
                <div
                    ref={carouselRef}
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Mobile arrows */}
                    {cinemas.length > visibleCount && (
                        <>
                            <button
                                onClick={prev}
                                className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 sm:hidden"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <button
                                onClick={next}
                                className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 sm:hidden"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </>
                    )}

                    {/* Gradients */}
                    <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#1a1a2e] to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#1a1a2e] to-transparent pointer-events-none" />

                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-6"
                            animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
                            transition={{ type: "spring", stiffness: 260, damping: 30 }}
                        >
                            {cinemas.map((cinema) => (
                                <motion.div
                                    key={cinema._id}
                                    className="flex-shrink-0"
                                    style={{
                                        width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * 20 / visibleCount}px)`
                                    }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <button
                                        onClick={() => onSelect?.(cinema._id)}
                                        className="w-full h-[130px] rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all text-left p-5 flex flex-col justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                                                <Building2 className="text-red-400" size={22} />
                                            </div>

                                            <div>
                                                <h4 className="text-lg font-semibold truncate">{cinema.name}</h4>
                                                <p className="text-sm text-slate-400 truncate">
                                                    {cinema.city}, {cinema.wilaya}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* DOTS */}
                    {cinemas.length > visibleCount && (
                        <div className="flex justify-center gap-2 mt-8">
                            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`transition-all rounded-full ${
                                        currentIndex === idx
                                            ? "w-8 h-2 bg-red-500"
                                            : "w-2 h-2 bg-white/20 hover:bg-white/40"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
