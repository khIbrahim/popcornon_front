import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PublicCinemaDrawer from "../components/cinemas/PublicCinemaDrawer";
import CinemasPageHero from "../components/cinemas/CinemasPageHero";
import CinemasFilters from "../components/cinemas/CinemasFilters";
import CinemasResults from "../components/cinemas/CinemasResults";
import {
    usePublicCinemas,
    usePublicCinemaById,
} from "../hooks/usePublicCinemas";
import { WILAYAS } from "../constants/utils";

export default function CinemasPage() {
    const [search, setSearch] = useState("");
    const [selectedWilaya, setSelectedWilaya] = useState<string>("Toutes");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedCinemaId, setSelectedCinemaId] = useState<string | null>(null);

    const {
        data: cinemas,
        isLoading,
        isError,
    } = usePublicCinemas(
        selectedWilaya !== "Toutes" ? { wilaya: selectedWilaya } : undefined
    );

    const { cinema: selectedCinema, screenings } = usePublicCinemaById(
        selectedCinemaId ?? undefined
    );

    const filteredCinemas = useMemo(() => {
        if (!cinemas) {
            return [];
        }
        if (!search.trim()) {
            return cinemas;
        }

        const term = search.toLowerCase();
        return cinemas.filter(
            (c) =>
                c.name.toLowerCase().includes(term) ||
                c.city.toLowerCase().includes(term) ||
                c.wilaya.toLowerCase().includes(term)
        );
    }, [cinemas, search]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />

            {/* Hero */}
            <CinemasPageHero />

            {/* Filters */}
            <CinemasFilters
                search={search}
                setSearch={setSearch}
                selectedWilaya={selectedWilaya}
                setSelectedWilaya={setSelectedWilaya}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                wilayas={WILAYAS}
            />

            {/* Results */}
            <CinemasResults
                isLoading={isLoading}
                isError={isError}
                cinemas={filteredCinemas}
                selectedWilaya={selectedWilaya}
                onCinemaClick={setSelectedCinemaId}
            />

            {/* Drawer */}
            {selectedCinemaId && selectedCinema && (
                <PublicCinemaDrawer
                    cinema={selectedCinema}
                    screenings={screenings}
                    onClose={() => setSelectedCinemaId(null)}
                />
            )}

            <Footer />
        </div>
    );
}
