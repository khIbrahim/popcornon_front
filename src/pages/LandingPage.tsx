import { useState, useEffect } from 'react';
import { checkAuth } from "../Api/endpoints/auth.ts";
import Navbar from "../components/Navbar.tsx";
import HeroSection from "../components/landing/HeroSection.tsx";
import MoviesSection from "../components/landing/MoviesSection.tsx";
import FeaturesSection from "../components/landing/FeaturesSection.tsx";
import Footer from "../components/Footer.tsx";

export default function LandingPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<undefined | {
        firstName: string;
        lastName: string;
        role: "user" | "admin" | "cine";
    }>(undefined);

    useEffect(() => {
        const verify = async () => {
            const res = await checkAuth();

            setIsLoggedIn(res.success);

            if (res.success && "data" in res) {
                setUser(res.data);
            } else {
                setUser(undefined);
            }
        };

        verify();
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 font-sans text-slate-100">
            <Navbar isLoggedIn={isLoggedIn} user={user} />

            <div className="pt-16">
                <HeroSection />
                <MoviesSection />
                <FeaturesSection />
                <Footer />
            </div>
        </div>
    );
}