import type { WeekHours } from "./openingHours";
import type {CinemaLocation} from "./geolocation.ts";

export interface PublicCinemaHall {
    name: string;
    capacity: number;
    type: "standard" | "vip" | "imax" | "3d" | string;
}

export interface PublicCinemaSocialLinks {
    facebook?: string;
    instagram?: string;
    twitter?: string;
}

export interface PublicCinemaStats {
    totalMovies: number;
    totalScreenings: number;
    totalViews: number;
}

export interface PublicCinema {
    _id: string;
    name: string;
    description?: string;
    address: string;
    city: string;
    wilaya: string;

    phone?: string;
    email?: string;
    website?: string;

    socialLinks?: PublicCinemaSocialLinks;
    capacity: number;
    halls: PublicCinemaHall[];
    openingHours: WeekHours;
    stats?: PublicCinemaStats;

    location: CinemaLocation;
}

export interface PublicCinemaScreening {
    _id: string;
    movieId: string;
    title: string;
    poster: string | null;
    runtime?: number;
    genres?: string[];
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    hall: string;
    price: number;
}

export interface PublicCinemasListResponse {
    success: boolean;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    data: PublicCinema[];
}

export interface PublicCinemaDetailResponse {
    success: boolean;
    data: PublicCinema;
    screenings: PublicCinemaScreening[];
}
