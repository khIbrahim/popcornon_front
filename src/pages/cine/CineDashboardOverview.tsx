import { useOutletContext } from "react-router-dom";
import { useMemo } from "react";
import DashboardHeader from "../../components/cine/dashboard/DashboardHeader";
import WelcomeCard from "../../components/cine/overview/WelcomeCard";
import QuickStats from "../../components/cine/overview/QuickStats";
import WeeklyChart from "../../components/cine/overview/WeeklyChart";
import UpcomingScreenings from "../../components/cine/overview/UpcomingScreenings";
import TicketsPlaceholder from "../../components/cine/overview/TicketsPlaceholder";
import PopularMovies from "../../components/cine/overview/PopularMovies";
import { useCinema } from "../../context/CinemaContext";
import { useMovies } from "../../hooks/useMovies";

interface OutletContext {
    openSidebar: () => void;
}

export default function CineDashboardOverview() {
    const { openSidebar } = useOutletContext<OutletContext>();
    const { cinema, isLoading: cinemaLoading } = useCinema();
    const { movies, isLoading: moviesLoading } = useMovies();

    const stats = useMemo(() => {
        const today = new Date().toISOString().split("T")[0];
        const todayMovies = movies.filter(
            (m) => m.date === today && m.status === "active"
        );
        const weekMovies = movies.filter((m) => m.status === "active");
        const totalCapacity = cinema?.capacity || 0;

        return {
            todayCount: todayMovies.length,
            weekCount: weekMovies.length,
            totalPlaces: totalCapacity,
            fillRate: 72,
        };
    }, [movies, cinema]);

    const chartData = useMemo(() => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];
            const dayMovies = movies.filter((m) => m.date === dateStr);

            days.push({
                day: date.toLocaleDateString("fr-FR", { weekday: "short" }),
                seances: dayMovies.length,
                revenus: dayMovies.reduce((sum, m) => sum + (m.price || 0), 0) * 10,
            });
        }
        return days;
    }, [movies]);

    const upcomingScreenings = useMemo(() => {
        const today = new Date().toISOString().split("T")[0];
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split("T")[0];

        return movies
            .filter(
                (m) =>
                    (m.date === today || m.date === tomorrowStr) && m.status === "active"
            )
            .sort((a, b) => {
                if (a.date !== b.date) return a.date.localeCompare(b.date);
                return (a.time || "").localeCompare(b.time || "");
            })
            .slice(0, 5);
    }, [movies]);

    const popularMovies = useMemo(() => {
        return [...movies]
            .filter((m) => m.status === "active")
            .sort((a, b) => (b.voteAverage || 0) - (a.voteAverage || 0))
            .slice(0, 4);
    }, [movies]);

    const isLoading = cinemaLoading || moviesLoading;

    return (
        <>
            <DashboardHeader
                title="Vue générale"
                subtitle={cinema?.name || "Dashboard"}
                onMenuClick={openSidebar}
            />

            <div className="flex-1 p-4 md:p-6 overflow-auto">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Welcome */}
                    <WelcomeCard cinemaName={cinema?.name} />

                    {/* Quick Stats */}
                    <QuickStats stats={stats} isLoading={isLoading} />

                    {/* Main Grid */}
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Chart - 2 colonnes */}
                        <div className="lg:col-span-2">
                            <WeeklyChart data={chartData} isLoading={isLoading} />
                        </div>

                        {/* Upcoming Screenings */}
                        <div>
                            <UpcomingScreenings
                                screenings={upcomingScreenings}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Popular Movies */}
                        <PopularMovies movies={popularMovies} isLoading={isLoading} />

                        {/* Tickets Placeholder */}
                        <TicketsPlaceholder />
                    </div>
                </div>
            </div>
        </>
    );
}
