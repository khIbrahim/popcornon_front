import type {CinemaHall} from "./halls.ts";
import type {WeekHours} from "./openingHours.ts";

export interface Cinema {
    id: number;
    name: string;
    description?: string;
    address: string;
    city: string;
    wilaya: string;
    phone?: string;
    email?: string;
    website?: string;
    cover_photo?: string;
    capacity: number;
    halls: CinemaHall[];
    opening_hours?: WeekHours;
    status: "active" | "pending" | "suspended";
    created_at: string;
    location: CinemaLocation;
}

export interface CinemaScreening {
    _id: string;
    movie: {
        _id: string;
        tmdb_id: number;
        title: string;
        poster: string;
        runtime: number;
        vote_average: number;
        genres: string[];
    };
    date: string;
    time: string;
    hall: string;
    price: number;
    availableSeats: number;
}

export interface CinemaLocation {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
}