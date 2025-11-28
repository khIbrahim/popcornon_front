import type {CinemaHall} from "./halls.ts";
import type {WeekHours} from "./openingHours.ts";

export interface Cinema {
    _id: string;
    name: string;
    description?: string;
    address: string;
    city: string;
    wilaya: string;
    phone?: string;
    email?: string;
    website?: string;
    coverPhoto?: string;
    capacity: number;
    halls: CinemaHall[];
    openingHours?: WeekHours;
    status: "active" | "pending" | "suspended";
    createdAt: string;
    location: CinemaLocation;
}

export interface CinemaScreening {
    _id: string;
    movie: {
        _id: string;
        tmdbId: number;
        title: string;
        poster: string;
        runtime: number;
        voteAverage: number;
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