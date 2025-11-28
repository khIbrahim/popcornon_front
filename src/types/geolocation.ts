import L from "leaflet";

export interface UserLocation {
    latitude: number;
    longitude: number;
    accuracy?: number;
    timestamp?: number;
}

export interface CinemaLocation {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
}

export const ICONS = {
    user: L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    }),
    cinema: L. icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    }),
    default: L. icon({
        iconUrl: "https://unpkg.com/leaflet@1. 9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1. 9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    }),
};