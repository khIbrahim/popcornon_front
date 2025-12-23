import { useState, useEffect, useMemo } from "react";
import {
    Facebook,
    Instagram,
    Twitter,
    Film,
    Clapperboard,
    Star,
    Ticket,
    Popcorn,
    type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

type IconType = LucideIcon;

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const floatingIcons: IconType[] = [Clapperboard, Film, Star, Ticket, Popcorn];
    const NUM_FLOATING_ICONS = 12;

    const iconStyles = useMemo(
        () =>
            [...Array(NUM_FLOATING_ICONS)].map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
            })),
        []
    );

    return (
        <footer className="relative  bg-black text-gray-300 py-4 px-4 overflow-hidden">
            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
                {floatingIcons.length > 0 &&
                    [...Array(NUM_FLOATING_ICONS)].map((_, i) => {
                        const Icon = floatingIcons[i % floatingIcons.length];
                        return (
                            <Icon
                                key={i}
                                className="absolute text-gray-500 opacity-20 animate-pulse"
                                size={24}
                                style={iconStyles[i]}
                            />
                        );
                    })}
            </div>

            {/* Footer Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center mb-4">
                            {/* Logo */}
                            <a href="/" className="flex items-center gap-2">
                <span className="text-2xl font-black ">
                  <img className="h-8" src="/logo.png" alt="logo" />
                </span>
                            </a>
                        </div>
                        <p className="text-gray-400 text-sm">
                            La première plateforme de réservation de cinéma en Algérie. Vivez
                            le cinéma autrement.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Navigation</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>
                                <Link to="/" className="hover:text-red-500">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link to="/movies" className="hover:text-red-500">
                                    Films
                                </Link>
                            </li>
                            <li>
                                <Link to="/cinemas" className="hover:text-red-500">
                                    Cinémas
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Légal</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>
                                <Link to="/terms" className="hover:text-white">
                                    Conditions d'utilisation
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="hover:text-white">
                                    Politique de confidentialité
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Contact Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Suivez-nous</h4>
                        <div className="flex space-x-4">
                            <a className="text-gray-400 hover:text-red-500 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a className="text-gray-400 hover:text-red-500 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a className="text-gray-400 hover:text-red-500 transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} PopcornON Algérie. Tous droits
                        réservés.
                    </p>
                </div>
            </div>

            {/* Scroll To Top */}
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all z-20"
                    aria-label="Scroll to top"
                >
                    ↑
                </button>
            )}
        </footer>
    );
};

export default Footer;