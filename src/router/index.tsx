import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import AuthPage from "../pages/AuthPage.tsx";
import CineDashboardPage from "../pages/CineDashboardPage.tsx";
import BecomePartnerPage from "../pages/BecomePartnerPage.tsx";
import CineRequestsPage from "../pages/admin/CineRequestsPage.tsx";

export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/auth", element: <AuthPage /> },
    { path: "/admin", element: <CineDashboardPage/> },
    { path: "/become-partner", element: <BecomePartnerPage/> },
    { path: "/admin/cine-requests", element: <CineRequestsPage/> },
]);