import { useState } from "react";

import Navbar from "../components/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import PartnerTeaserSection from "../components/landing/PartnerTeaserSection";
import Footer from "../components/Footer";
import MovieCarousel from "../components/movies/MovieCarousel";

import { useGeolocation } from "../hooks/useGeolocation";
import CinemasNearby from "../components/landing/CinemasNearBy.tsx";

export default function LandingPage() {
    const { location, getLocation, resetLocation, isLoading: geoLoading, error } = useGeolocation();
    const [showMap, setShowMap] = useState(false);

    const handleLocationRequest = () => {
        getLocation();
        setShowMap(true);
    };

    const handleCloseMap = () => {
        setShowMap(false);
        resetLocation();
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
            <Navbar />

            <HeroSection onRequestLocation={handleLocationRequest} />

            {/* Géoloc loading/error */}
            {showMap && (geoLoading || error) && (
                <section className="py-12 px-4">
                    <div className="max-w-5xl mx-auto">
                        {geoLoading && (
                            <div className="flex items-center justify-center gap-3 py-8">
                                <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                                <p className="text-slate-400">Localisation en cours...</p>
                            </div>
                        )}
                        {error && (
                            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                                {error}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Cinemas Map */}
            {showMap && location && (
                <CinemasNearby userLocation={location} onClose={handleCloseMap} />
            )}

            <MovieCarousel limit={10} />

            <FeaturesSection />

            <PartnerTeaserSection />

            <Footer />
        </div>
    );
}