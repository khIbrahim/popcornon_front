import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { checkAuth } from "../Api/endpoints/auth";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "user" | "admin" | "cine";
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    refresh: () => Promise<void>;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refresh = async () => {
        try {
            const res = await checkAuth();
            setUser(res.success ? res.data : null);
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refresh();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, isLoggedIn: !!user, refresh, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (! context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}