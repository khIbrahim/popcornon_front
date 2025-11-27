import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Menu,
    User,
    X,
    LogOut,
    Settings,
    Ticket,
    Building2
} from "lucide-react";
import {logout} from "../Api/endpoints/auth.ts";

interface NavbarProps {
    isLoggedIn: boolean;
    user?: {
        firstName: string;
        lastName: string;
        role: "user" | "admin" | "cine";
    };
}

export default function Navbar({ isLoggedIn, user }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Films", href: "/movies" },
        { label: "Cinémas", href: "/cinemas" },
        { label: "Devenir Partenaire", href: "/become-partner" },
    ];

    const handleLogout = () => {
        try {
            logout();

            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <header className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-red-500/20 shadow-[0_0_10px_rgba(255,0,0,0.2)]">
            <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                <a href="/public" className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-red-500">🍿 PopcornON</span>
                </a>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="text-sm font-semibold text-gray-200 hover:text-red-500 hover:underline underline-offset-4 transition"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="hidden md:flex items-center">
                    {isLoggedIn && user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowDropdown((v) => !v)}
                                className="flex items-center gap-2 group card cursor-pointer"
                            >
                <span className="text-sm text-gray-300 font-medium">
                  Bonjour, {user.firstName}
                </span>
                                <div className="h-9 w-9 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30 transition-transform group-hover:scale-105">
                                    <User size={18} />
                                </div>
                            </button>

                            {/* Dropdown menu */}
                            {showDropdown && (
                                <div
                                    className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-700 bg-slate-900/95 backdrop-blur-xl shadow-xl shadow-black/40 overflow-hidden animate-in fade-in slide-in-from-top-2"
                                >
                                    {/* USER NAME */}
                                    <div className="px-4 py-3 border-b border-slate-700/70">
                                        <p className="text-sm font-medium text-white">
                                            {user.firstName} {user.lastName}
                                        </p>
                                        <p className="text-xs text-slate-400 uppercase tracking-wide">
                                            {user.role}
                                        </p>
                                    </div>

                                    {/* Menu items */}
                                    <ul className="py-1 text-sm text-slate-200">
                                        <li>
                                            <button
                                                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-slate-800/70 transition cursor-pointer"
                                                onClick={() => navigate("/account")}
                                            >
                                                <Settings size={16} />
                                                Mon compte
                                            </button>
                                        </li>

                                        <li>
                                            <button
                                                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-slate-800/70 transition cursor-pointer"
                                                onClick={() => navigate("/reservations")}
                                            >
                                                <Ticket size={16} />
                                                Mes Réservations
                                            </button>
                                        </li>

                                        {/* Cinéma gérant */}
                                        {(user.role === "cine" || user.role === "admin") && (
                                            <li>
                                                <button
                                                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-slate-800/70 transition cursor-pointer"
                                                    onClick={() => navigate("/dashboard")}
                                                >
                                                    <Building2 size={16} />
                                                    Dashboard Cinéma
                                                </button>
                                            </li>
                                        )}

                                        <hr className="my-1 border-slate-700/50" />

                                        {/* Logout */}
                                        <li>
                                            <button
                                                className="flex items-center gap-2 w-full px-4 py-2 text-red-400 hover:bg-red-900/30 transition cursor-pointer"
                                                onClick={handleLogout}
                                            >
                                                <LogOut size={16} />
                                                Déconnexion
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate("/auth")}
                            className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm font-semibold transition shadow-md hover:shadow-red-600/40 cursor-pointer text-gray-100"
                        >
                            Connexion / Inscription
                        </button>
                    )}
                </div>

                {/* Mobile Button */}
                <button
                    className="md:hidden text-gray-200"
                    onClick={() => setIsOpen((p) => !p)}
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </nav>
        </header>
    );
}
