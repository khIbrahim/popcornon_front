import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CinemasPageHero from "../components/cinemas/CinemasPageHero";
import CinemasFilters from "../components/cinemas/CinemasFilters";
import CinemasResults from "../components/cinemas/CinemasResults";
import CinemasPagination from "../components/cinemas/CinemasPagination";
import { WILAYAS } from "../constants/utils";
import { useCinemas } from "../hooks/useCinemas";
import CinemaDrawer from "../components/cinemas/CinemaDrawer.tsx";

export default function CinemasPage() {
    const [search, setSearchState]                 = useState("");
    const [selectedWilaya, setSelectedWilayaState] = useState("Toutes");
    const [isFilterOpen, setIsFilterOpen]          = useState(false);
    const [selectedCinemaId, setSelectedCinemaId]  = useState<number | null>(null);

    const [page, setPage] = useState(1);

    const filters = useMemo(
        () => ({
            q: search.trim() || undefined,
            wilaya:
                selectedWilaya === "Toutes"
                    ? undefined
                    : selectedWilaya,
            page,
            perPage: 12,
        }),
        [search, selectedWilaya, page],
    );

    const {
        data: cinemas,
        pagination,
        isLoading,
        isFetching,
        isError,
    } = useCinemas(filters);

    const selectedCinema = cinemas.find((c) => Number(c.id) === Number(selectedCinemaId));

    const setSearch = (value: string) => {
        setSearchState(value);
        setPage(1);
    };

    const setSelectedWilaya = (value: string) => {
        setSelectedWilayaState(value);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        if (
            newPage < 1 ||
            newPage > (pagination?.last_page ?? 1) ||
            newPage === page
        ) {
            return;
        }

        setPage(newPage);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />

            <CinemasPageHero />

            <CinemasFilters
                search={search}
                setSearch={setSearch}
                selectedWilaya={selectedWilaya}
                setSelectedWilaya={setSelectedWilaya}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                wilayas={WILAYAS}
            />

            <CinemasResults
                isLoading={isLoading}
                isError={isError}
                cinemas={cinemas}
                selectedWilaya={selectedWilaya}
                onCinemaClick={setSelectedCinemaId}
            />

            {pagination && pagination.last_page > 1 && (
                <CinemasPagination
                    currentPage={pagination.current_page}
                    lastPage={pagination.last_page}
                    total={pagination.total}
                    from={pagination.from}
                    to={pagination.to}
                    isFetching={isFetching}
                    onPageChange={handlePageChange}
                />
            )}

            <Footer />

            {selectedCinemaId && selectedCinema && (
                <CinemaDrawer
                    cinema={selectedCinema}
                    screenings={selectedCinema.movies}
                    onClose={() => setSelectedCinemaId(null)}
                />
            )}
        </div>
    );
}