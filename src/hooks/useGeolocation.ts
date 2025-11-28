import {useState, useCallback} from "react";
import type {UserLocation} from "../types/geolocation.ts";

export function useGeolocation() {
    const [location, setLocation]   = useState<UserLocation | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError]         = useState<string | null>(null);

    const getLocation = useCallback(() => {
        setIsLoading(true);
        setError(null);

        if(! navigator.geolocation){
            setError("La géolocalisation n'est pas supporté par votre navigateur.");
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude:  position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy:  position.coords.accuracy,
                    timestamp: position.timestamp,
                });
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                setError(error.message);
            },
            {
                enableHighAccuracy: true,
            }
        );
    }, []);

    return {
        location,
        isLoading,
        error,
        getLocation
    };
}