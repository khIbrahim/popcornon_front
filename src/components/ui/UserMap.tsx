import MapView from "./MapView";

interface Props {
    latitude: number;
    longitude: number;
    label?: string;
}

export default function UserMap({ latitude, longitude, label = "Votre position" }: Props) {
    return (
        <MapView
            center={[latitude, longitude]}
            zoom={15}
            markers={[
                { id: "user", lat: latitude, lng: longitude, type: "user", label },
            ]}
            height="400px"
        />
    );
}