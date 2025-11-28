import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { usePublicMovies } from "../../hooks/usePublicMovies";
import { motion } from "framer-motion";

export default function HeroCarousel() {
    const { data, isLoading } = usePublicMovies();

    const topMovies = (!isLoading && data?.data)
        ? [...data.data]
            .sort((a: any, b: any) => (b.voteAverage ?? 0) - (a.voteAverage ?? 0))
            .slice(0, 10)
        : [];

    const [sliderRef] = useKeenSlider({
        loop: true,
        slides: {
            perView: 2.2,
            spacing: 20,
        },
        breakpoints: {
            "(min-width: 640px)": {
                slides: { perView: 3.3, spacing: 25 },
            },
            "(min-width: 1024px)": {
                slides: { perView: 5, spacing: 30 },
            },
        },
    });

    if (!topMovies.length) return null;

    return (
        <div ref={sliderRef} className="keen-slider px-2">
            {topMovies.map((movie: any, index: number) => (
                <motion.div
                    key={movie._id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="keen-slider__slide cursor-pointer"
                >
                    <div className="relative h-[260px] sm:h-[300px] md:h-[360px] rounded-2xl overflow-hidden shadow-xl shadow-black/40 group">
                        <img
                            src={movie.posterUrl}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end">
                            <p className="text-white font-bold text-lg truncate">{movie.title}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
