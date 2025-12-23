import { useState } from "react";

import Navbar from "../components/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import PartnerTeaserSection from "../components/landing/PartnerTeaserSection";
import Footer from "../components/Footer";
import MovieCarousel from "../components/movies/MovieCarousel";
import GeolocationStatus from "../components/landing/GeolocationStatus";

import { useGeolocation } from "../hooks/useGeolocation";
import CinemasNearby from "../components/landing/CinemasNearBy.tsx";

export default function LandingPage() {
    const {
        location,
        getLocation,
        resetLocation,
        isLoading: geoLoading,
        error,
    } = useGeolocation();
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
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <Navbar />

            <HeroSection onRequestLocation={handleLocationRequest} />

            {/* Géoloc loading/error */}
            {showMap && <GeolocationStatus isLoading={geoLoading} error={error} />}

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
