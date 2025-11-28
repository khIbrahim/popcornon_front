import { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { X, MapPin, Navigation, ChevronRight, Users, LayoutGrid } from "lucide-react";
import L from "leaflet";
import type { UserLocation } from "../../types/geolocation";
import {usePublicCinemaById, usePublicCinemas} from "../../hooks/usePublicCinemas.ts";
import type {PublicCinema} from "../../types/publicCinema.ts";
import PublicCinemaDrawer from "../cinemas/PublicCinemaDrawer.tsx";
import {ICONS} from "../../types/geolocation"

interface Props {
    userLocation: UserLocation;
    onClose: () => void;
}

const USER_ICON = ICONS.user;
const CINEMA_ICON = ICONS.cinema;

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math. PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math. cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function formatDistance(km: number): string {
    if (km < 1) return `${Math.round(km * 1000)} m`;
    return `${km.toFixed(1)} km`;
}

function MapBounds({ bounds }: { bounds: L.LatLngBoundsExpression }) {
    const map = useMap();
    useMemo(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [bounds, map]);
    return null;
}

export default function CinemasNearby({ userLocation, onClose }: Props) {
    const { data, isLoading } = usePublicCinemas();
    const [selectedCinema, setSelectedCinema] = useState<PublicCinema | null>(null);
    const {screenings} = usePublicCinemaById(selectedCinema !== null ? selectedCinema._id : undefined);
    const [hoveredCinema, setHoveredCinema] = useState<string | null>(null);

    const cinemas = data ?? [];

    const cinemasWithDistance = useMemo(() => {
        return cinemas
            .filter((c) => c.location?. coordinates && c.location.coordinates[0] !== 0)
            .map((c) => ({
                ...c,
                distance: getDistance(
                    userLocation.latitude,
                    userLocation. longitude,
                    c.location! .coordinates[1],
                    c.location!.coordinates[0]
                ),
            }))
            .sort((a, b) => a.distance - b. distance);
    }, [cinemas, userLocation]);

    // Bounds pour la carte
    const mapBounds = useMemo(() => {
        if (cinemasWithDistance.length === 0) return null;

        const points: [number, number][] = [
            [userLocation.latitude, userLocation.longitude],
            ...cinemasWithDistance.map((c) => [
                c.location! .coordinates[1],
                c.location!.coordinates[0],
            ] as [number, number]),
        ];

        return L.latLngBounds(points);
    }, [cinemasWithDistance, userLocation]);

    return (

        <>
            <section className={`py-12 px-4 transition-opacity duration-300 ${selectedCinema ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                                <MapPin className="text-red-500" size={28} />
                                Cinémas près de vous
                            </h2>
                            <p className="text-slate-400 mt-1">
                                {cinemasWithDistance. length} cinéma(s) trouvé(s) dans votre zone
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                        >
                            <X size={18} />
                            Fermer
                        </button>
                    </div>

                    {/* Content */}
                    <div className="grid lg:grid-cols-5 gap-6">
                        {/* Map */}
                        <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-white/10 h-[400px] lg:h-[500px]">
                            {isLoading ? (
                                <div className="w-full h-full bg-white/5 animate-pulse flex items-center justify-center">
                                    <p className="text-slate-500">Chargement...</p>
                                </div>
                            ) : (
                                <MapContainer
                                    center={[userLocation. latitude, userLocation. longitude]}
                                    zoom={12}
                                    className="w-full h-full"
                                    scrollWheelZoom={true}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://openstreetmap.org/copyright">OSM</a>'
                                    />

                                    {mapBounds && <MapBounds bounds={mapBounds} />}

                                    {/* User marker */}
                                    <Marker
                                        position={[userLocation.latitude, userLocation.longitude]}
                                        icon={USER_ICON}
                                    >
                                        <Popup>
                                            <span className="font-medium">Votre position</span>
                                        </Popup>
                                    </Marker>

                                    {/* Cinema markers */}
                                    {cinemasWithDistance. map((cinema) => (
                                        <Marker
                                            key={cinema._id}
                                            position={[
                                                cinema. location!.coordinates[1],
                                                cinema.location! .coordinates[0],
                                            ]}
                                            icon={CINEMA_ICON}
                                            eventHandlers={{
                                                click: () => setSelectedCinema(cinema),
                                                mouseover: () => setHoveredCinema(cinema._id),
                                                mouseout: () => setHoveredCinema(null),
                                            }}
                                        >
                                            <Popup>
                                                <div className="text-center">
                                                    <p className="font-bold text-sm">{cinema.name}</p>
                                                    <p className="text-xs text-gray-600">{cinema.city}</p>
                                                    <p className="text-xs text-red-600 font-medium mt-1">
                                                        {formatDistance(cinema.distance)}
                                                    </p>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            )}
                        </div>

                        {/* Cinema list */}
                        <div className="lg:col-span-2 space-y-3 max-h-[500px] overflow-y-auto pr-2">
                            {isLoading ? (
                                [... Array(3)]. map((_, i) => (
                                    <div key={i} className="h-28 rounded-xl bg-white/5 animate-pulse" />
                                ))
                            ) : cinemasWithDistance. length > 0 ? (
                                cinemasWithDistance.map((cinema) => (
                                    <button
                                        key={cinema._id}
                                        onClick={() => setSelectedCinema(cinema)}
                                        onMouseEnter={() => setHoveredCinema(cinema._id)}
                                        onMouseLeave={() => setHoveredCinema(null)}
                                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                                            hoveredCinema === cinema._id
                                                ? "bg-red-500/10 border-red-500/30"
                                                : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-white truncate">
                                                    {cinema.name}
                                                </h3>
                                                <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                                                    <MapPin size={12} />
                                                    {cinema. city}, {cinema.wilaya}
                                                </p>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                                    <span className="flex items-center gap-1">
                                                        <LayoutGrid size={12} />
                                                        {cinema.halls?. length || 0} salles
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Users size={12} />
                                                        {cinema.capacity} places
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium">
                                                    <Navigation size={12} />
                                                    {formatDistance(cinema.distance)}
                                                </span>
                                                <ChevronRight size={16} className="text-slate-500 mt-2 ml-auto" />
                                            </div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <MapPin size={32} className="mx-auto text-slate-600 mb-3" />
                                    <p className="text-slate-500">Aucun cinéma trouvé dans votre zone</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Cinema Modal */}
            {selectedCinema && (
                <PublicCinemaDrawer
                    cinema={selectedCinema}
                    onClose={() => setSelectedCinema(null)}
                    screenings={screenings}
                />
            )}
        </>
    );
}