import { useCallback, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setUser, refreshAuth, logoutAuth } from "../store/slices/authSlice";
import type { UserI } from "../types/user";

interface AuthContextType {
    user: UserI | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    isAdmin: boolean;
    refresh: () => Promise<void>;
    setUser: (user: UserI | null) => void;
    logout: () => Promise<void>;
}

export function useAuth(): AuthContextType {
    const dispatch = useAppDispatch();
    const { user, isLoading, isAdmin } = useAppSelector((state) => state.auth);

    const refresh = useCallback(async () => {
        try {
            await dispatch(refreshAuth()).unwrap();
        } catch {
            // silently handle refresh errors - state will be updated by thunk
        }
    }, [dispatch]);

    const handleSetUser = useCallback(
        (newUser: UserI | null) => {
            dispatch(setUser(newUser));
        },
        [dispatch]
    );

    const logout = useCallback(async () => {
        try {
            await dispatch(logoutAuth()).unwrap();
        } catch {
            // silently handle logout errors - state will be updated by thunk
        }
    }, [dispatch]);

    // Initialize auth on app load
    useEffect(() => {
        refresh();
    }, [refresh]);

    // Sync between tabs
    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "user") {
                dispatch(setUser(e.newValue ? JSON.parse(e.newValue) : null));
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [dispatch]);

    const value = useMemo(
        () => ({
            user,
            isLoading,
            isLoggedIn: !!user,
            isAdmin,
            refresh,
            setUser: handleSetUser,
            logout,
        }),
        [user, isLoading, isAdmin, refresh, handleSetUser, logout]
    );

    return value;
}
