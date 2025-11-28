import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import {ICONS} from "../../types/geolocation"

interface MapMarker {
    id: string;
    lat: number;
    lng: number;
    type?: "user" | "cinema" | "default";
    label?: string;
}

interface Props {
    center: [number, number];
    zoom?: number;
    markers?: MapMarker[];
    height?: string;
    onClick?: (lat: number, lng: number) => void;
    className?: string;
}

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

function MapClickHandler({ onClick }: { onClick?: (lat: number, lng: number) => void }) {
    const map = useMap();
    useEffect(() => {
        if (! onClick) return;
        const handleClick = (e: L.LeafletMouseEvent) => onClick(e.latlng.lat, e.latlng.lng);
        map.on("click", handleClick);
        return () => { map.off("click", handleClick); };
    }, [map, onClick]);
    return null;
}

export default function MapView({ center, zoom = 13, markers = [], height = "400px", onClick, className = "" }: Props) {
    return (
        <div className={`rounded-2xl overflow-hidden border border-white/10 ${className}`} style={{ height }}>
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="w-full h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <MapController center={center} zoom={zoom} />
                <MapClickHandler onClick={onClick} />
                {markers. map((marker) => (
                    <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={ICONS[marker.type || "default"]}>
                        {marker.label && <Popup>{marker. label}</Popup>}
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}