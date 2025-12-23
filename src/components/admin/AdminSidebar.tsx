import { NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    Building2,
    Archive,
    X,
    Film
} from "lucide-react";
import { cn } from "../../lib/utils";

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    {
        title: "Vue générale",
        path: "/admin",
        icon: LayoutDashboard,
        end: true
    },
    {
        title: "Demandes",
        path: "/admin/requests",
        icon: FileText
    },
    {
        title: "Cinémas actifs",
        path: "/admin/cinemas",
        icon: Building2
    },
    {
        title: "Archives",
        path: "/admin/archives",
        icon: Archive
    },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const location = useLocation();

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border",
                    "transform transition-transform duration-300 ease-in-out",
                    "lg:translate-x-0 lg:static lg:z-auto",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                            <Film className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="font-semibold text-foreground text-sm">Lovable Admin</h1>
                            <p className="text-xs text-muted-foreground">Gestion Cinémas</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 rounded-lg hover:bg-sidebar-accent text-muted-foreground"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = item.end
                            ? location.pathname === item.path
                            : location.pathname.startsWith(item.path);

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.title}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">AD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">Admin</p>
                            <p className="text-xs text-muted-foreground truncate">Administrateur</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}