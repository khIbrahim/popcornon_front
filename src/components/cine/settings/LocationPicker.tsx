import { MapPin, Navigation, Loader2, X } from "lucide-react";
import { useGeolocation } from "../../../hooks/useGeolocation";
import MapView from "../../ui/MapView";
import Button from "../ui/Button";
import {useEffect} from "react";

interface Props {
    value: [number, number] | null; // [longitude, latitude]
    onChange: (coords: [number, number] | null) => void;
}

const DEFAULT_CENTER: [number, number] = [36.752887, 3.042048];

export default function LocationPicker({ value, onChange }: Props) {
    const { location, isLoading, error, getLocation } = useGeolocation();

    let mapCenter: [number, number] = DEFAULT_CENTER;
    if(value){
        mapCenter = [value[1], value[0]];
    } else if(location){
        mapCenter = [location.latitude, location.longitude];
    }

    const safeCenter = (mapCenter[0] && mapCenter[1]) ? mapCenter : DEFAULT_CENTER;

    const handleMapClick = (lat: number, lng: number) => {
        onChange([lng, lat]);
    };

    const handleUseMyLocation = () => {
        if (location) {
            onChange([location.longitude, location.latitude]);
        } else {
            getLocation();
        }
    };

    useEffect(() => {
        if (location && ! value) {
            onChange([location.longitude, location.latitude]);
        }
    }, [location]);

    const handleClear = () => onChange(null);

    const markers = value
        ? [{ id: "cinema", lat: value[1], lng: value[0], type: "cinema" as const, label: "Votre cinéma" }]
        : [];

    const awaitingUserLocation = ! value && isLoading;

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h4 className="text-sm font-medium text-white flex items-center gap-2">
                        <MapPin size={16} className="text-red-500" />
                        Position sur la carte
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Cliquez sur la carte pour définir l'emplacement
                    </p>
                </div>
                <div className="flex gap-2">
                    {value && (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleClear}
                            className="text-sm text-slate-400"
                        >
                            <X size={14} />
                            Effacer
                        </Button>
                    )}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleUseMyLocation}
                        disabled={isLoading}
                        className="text-sm"
                    >
                        {isLoading ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <Navigation size={14} />
                        )}
                        Ma position
                    </Button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-sm text-rose-400">
                    {error}
                </div>
            )}

            {/* Map */}
            {awaitingUserLocation ? (
                <div className="flex items-center justify-center h-[300px] bg-white/5 rounded-xl border border-white/10">
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                        <Loader2 className="animate-spin" size={28} />
                        <p className="text-sm">Obtention de votre position…</p>
                    </div>
                </div>
            ) : (
                <MapView
                    center={safeCenter}
                    zoom={value ? 16 : 6}
                    markers={markers}
                    onClick={handleMapClick}
                    height="300px"
                />
            )}

            {/* Coordinates display */}
            {value && typeof value[0] === "number" && typeof value[1] === "number" ? (
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wide">Longitude</p>
                        <p className="text-sm font-mono text-white mt-0.5">{value[0].toFixed(6)}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wide">Latitude</p>
                        <p className="text-sm font-mono text-white mt-0.5">{value[1].toFixed(6)}</p>
                    </div>
                </div>
            ) : (
                <p className="text-xs text-slate-500 text-center py-2">
                    Aucune position définie.Cliquez sur la carte pour placer votre cinéma.
                </p>
            )}

        </div>
    );
}