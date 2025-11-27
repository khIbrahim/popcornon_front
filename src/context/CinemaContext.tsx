import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from "react";
import { myCinema, updateCinema as updateCinemaApi } from "../Api/endpoints/cinemas";
import type { Cinema } from "../types/cinema";
import type {CinemaHall} from "../types/halls.ts";

interface CinemaContextType {
    cinema: Cinema | null;
    halls: CinemaHall[];
    isLoading: boolean;
    error: string | null;
    refreshCinema: () => Promise<void>;
    updateCinema: (data: Partial<Cinema>) => Promise<void>;
    setLocalCinema: (cinema: Cinema) => void;
}

const CinemaContext = createContext<CinemaContextType | null>(null);

export function CinemaProvider({ children }: { children: ReactNode }) {
    const [cinema, setCinema] = useState<Cinema | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 3lajal l refresh de useAuth
    const refreshCinema = useCallback(async () => {
        try {
            setError(null);
            const response = await myCinema();
            setCinema(response.data);
        } catch (err) {
            console.error("Erreur fetch cinema:", err);
            setError("Impossible de récupérer les infos du cinéma.");
            setCinema(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateCinema = useCallback(async (data: Partial<Cinema>) => {
        const response = await updateCinemaApi(data);
        setCinema(response.data);
    }, []);

    const setLocalCinema = useCallback((newCinema: Cinema) => {
        setCinema(newCinema);
    }, []);

    useEffect(() => {
        refreshCinema();
    }, [refreshCinema]);

    const halls = useMemo(() => cinema?.halls ??  [], [cinema]);

    const value = useMemo(() => ({
        cinema,
        halls,
        isLoading,
        error,
        refreshCinema,
        updateCinema,
        setLocalCinema,
    }), [cinema, halls, isLoading, error, refreshCinema, updateCinema, setLocalCinema]);

    return (
        <CinemaContext.Provider value={value}>
            {children}
        </CinemaContext.Provider>
    );
}

export function useCinema() {
    const context = useContext(CinemaContext);
    if (! context) {
        throw new Error("useCinema must be used within CinemaProvider");
    }
    return context;
}