import { useState, useCallback } from "react";
import type { UserLocation } from "../types/geolocation";

interface UseGeolocationOptions {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
}

export function useGeolocation(options: UseGeolocationOptions = {}) {
    const [location, setLocation]   = useState<UserLocation | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]         = useState<string | null>(null);

    const {
        enableHighAccuracy = true,
        timeout = 10000,
        maximumAge = 0
    } = options;

    const getLocation = useCallback(() => {
        setIsLoading(true);
        setError(null);

        if ( !navigator.geolocation) {
            setError("La géolocalisation n'est pas supportée par votre navigateur.");
            setIsLoading(false);
            return;
        }

        navigator.geolocation. getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords. longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position. timestamp,
                });
                setIsLoading(false);
            },
            (err) => {
                const messages: Record<number, string> = {
                    1: "Permission refusée.  Autorisez la géolocalisation dans votre navigateur.",
                    2: "Position indisponible.  Vérifiez votre connexion.",
                    3: "Délai d'attente dépassé. Réessayez.",
                };
                setError(messages[err.code] || err.message);
                setIsLoading(false);
            },
            { enableHighAccuracy, timeout, maximumAge }
        );
    }, [enableHighAccuracy, timeout, maximumAge]);

    const resetLocation = useCallback(() => {
        setLocation(null);
        setError(null);
    }, []);

    return {
        location,
        isLoading,
        error,
        getLocation,
        resetLocation,
        hasLocation: !!location,
    };
}