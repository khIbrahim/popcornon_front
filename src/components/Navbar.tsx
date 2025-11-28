import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Ticket, Building2 } from "lucide-react";
import { logout } from "../Api/endpoints/auth.ts";

interface NavbarProps {
    isLoggedIn: boolean;
    user?: { firstName: string; lastName: string; role: "user" | "admin" | "cine" };
}

export default function Navbar({ isLoggedIn, user }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

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
        { label: "Films", href: "/movies" },
        { label: "Cinémas", href: "/cinemas" },
        { label: "Devenir partenaire", href: "/become-partner" },
    ];

    const handleLogout = async () => {
        await logout();
        window.location.href = "/";
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2">
                    <span className="text-3xl">🍿</span>
                    <span className="text-2xl font-black text-white">PopcornON</span>
                </a>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="text-sm font-semibold text-slate-300 hover:text-red-500 transition"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn && user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-3 hover:scale-105 transition"
                            >
                                <span className="text-sm font-medium text-white">Bonjour, {user.firstName}</span>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                                    {user.firstName[0]}{user.lastName[0]}
                                </div>
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-3 w-64 py-2 rounded-2xl bg-[#0a0a0f] border border-white/10 shadow-2xl">
                                    <div className="px-4 py-3 border-b border-white/10">
                                        <p className="font-semibold">{user.firstName} {user.lastName}</p>
                                        <p className="text-xs text-slate-400">{user.role === "cine" ? "Cinéma" : "Utilisateur"}</p>
                                    </div>
                                    <button onClick={() => navigate("/reservations")} className="w-full px-4 py-3 text-left hover:bg-white/5 flex items-center gap-3">
                                        <Ticket size={18} /> Mes réservations
                                    </button>
                                    {(user.role === "cine" || user.role === "admin") && (
                                        <button onClick={() => navigate("/dashboard")} className="w-full px-4 py-3 text-left hover:bg-white/5 flex items-center gap-3">
                                            <Building2 size={18} /> Dashboard cinéma
                                        </button>
                                    )}
                                    <button onClick={handleLogout} className="w-full px-4 py-3 text-left text-rose-400 hover:bg-rose-500/10 flex items-center gap-3">
                                        <LogOut size={18} /> Déconnexion
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate("/auth")}
                            className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold hover:scale-105 transition shadow-lg shadow-red-500/30"
                        >
                            Connexion / Inscription
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 inset-x-0 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/10">
                    <div className="px-6 py-6 space-y-6">
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} className="block text-lg font-semibold text-white">
                                {link.label}
                            </a>
                        ))}
                        {!isLoggedIn && (
                            <button
                                onClick={() => navigate("/auth")}
                                className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold"
                            >
                                Connexion / Inscription
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}