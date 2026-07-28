import type {CinemaHall} from "./halls.ts";
import type {WeekHours} from "./openingHours.ts";
import type {Movie} from "./movie.ts";

export interface Cinema {
    id:             number;
    name:           string;
    description?:   string;
    address:        string;
    city:           string;
    wilaya:         string;
    phone?:         string;
    email?:         string;
    website?:       string;
    cover_photo?:   string;
    capacity:       number;
    halls:          CinemaHall[];
    opening_hours?: WeekHours;
    status:         "active" | "pending" | "suspended";
    created_at:     string;
    location:       CinemaLocation;
    movies:         Movie[];
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

export interface CinemaFilters {
    q?:       string;
    wilaya?:  string;
    city?:    string;
    page?:    number;
    perPage?: number;
}

export interface PaginationLink {
    url:    string | null;
    label:  string;
    active: boolean;
}

export interface PaginationLinks {
    first: string | null;
    last:  string | null;
    prev:  string | null;
    next:  string | null;
}

export interface PaginationMeta {
    current_page: number;
    from:         number | null;
    last_page:    number;
    links:        PaginationLink[];
    path:         string;
    per_page:     number;
    to:           number | null;
    total:        number;
}

export interface ListCinemaResponse {
    success: boolean;
    data:    Cinema[];
    links:   PaginationLinks;
    meta:    PaginationMeta;
    filters: CinemaFilters;
}