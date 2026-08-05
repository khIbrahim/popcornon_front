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

export type CinemaScreeningStatus =
    | "draft"
    | "active"
    | "archived";

export interface CinemaScreeningMovie {
    id?:         number;
    _id?:        number;
    title:       string;
    overview?:   string | null;
    poster?:     string | null;
    runtime:     number;
    voteAverage: number | null;
    genres:      string[];
}

export interface CinemaScreeningHall {
    id:       number;
    name:     string;
    capacity: number;
    type:     CinemaHall["type"];
}

export interface CinemaScreening {
    id:           number;
    cinemaId:     number;
    cinemaHallId: number;
    tmdbId:       number | null;
    title:        string | null;
    poster:       string | null;
    runtime:      number | null;
    voteAverage:  number | null;
    genres:       string[];
    startsAt:     string;
    endsAt:       string;
    price:        string;
    status:       CinemaScreeningStatus;
    hall:         CinemaScreeningHall;
    movie?:       CinemaScreeningMovie;
}

export interface CinemaScreeningFilters {
    from?: string;
    to?:   string;
}

export interface CinemaScreeningsResponse {
    data: CinemaScreening[];
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
export type ScreeningStatus =
    | "draft"
    | "active"
    | "archived";

export interface CreateCinemaScreeningPayload {
    tmdb_id: number;
    cinema_hall_id: number;
    starts_at: string;
    price: number;
    status: "draft" | "active";
}

export interface UpdateCinemaScreeningPayload {
    tmdb_id?:           number;
    cinema_hall_id?:    number;
    starts_at?:         string;
    price?:             number;
    status?: "draft" | "active";
}

export interface MyCinemaScreeningFilters {
    date?:   string;
    status?: ScreeningStatus;
}

export interface CinemaScreeningResponse {
    message: string;
    data:    CinemaScreening;
}
