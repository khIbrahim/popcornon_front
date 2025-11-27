import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
    type ReactNode,
} from "react";
import { checkAuth } from "../Api/endpoints/auth";
import type { UserI } from "../types/user";

interface AuthContextType {
    user: UserI | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    refresh: () => Promise<void>;
    setUser: (user: UserI | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserI | null>(() => {
        // Récupérer du localStorage au démarrage
        const stored = localStorage.getItem("user");
        return stored ? JSON. parse(stored) : null;
    });
    const [isLoading, setIsLoading] = useState(true);

    const refresh = useCallback(async () => {
        try {
            const res = await checkAuth();
            if("data" in res && res.data) {
                if (res.success && res.data) {
                    setUser(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));
                } else {
                    setUser(null);
                    localStorage.removeItem("user");
                }
            }
        } catch {
            setUser(null);
            localStorage.removeItem("user");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("user");
    }, []);

    const handleSetUser = useCallback((newUser: UserI | null) => {
        setUser(newUser);
        if (newUser) {
            localStorage.setItem("user", JSON.stringify(newUser));
        } else {
            localStorage. removeItem("user");
        }
    }, []);

    useEffect(() => {
        refresh().then(() => console.log("Auth refreshed"));
    }, [refresh]);

    // Sync entre onglets
    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "user") {
                setUser(e.newValue ?  JSON.parse(e.newValue) : null);
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window. removeEventListener("storage", handleStorage);
    }, []);

    const value = useMemo(
        () => ({
            user,
            isLoading,
            isLoggedIn: !!user,
            refresh,
            setUser: handleSetUser,
            logout,
        }),
        [user, isLoading, refresh, handleSetUser, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}