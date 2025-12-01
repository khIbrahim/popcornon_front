import ProtectedRoute from "../components/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthPage from "../pages/AuthPage";
import CineRequestsPage from "../pages/admin/CineRequestsPage.tsx";
import CineDashboardOverview from "../pages/cine/CineDashboardOverview.tsx";
import CineDashboardMovies from "../pages/cine/CineDashboardMovies.tsx";
import BecomePartnerPage from "../pages/BecomePartnerPage";
import CineSettingsPage from "../pages/cine/CineSettingsPage.tsx";
import CineDashboardLayout from "../layouts/CineDashboardLayout.tsx";
import CinemasPage from "../pages/CinemasPage.tsx";
import MoviesPage from "../pages/MoviesPage.tsx";
import RegisterPage from "../pages/auth/RegisterPage.tsx";
import LoginPage from "../pages/auth/LoginPage.tsx";

export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/auth", element: <AuthPage /> },

    {
        path: "/dashboard",
        element: (
            <ProtectedRoute roles={["cine", "admin"]}>
                <CineDashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <CineDashboardOverview /> },
            { path: "movies", element: <CineDashboardMovies /> },
            { path: "settings", element: <CineSettingsPage /> },
        ]
    },

    {
        path: "/admin/cine-requests",
        element: (
            <ProtectedRoute roles={["admin"]}>
                <CineRequestsPage />
            </ProtectedRoute>
        ),
    },

    { path: "/become-partner", element: <BecomePartnerPage /> },
    { path: "/cinemas", element: <CinemasPage /> },
    { path: "/movies", element: <MoviesPage /> },
    { path: "/register", element: <RegisterPage />},
    { path: "/login", element: <LoginPage />}
]);
