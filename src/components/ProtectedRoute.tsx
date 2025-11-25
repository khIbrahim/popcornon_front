import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
    roles?: string[];
    redirectTo?: string;
}

export default function ProtectedRoute({ roles, redirectTo = "/auth" }: Props) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>;
    }

    if (! user) {
        return <Navigate to={redirectTo} replace />;
    }

    if (roles && ! roles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}