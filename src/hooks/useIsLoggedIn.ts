import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";

export function useIsLoggedIn() {
    const { user } = useAuth();
    return useMemo(() => !!user, [user]);
}