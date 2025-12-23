import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    roles?: string[];
}

export default function ProtectedRoute({
    children,
    roles,
}: ProtectedRouteProps) {
    const { isLoading, user } = useAuth();

    if (isLoading && ! user) {
        return (
            <div className="flex items-center justify-center h-screen text-white">
                Chargement...
            </div>
        );
    }

    if (! user) {
        return <Navigate to="/" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/admin/cine-requests" replace />;
    }

    return <>{children}</>;
}
