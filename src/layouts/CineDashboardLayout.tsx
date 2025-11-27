import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/cine/dashboard/DashboardSidebar";
import { CinemaProvider } from "../context/CinemaContext";

interface OutletContext {
    openSidebar: () => void;
}

export default function CineDashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <CinemaProvider>
            <div className="flex min-h-screen bg-[#0a0a0f] text-slate-50">
                <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="flex-1 flex flex-col min-w-0">
                    <Outlet context={{ openSidebar: () => setSidebarOpen(true) } satisfies OutletContext} />
                </main>
            </div>
        </CinemaProvider>
    );
}