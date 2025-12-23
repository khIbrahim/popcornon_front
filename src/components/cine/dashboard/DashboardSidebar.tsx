import { useState } from "react";
import {
    Film,
    Settings,
    LayoutDashboard,
    X,
    LogOut,
    ChevronLeft,
    Home,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { logout } from "../../../Api/endpoints/auth";
import classNames from "../../../utils/utils";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const NAV_ITEMS = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Vue générale", end: true },
    { to: "/dashboard/movies", icon: Film, label: "Films & Séances" },
    { to: "/dashboard/settings", icon: Settings, label: "Paramètres" },
];

export default function DashboardSidebar({ isOpen, onClose }: Props) {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = async () => {
        await logout();
        setUser(null);
        navigate("/");
    };

    return (
        <>
            {/* Overlay mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={classNames(
                    "fixed inset-y-0 left-0 z-40 border-r border-white/5 bg-[#0a0a0f] flex flex-col transition-all duration-300 md:static",
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                    isCollapsed ? "w-[72px]" : "w-64"
                )}
            >
                {/* Header */}
                <div
                    className={classNames(
                        "flex h-14 items-center border-b border-white/5 px-4",
                        isCollapsed ? "justify-center" : "justify-between"
                    )}
                >
                    {!isCollapsed && (
                        <NavLink to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">
                <span className="text-red-500">🍿</span> PopcornON
              </span>
                        </NavLink>
                    )}

                    {isCollapsed && (
                        <NavLink to="/" className="text-xl">
                            🍿
                        </NavLink>
                    )}

                    {/* Close mobile */}
                    <button
                        onClick={onClose}
                        className="p-1. 5 rounded-lg text-slate-500 hover:bg-white/5 md:hidden"
                    >
                        <X size={18} />
                    </button>

                    {/* Collapse desktop */}
                    {!isCollapsed && (
                        <button
                            onClick={() => setIsCollapsed(true)}
                            className="hidden md:flex p-1.5 rounded-lg text-slate-500 hover:bg-white/5 hover:text-white transition-colors"
                            title="Réduire"
                        >
                            <ChevronLeft size={16} />
                        </button>
                    )}
                </div>

                {/* Expand button when collapsed */}
                {isCollapsed && (
                    <button
                        onClick={() => setIsCollapsed(false)}
                        className="hidden md:flex mx-auto mt-3 p-2 rounded-lg text-slate-500 hover:bg-white/5 hover:text-white transition-colors"
                        title="Agrandir"
                    >
                        <ChevronLeft size={16} className="rotate-180" />
                    </button>
                )}

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={onClose}
                            className={({ isActive }) =>
                                classNames(
                                    "flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200",
                                    isCollapsed ? "justify-center p-3" : "px-4 py-3",
                                    isActive
                                        ? "bg-red-500/10 text-red-400"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                )
                            }
                            title={isCollapsed ? item.label : undefined}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon
                                        size={18}
                                        className={isActive ? "text-red-500" : ""}
                                    />
                                    {!isCollapsed && (
                                        <>
                                            <span className="flex-1">{item.label}</span>
                                            {isActive && (
                                                <span className="h-1. 5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}

                    {/* Lien retour site */}
                    <div className="pt-4 mt-4 border-t border-white/5">
                        <NavLink
                            to="/"
                            className={classNames(
                                "flex items-center gap-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-white/5 hover:text-white transition-colors",
                                isCollapsed ? "justify-center p-3" : "px-4 py-3"
                            )}
                            title={isCollapsed ? "Retour au site" : undefined}
                        >
                            <Home size={18} />
                            {!isCollapsed && <span>Retour au site</span>}
                        </NavLink>
                    </div>
                </nav>

                {/* User section */}
                <div className="border-t border-white/5 p-3">
                    {isCollapsed ? (
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xs font-bold text-white">
                                {user?.firstName?.[0]}
                                {user?.lastName?.[0]}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                title="Se déconnecter"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.02]">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                {user?.firstName?.[0]}
                                {user?.lastName?.[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-[11px] text-slate-500 truncate">
                                    {user?.email}
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                title="Se déconnecter"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
