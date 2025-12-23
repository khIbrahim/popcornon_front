export interface AdminDashboardStats {
    pendingRequests: number;
    activeCinemas: number;
    archivedCinemas: number;
    totalPartners: number;
    weeklyActivity?:  {
        day: string;
        requests: number;
        approvals: number;
    }[];
}

export interface RecentActivity {
    _id: string;
    cinemaName: string;
    city: string;
    wilaya: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
}