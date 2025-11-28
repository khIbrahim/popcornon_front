import { useState, useEffect } from "react";

import Navbar from "../components/Navbar.tsx";
import HeroSection from "../components/landing/HeroSection.tsx";
import CinemasMapSection from "../components/landing/CinemasMapSection.tsx";
import FeaturesSection from "../components/landing/FeaturesSection.tsx";
import PartnerTeaserSection from "../components/landing/PartnerTeaserSection.tsx";
import Footer from "../components/Footer.tsx";
import UserMap from "../components/ui/UserMap";

import { useGeolocation } from "../hooks/useGeolocation.ts";
import { checkAuth } from "../Api/endpoints/auth.ts";
import MovieCarousel from "../components/movies/MovieCarousel.tsx";

export default function LandingPage() {
    const [isLoggedIn, setIsLoggedIn]                                            = useState(false);
    const [user, setUser]                                                        = useState<any>(null);
    const { location, getLocation, resetLocation, isLoading: geoLoading, error } = useGeolocation();
    // resetLocation();
    const [showMap, setShowMap]                                                  = useState(false);

    const handleLocationRequest = async () => {
        console.log("hello");
        await getLocation();
        setShowMap(true);
    };

    useEffect(() => {
        const verify = async () => {
            const res = await checkAuth();
            setIsLoggedIn(res.success);
            if (res.success && "data" in res) setUser(res.data);
        };

        verify();
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
            <Navbar isLoggedIn={isLoggedIn} user={user} />

            <HeroSection onRequestLocation={handleLocationRequest} />

            {/* MAP SECTION */}
            {showMap && (
                <section className="pb-20 px-4">
                    <div className="max-w-5xl mx-auto space-y-6 mt-10">

                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold">
                                Cinémas près de vous
                            </h2>

                            <button
                                onClick={() => {
                                    setShowMap(false);
                                    resetLocation();
                                }}
                                className="px-5 py-2 rounded-xl bg-white/10 border border-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition"
                            >
                                Réduire
                            </button>
                        </div>

                        {geoLoading && (
                            <p className="text-slate-400">Localisation en cours...</p>
                        )}

                        {error && (
                            <p className="text-rose-400 bg-rose-400/10 p-3 rounded-xl border border-rose-400/20">
                                {error}
                            </p>
                        )}

                        {location && (
                            <UserMap
                                latitude={location.latitude}
                                longitude={location.longitude}
                            />
                        )}
                    </div>
                </section>
            )}

            <MovieCarousel limit={10} />

            {location && <CinemasMapSection userLocation={location} />}

            <FeaturesSection />

            <PartnerTeaserSection />

            <Footer />
        </div>
    );
}