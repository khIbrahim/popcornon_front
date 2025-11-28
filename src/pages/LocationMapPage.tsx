import Button from "../components/cine/ui/Button";
import { useGeolocation } from "../hooks/useGeolocation";
import UserMap from "../components/ui/UserMap";

export default function LocationMapPage() {
    const {location, isLoading, error, getLocation} = useGeolocation();

    return (
        <div className="flex-1 p-4 md:p-6">
            <div className="max-w-4xl mx-auto space-y-6">

                <h1 className="text-2xl font-bold text-white">Votre position sur la carte</h1>

                <Button onClick={getLocation} isLoading={isLoading} variant="primary">
                    Obtenir ma position
                </Button>

                {error && (
                    <p className="text-rose-400 bg-rose-400/10 p-3 rounded-xl border border-rose-400/20">
                        {error}
                    </p>
                )}

                {location && (
                    <UserMap
                        latitude={location.latitude}
                        longitude={location.longitude}
                    />
                )}
            </div>
        </div>
    );
}