import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface Props {
    latitude: number;
    longitude: number;
}

const userIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

export default function UserMap({ latitude, longitude }: Props) {
    return (
        <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-white/10">
            <MapContainer
                center={[latitude, longitude]}
                zoom={15}
                scrollWheelZoom={true}
                className="w-full h-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap"
                />

                <Marker position={[latitude, longitude]} icon={userIcon}>
                    <Popup>Votre position</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}