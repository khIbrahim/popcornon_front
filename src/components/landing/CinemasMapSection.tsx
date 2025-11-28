import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { usePublicCinemas } from "../../hooks/usePublicCinemas";
import "leaflet/dist/leaflet.css";

// Fix icône par défaut Leaflet
const defaultIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface Props {
    userLocation: { latitude: number; longitude: number };
}

export default function CinemasMapSection({ userLocation }: Props) {
    const { data: cinemas, isLoading } = usePublicCinemas();

    if (isLoading || !cinemas?.length) return null;

    // On suppose que chaque cinéma a lat/lng (obligatoire pour la map)
    const validCinemas = cinemas.filter((c: any) => c.location?.lat && c.location?.lng);

    // @ts-ignore
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-black text-center mb-10">Cinémas près de vous</h2>
                <div className="h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={12} className="h-full w-full">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap" />

                        {/* Marqueur utilisateur */}
                        <Marker position={[userLocation.latitude, userLocation.longitude]} icon={defaultIcon}>
                            <Popup>Vous êtes ici</Popup>
                        </Marker>

                        {/* Marqueurs cinémas */}
                        {validCinemas.map((cinema: any) => (
                            <Marker
                                key={cinema._id}
                                position={[cinema.location.lat, cinema.location.lng]}
                                icon={
                                    new Icon({
                                        //@ts-ignore
                                        iconUrl: "/cinema-marker.png" || "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                                        iconSize: [40, 40],
                                    })
                                }
                            >
                                <Popup>
                                    <div className="text-center">
                                        <p className="font-bold">{cinema.name}</p>
                                        <p className="text-sm text-slate-400">{cinema.address}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </section>
    );
}